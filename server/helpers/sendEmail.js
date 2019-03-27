const nodemailer = require('nodemailer')

function sendEmail(email, data) {

    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ahmad.syukron6991@gmail.com",
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: "ahmad.syukron6991@gmail.com",
        to: email,
        subject: "happy monday",
        html:
            `job recomendation for you this. month ${data}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('success')
        }
    });
}

module.exports = sendEmail