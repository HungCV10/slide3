var express = require('express');
var router = express.Router();

const modelUser = require('../models/user')
const JWT = require('jsonwebtoken')
const JWT_TOKEN_KEY = "restApi";
/* GET users listing. */
router.post('/checkLogin', async(req, res, next)=> {
  try {
        const { username, password } = req.body;

        const user = await modelUser.findOne({ username, password });
        console.log(user);

        if (user) {
            const token = JWT.sign({ id: user._id}, JWT_TOKEN_KEY, { expiresIn: '1h' });
            const refreshToken = JWT.sign({ id: user._id}, JWT_TOKEN_KEY, { expiresIn: '1d' });

            // Lưu refresh token vào global để check sau này
            res.json({
                "status": 200,
                "message": "Đăng nhập thành công",
                "data": {
                    "user": user
                },
                 "token": token,
                 "refreshToken": refreshToken
            });
        } else {
            res.json({
                "status": 400,
                "message": "Đăng nhập không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
