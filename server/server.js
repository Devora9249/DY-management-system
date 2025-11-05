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

//routes
app.use("/api/donors",require("./routes/DonorsRoute"))
app.use("/api/avrechim",require("./routes/AvrechimRoute"))
app.use("/api/expenses",require("./routes/ExpensesRoute"))
app.use("/api/integration",require("./routes/IntegrationRoute"))
app.use("/api/debts",require("./routes/DebtsRoute"))

//cron jobs
const startDonationsCron = require("./cron/donationsCron");
const startEmailCron = require("./cron/emailCron");

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


