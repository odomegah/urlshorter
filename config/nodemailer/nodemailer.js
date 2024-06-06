import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
 service: "gmail",
 
  auth: {
    user: "yaposamson15@gmail.com",
    pass: "yapodenise5120",
  },
});

export  const sendMail = (to,subject,text)=>{
 return transpoter.sendMail(
    {
      from: "yaposamson15@gmail.com",
      to,subject,text
    },

    (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info) }
    }
  );
} 

