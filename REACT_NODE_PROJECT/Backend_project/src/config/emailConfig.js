const path = require("path");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "darshitprajapati2904@gmail.com",
    pass: "oecg tdfv wxvi tukc",
  },
});

const sendOTP = (userEmail, subject, msg , filePath) => {
  mailOptions = {
    from: "6081darshitprajapati@gmail.com",
    to: userEmail,
    subject: subject,
    html: msg,
  };

//   if (filePath) {
//     mailOptions["attachments"] = [
//       {
//         path: path,
//       },
//     ];
//   }

if (filePath) {
  mailOptions["attachments"] = [
    {
      filename: path.basename(filePath), 
      path: filePath, 
    }
  ];
}

  transport.sendMail(mailOptions);
};

module.exports = sendOTP;
