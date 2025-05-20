import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
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