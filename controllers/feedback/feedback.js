require("dotenv").config();
const nodemailer = require("nodemailer");
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const emailSendler = ({ email, message }) => {
    
    const emailMsg  = {
        from: UKR_NET_EMAIL,
        to: "sven4369@gmail.com",
        subject: "Feedback",
        html: `
        <div style="text-align:center;">
        <h1 style="font-size:36px;" >Email </h1><a href=${email} style="font-size:22px; color:black;text-decoration:none;" type="email">${email}</a> <br/>
        <h2 style="font-size:36px;" >Message </h2>
        <p style="font-size:22px" >${message}</p>
        </div>
        `
    
    }

    transport.sendMail(emailMsg);
}

const sendFeedback = async (req, res) => {
    const { email, message } = req.body;

    const verifyEmail = { email, message };

    await emailSendler(verifyEmail);
    res.status(201).json({
        message : "Email sent"   
    })

};

module.exports = sendFeedback;
