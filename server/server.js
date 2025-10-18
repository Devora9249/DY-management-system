require("dotenv").config()
const express=require("express")
const mongoose = require("mongoose")
const cors =require("cors")
const app = express()
const corsOption = require("./config/corsOptions") 
const connectDB=require("./config/dbConn")
connectDB()

const PORT = process.env.PORT || 1111

//middlewars
app.use(cors(corsOption))
app.use(express.static("public"))
app.use(express.json())

app.get('/test', (req, res) => res.send('Server is working!'));
app.use("/api/user",require("./routes/userRoute"))
app.use("/api/donors",require("./routes/DonorsRoute"))
app.use("/api/avrechim",require("./routes/AvrechimRoute"))
app.use("/api/expenses",require("./routes/ExpensesRoute"))


//mongoose
mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT,()=>{
        console.log(`the server runing on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
})

const cron = require("node-cron");
const Donor = require("./models/DonorModel");

// הפעלת cron פעם ביום בשעה 02:00 בלילה
cron.schedule("* * * * *", async () => {
  console.log("📅 בודק הוראות קבע...");

  try {
    const donors = await Donor.find({ "donations.active": true });

    for (const donor of donors) {
      let updated = false;

     donor.donations.forEach(d => {
  if (d.active && d.nextDonationDate && d.nextDonationDate <= new Date() && d.monthsRemaining > 0) {
    // הוספת תרומה חודשית
    donor.donations.push({
      date: new Date(),
      amount: d.amount,
      paymentMethod: d.paymentMethod,
      frequency: "חד פעמי",
    });

    // עדכון ההוראת קבע
    const next = new Date(d.nextDonationDate);
    next.setMonth(next.getMonth() + 1);
    d.nextDonationDate = next;
    d.monthsRemaining -= 1; // מורידים חודש
    if (d.monthsRemaining === 0) d.active = false; // אם אין חודשים נוספים, מבטלים את ההוראת קבע
    updated = true;
  }
});


      if (updated) await donor.save();
    }

    console.log("✅ סיום עדכון הוראות קבע");
  } catch (error) {
    console.error("❌ שגיאה ב-cron:", error);
  }
});