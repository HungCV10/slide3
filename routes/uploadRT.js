var express = require('express');
var router = express.Router();

const upload = require('../config/common/upload')

/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('đây là màn upload hình ảnh');
});


module.exports = router;
