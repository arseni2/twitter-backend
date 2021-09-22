import nodemailer from 'nodemailer'


export async function sendMailConfirm(emailTo: string, userHash: string | undefined) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_USER_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.SMTP_USER,
        to: emailTo,
        subject: 'Sign Up for twitter',
        text: 'confirm account',
        html: `<h6>${userHash}</h6>`,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
