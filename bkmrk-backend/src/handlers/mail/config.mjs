import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import path from 'path';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const generateHTML = (filename, options = {}) => {
  const dirname = path.resolve();
  const html = pug.renderFile(`${dirname}/src/handlers/mail/templates/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;
};

async function sendEmail(mailOptions) {
  const p = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('error', error);
        reject(error);
      }
      console.log('info', info);
      resolve(info);
    });
  });
  return p;
}

export default sendEmail;
