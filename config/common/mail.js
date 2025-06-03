var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "cvhung93.mta@gmail.com",
        pass: "dzxr stuh omrj gyaz"
    }
})
module.exports = transporter;