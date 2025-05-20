import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

const sendEmail = async (email:string,body:string)=>{
    await transporter.sendMail({
        from: '',
        to: email,
        subject: '',
        text: body,
    });
}

export default sendEmail