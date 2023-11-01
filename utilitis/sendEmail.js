import nodemailer from "nodemailer"
export const emailFunction = async(to,subject,html)=>{
    "use strict";
    const transporter = nodemailer.createTransport({
     service:"gmail",
      auth: {
        user: process.env.senderEmail,
        pass: process.env.Email_Password
      }
    });
      const info = await transporter.sendMail({
        from: process.env.senderEmail,
        to,
        subject, 
        html, 
      });
    console.log("Email Sent", info);
    return info;
}