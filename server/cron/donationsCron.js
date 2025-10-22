const cron = require("node-cron");
const Donor = require("../models/DonorModel");

// הפעלת cron פעם ביום בשעה 02:00 בלילה
cron.schedule("* * * * *", async () => {
  console.log("📅 בודק הוראות קבע...");
  let count =2;
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
      frequency: `הוראת קבע ${count++}`,
    });

    // עדכון ההוראת קבע
    const next = new Date(d.nextDonationDate);
    // next.setMonth(next.getMonth() + 1);
     next.setMinutes(next.getMinutes() + 1);
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