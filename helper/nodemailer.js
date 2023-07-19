const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const { getMaxListeners } = require('../services/items/items.model');

// Use sensible defaults for SMTP connection pooling
var emailConfig = {
    host: process.env.SMTP_HOST,
    secureConnection: process.env.SMTP_SECURE_CONNECTION === 'true' ? true : false,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASSWORD
    }
};

const SOURCE_EMAIL = process.env.SMTP_SOURCE_EMAIL;

const transporter = nodemailer.createTransport(smtpTransport(emailConfig));

module.exports.sendMail = async (data) => {
    let fromEmail = `<${SOURCE_EMAIL}>`;

    let mailOptions = {
        from: fromEmail, // Default From receipent [String]
        //to: data.to, // Email To receipent [Array or String]
        to:data.to,
        subject: data.subject, // Email subject [String]
        text: data.text, // Renderer text data [String]
        html: data.html, // Renderer Html data [String]
        // replyTo: data.replyTo,
        ses: {
            // Optional extra arguments for SendRawEmail
            // Not nessasary for the now
        },
        attachments: [] //Default empty attachment [Array[{}]]
    };

    if (data.cc) {
        //If email cc available
        mailOptions.cc = data.cc; //Eamil cc receipent [Array or String]
    }
    if (data.bcc) {
        //If email bcc avaibale
        mailOptions.bcc = data.bcc; //Eamil bcc receipent [Array or String]
    }
    // send mail with defined transport object
    return await transporter.sendMail(mailOptions);
};
    