const cron = require('node-cron');
const { sendEmail } = require('./emailService');
const { checkThingsToSend } = require('./checkService');

const schedule = process.env.CRON_SCHEDULE || '0 8 * * *';

cron.schedule(schedule, async () => {
  console.log('⏳ מתחילים בדיקה יומית...');
  try {
    const items = await checkThingsToSend();
    for (const item of items) {
      await sendEmail(item.email, item.subject, item.html);
    }
    console.log('🎉 כל המיילים נשלחו!');
  } catch (err) {
    console.error('❌ שגיאה בשליחת המיילים', err);
  }
}, { timezone: 'Asia/Jerusalem' });
