const nodemailer = require('nodemailer');
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
const Mailgun = require('mailgun.js')
const formData = require('form-data')

// Replace these values with your Ethereal email account details
const etherealUser = 'postmaster@sandbox05f29f595b5d439b8afae4c0632fc885.mailgun.org';
const etherealPassword = 'b687dd0dec3d87cc64ffea82149bd800-7ecaf6b5-7ea01295';

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.email',
  port: 587,
  auth: {
    user: etherealUser,
    pass: etherealPassword,
  },
});

const sendMail = async (to, subject, emailContent) => {
  try {
     // Read HTML content from the file

 
     // Replace placeholders in the HTML content
    //  const formattedContent = emailContent.replace(/{{username}}/g, templateData.username);
    // Send email
    const info = await transporter.sendMail({
      from: '"Fig Plug" <victorgbayedev@gmail.com>',
      to,
      subject,
      html: emailContent,
    });

    console.log('Email sent: %s', info.messageId);
    console.log(info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;

const API_KEY = '0219dc267a5b62399ee0cdf9b4919e33-7ecaf6b5-840028e0';
const DOMAIN = 'sandbox05f29f595b5d439b8afae4c0632fc885.mailgun.org';


const sendMail2 = async (to, subject, emailContent) => {

   const mailgun = new Mailgun(formData);
  const client = mailgun.client({username: 'api', key: API_KEY});
  
  const messageData = {
    from: 'Fig Plug team <me@samples.mailgun.org>',
    to,
    subject,
    html: emailContent,
  };
  
  client.messages.create(DOMAIN, messageData)
   .then((res) => {
     console.log(res);
   })
   .catch((err) => {
     console.error(err);
   });
 }

 module.exports = sendMail2;
