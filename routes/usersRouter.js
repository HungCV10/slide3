var express = require('express');
var router = express.Router();

const modelUser = require('../models/user')
const upload = require('../config/common/upload')
const transporter = require('../config/common/mail')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/list', async (req, res) => {
  try {
    const data = await modelUser.find({});
    if (data) {
      res.json({
        "status": 200,
        "message": "dữ liệu ok",
        "data": data
      })
    } else {
      res.json({
        "status": 400,
        "message": "không lấy được dữ liệu",
        "data": []
      })
    }
    // res.send(data);
  } catch (error) {
    console.log(error)
  }
});

// lấy chi tiết
router.get('/detail/:id', async (req, res) => {
  try {
    const data = await modelUser.findById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})

// edit
router.put('/edit/:id', async (req, res) => {
  try {
    const data = await modelUser.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      address: req.body.address,
      image: req.body.image
    });
    await data.save();
    if (data) {
      res.json({
        "status": 200,
        "message": "sửa thành công",
        "data": data
      })
    } else {
      res.json({
        "status": 400,
        "message": "xóa thất bại",
        "data": []
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// xóa
router.delete('/delete/:id', async (req, res) => {
  try {
    const data = await modelUser.findByIdAndDelete(req.params.id);
    if (data) {
      res.json({
        "status": 200,
        "messenger": "xóa thành công",
        "data": data
      })
    } else {
      res.json({
        "status": 400,
        "messenger": "xóa thất bại",
        "data": []
      })
    }


  } catch (error) {
    console.log(error)
  }
})


// add user
router.post('/add',upload.single('image'), async (req, res) => {
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
    if (data) {
      // const mailOption = {
      //   from: 'cvhung93.mta@gmail.com',
      //   to: model.username,
      //   subject: 'Rest APT test',
      //   text: 'đây là mail đầu tiên'
      // }
      // await transporter.sendMail(mailOption);
      res.json({
        "status": 200,
        "message": "thêm thành công",
        "data": data
      })
    } else {
      res.json({
        "status": 400,
        "message": "thêm thất bại",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
    console.log("lỗi thêm dữ liệu")
  }
})

// // login
// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'Vui lòng cung cấp tên người dùng và mật khẩu',
//                 data: null
//             });
//         }

//         const user = await modelUser.findOne({ username, password });
//         if (user) {
//             const responseData = {
//                 id: user._id,
//                 username: user.username,
//                 refreshToken: "sample_refresh_token_" + user._id // Thay bằng logic token thực tế
//             };
//             res.json({
//                 status: 200,
//                 message: 'Đăng nhập thành công',
//                 data: responseData
//             });
//         } else {
//             res.status(401).json({
//                 status: 401,
//                 message: 'Tên người dùng hoặc mật khẩu không đúng',
//                 data: null
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: 500,
//             message: 'Lỗi server',
//             data: null
//         });
//     }
// });

// login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!username || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Vui lòng cung cấp tên người dùng và mật khẩu',
                data: null
            });
        }

        // Tìm người dùng trong database
        const user = await modelUser.findOne({ username, password });
        if (user) {
            const responseData = {
                id: user._id,
                username: user.username,
                refreshToken: "sample_refresh_token_" + user._id // Thay bằng JWT hoặc token thực tế
            };
            res.json({
                status: 200,
                message: 'Đăng nhập thành công',
                data: responseData
            });
        } else {
            res.status(401).json({
                status: 401,
                message: 'Tên người dùng hoặc mật khẩu không đúng',
                data: null
            });
        }
    } catch (error) {
        console.error('Lỗi server login:', error);
        res.status(500).json({
            status: 500,
            message: 'Lỗi server: ' + error.message,
            data: null
        });
    }
});
module.exports = router;
