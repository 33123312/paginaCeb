const nodemailer = require("nodemailer");
const mailCred = require("../../credentials/EmailCredentials")

module.exports = function (alumno, password) {

    let transporter = nodemailer.createTransport(mailCred);
  
    transporter.sendMail({
      from:"eltrocdero@gmail.com", // sender address
      to: alumno.email, // list of receivers
      subject: "Hola " + alumno.nombres, // Subject line
      html: 
      "<div>hola " +
       alumno.nombres +
        ", aquí está tu contraseña web, recuerda guardarla muy bien : " 
        + password +
         "</div>", // html body
    });
  
  }
  
