const nodemailer = require('nodemailer');
const { getMessage } = require('./messageBank');

require('dotenv').config();
require('dotenv').config({ path: '../.env' });



let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (recipient, subject, array = null, data = null) => {
    const message = getMessage(subject); // Retrieve message from storage based on subject
    const formattedMessage = message.replace(/\{([^}]+)\}/g, (match, p1) => {
        return data[p1]; // Replace placeholders in the message with actual data
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        subject: subject,
        html: `
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <p style="">${formattedMessage}</p>
                </body>
            </html>
        `
    };
    if (array) {
        mailOptions.to = recipient.join(',');
    } else {
        mailOptions.to = recipient;
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
    });
};

// Example usage:
const recipientEmail = 'raeygetahun@gmail.com';
const emailSubject = 'Account Rejected';
const emailMessage = 'This is the body of the email message.';
const name = { reason: "raey geathun" }

// Call the sendEmail function with appropriate parameters
// sendEmail(recipientEmail, emailSubject, false);
module.exports = sendEmail;
