const nodemailer = require('nodemailer');
require('dotenv').config();
const { sendEmail } = require("../MailService/emailService");
const cron = require("node-cron");
const Donor = require("../models/DonorModel");

// הפעלת cron פעם ביום בשעה 02:00 בלילה
cron.schedule("58 00 * * *", async () => {
    console.log("📅בודק תאריכי יארצייט ויום הולדת");

    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 2);

    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth() + 1;
    console.log(`בודק תורמים עם יום הולדת או יארצייט בתאריך: ${targetDay}/${targetMonth}`);;

    try {
        const donors = await Donor.find();
        //בניית תוכן המייל עבור ימי הולדת
        const donorsBirthday = donors.filter(donor => {
            if (!donor.birthDate) return false;
            const date = new Date(donor.birthDate);
            console.log(`donor: ${donor.name} date: ${date.getDate()}/${date.getMonth() + 1}`);
            return date.getDate() === targetDay && date.getMonth() + 1 === targetMonth;
        });
        console.log("donorsBirthday", donorsBirthday);

        if (donorsBirthday.length === 0) {
            console.log("לפי בדיקה שנערכה כרגע, אין תורמים עם יום הולדת בעוד יומיים");
            return;
        }

        let emailBirthdayContent = `<h2>${new Date()} :תזכורת יום הולדת לתורמים הבאים בעוד יומיים בתאריך </h2><ul>`;
        for (const donor of donorsBirthday) {

            emailBirthdayContent += `<li> ${donor.name}</li>`;
        }
        emailBirthdayContent += `</ul>`;


        await sendEmail(process.env.EMAIL_RECIPIENT, "תזכורת יום הולדת לתורמים בעוד יומיים", emailBirthdayContent);

        console.log("✅ מייל יום הולדת נשלח בהצלחה");



        

        // בניית תוכן המייל עבור יארצייטים
        let emailYartzaitContent = `<h2>${new Date()} :תזכורת יארצייטים לתורמים הבאים בעוד יומיים בתאריך </h2><ul>`;
        donors.forEach(donor => {
            if (!donor.yahrzeitDate) return;  // אם אין תאריך יארצייט, לא נבדוק את התורם הזה

            donor.yahrzeitDate.forEach(yartzait => {
                const date = new Date(yartzait.date);
                console.log(`donor: ${donor.name} yartzait date: ${date.getDate()}/${date.getMonth() + 1}`);

                // אם היום והחודש תואמים
                if (date.getDate() === targetDay && date.getMonth() + 1 === targetMonth) {
                    emailYartzaitContent += `<li> ${donor.name} - ${yartzait.name} </li>`;
                }
            });
        });
        // סיום המייל
        emailYartzaitContent += "</ul>";
        if(emailYartzaitContent.includes("<li>")===false){
            console.log("לפי בדיקה שנערכה כרגע, אין תורמים עם יארצייט בעוד יומיים");
            return;
        }

        console.log("emailYartzaitContent", emailYartzaitContent);
        await sendEmail(process.env.EMAIL_RECIPIENT, "תזכורת יארצייט תורמים בעוד יומיים", emailYartzaitContent);
        console.log("✅ מייל יארצייט נשלח בהצלחה");

    }
    catch (error) {
        console.error("❌ שגיאה בשליחת מייל יום הולדת:", error);
    }
});