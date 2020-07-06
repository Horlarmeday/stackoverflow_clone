import { sendEmail } from '../helpers/sendMail';

module.exports = agenda => {
  agenda.define('subscribers email', async job => {
    const emails = job.attrs.data.mails;
    await sendEmail(emails);
  });
};
