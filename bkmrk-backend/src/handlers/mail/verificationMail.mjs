import htmlToText from 'html-to-text';

import sendMail, { generateHTML } from './config';

async function sendVerificationEmail(email, token) {
  try {
    let url = `https://bkmrk.space/verify/${token}`;
    if (process.env.DEV === true) {
      url = `http://localhost:3002/verify/${token}`;
    }
    const obj = {
      token: url,
    };
    const html = generateHTML('verify-email', obj);
    const text = htmlToText.fromString(html);
    const mailOptions = {
      from: '"👨‍🚀 bkmrk.space" <noreply@bkmrk.space>',
      to: email,
      subject: '✉️ Email bestätigen',
      text,
      html,
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.log('error', error);
  }
}

export default sendVerificationEmail;
