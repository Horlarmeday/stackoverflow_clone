import winston from 'winston';
import sgMail from '@sendgrid/mail';

// eslint-disable-next-line import/prefer-default-export
export async function sendEmail(email) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_MAIL);
    const msg = {
      to: email,
      from: 'StackOverflow<ajaomahmudah@gmail.com>',
      subject: 'Question Answered',
      text: 'The answer to the question has been provided',
    };
    await sgMail.send(msg);
    winston.info('Mail sent!');
  } catch (error) {
    winston.error(error.message);
    throw error;
  }
}
