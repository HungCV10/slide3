var express = require('express');
var router = express.Router();

const transporter = require('../config/common/mail')

/* GET users listing. */
router.post('/test', function(req, res, next) {
  const mailOption = {
    from: 'cvhung93.mta@gmail.com',
    to: 'hungcv93@gmail.com',
    subject: 'demo rest api',
    text: 'nội dung gửi'
  }

  transporter.sendMail(mailOption, function(error, info){
    if(error){
        return res.status(500).json("Gửi mail thất bại: " + error.message);
    } else {
        return res.status(200).json("Gửi mail thành công");
    }
  });
});

module.exports = router;
