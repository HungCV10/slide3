var express = require('express');
var router = express.Router();

const modelUser = require('../models/user')
const upload = require('../config/common/upload')
const transporter = require('../config/common/mail')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/list', async(req, res)=> {
     try {
    const data = await modelUser.find({});
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

// lấy chi tiết
router.get('/detail/:id', async(req, res)=>{
  try {
    const data = await modelUser.findById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})

// edit
router.put('/edit/:id', async(req, res)=>{
  try {
    const data = await modelUser.findByIdAndUpdate(req.params.id, req.body);
    await data.save();
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})

// xóa
router.delete('/delete/:id', async(req, res)=>{
  try {
    const data = await modelUser.findByIdAndDelete(req.params.id);
        if(data){
      if(data){
      res.json({
        "status": 200,
        "messenger": "xóa thành công",
        "data": data
      })
    }else{
      res.json({
        "status": 400,
        "messenger": "xóa thất bại",
        "data": []
      })
    }
    }

  } catch (error) {
    console.log(error)
  }
})


// add user
router.post('/add',upload.single('image'), async(req, res)=> {
  try {
    const file = req.file; 
    const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    const model = new modelUser({
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      address: req.body.address,
      image: imgUrl

    });
    const data = await model.save();
    //res.send(data);
    if(data){
      const mailOption = {
        from: 'cvhung93.mta@gmail.com',
        to: model.username,
        subject: 'Rest APT test',
        text: 'đây là mail đầu tiên'
      }
      await transporter.sendMail(mailOption);
      res.json({
        "status": 200,
        "messenger": "thêm thành công",
        "data": data
      })
    }else{
      res.json({
        "status": 400,
        "messenger": "thêm thất bại",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
    console.log("lỗi thêm dữ liệu")
  }
})

module.exports = router;
