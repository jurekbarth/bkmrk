import htmlToText from 'html-to-text';

import sendMail, { generateHTML } from './config';

async function sendResetPasswordEmail(email, token) {
  try {
    let url = `https://bkmrk.space/resetPassword/${token}`;
    if (process.env.DEV === true) {
      url = `http://localhost:3002/resetPassword/${token}`;
    }
    const obj = {
      resetURL: url,
    };
    const html = generateHTML('password-reset', obj);
    const text = htmlToText.fromString(html);
    const mailOptions = {
      from: '"👨‍🚀 bkmrk.space" <noreply@bkmrk.space>',
      to: email,
      subject: 'Passwort zurücksetzen 🔑',
      text,
      html,
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.log('error', error);
  }
}

export default sendResetPasswordEmail;
