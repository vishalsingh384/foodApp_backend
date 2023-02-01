const nodemailer = require("nodemailer");
const { email_id, stripe_pvt_key } = require("../secrets");

// async..await is not allowed in global scope, must use a wrapper
//str-> 'signup'/'forgetpassword'
module.exports.sendMail=async function sendMail(str,data) {
  // console.log("pumba",data);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email_id, // generated ethereal user
      pass: stripe_pvt_key, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let eSubj,eHtml;
  if(str=="signup"){
    eSubj=`Thank you for signing ${data.name}`;
    eHtml=`
        <h1>Welcome to foodApp.com</h1>
        Hope you have a great experience 
        Here are your details
        Name - ${data.name}
        Email - ${data.email}
        `;
  }else if(str=="forgetpassword"){
    eSubj=`Reset password`;
    eHtml=`
        <h1>foodApp.com</h1>
        Here is your link to reset password : ${data.resetPasswordLink}
        `;
  }

  //send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 👻" <foodApp101>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: "Hello world?", // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
