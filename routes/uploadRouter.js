var express = require('express');
var router = express.Router();

const upload = require('../config/common/upload')

/* GET users listing. */
// router.post('/test', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* POST upload file */
router.post('/upFile', upload.single('image'), async (req, res) => {
  try {
    console.log("abc");
    const file = req.file; 
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    console.log(imgUrl);

    // Gửi phản hồi về client
    res.status(200).json({ imageUrl: imgUrl });

  } catch (error) {
    console.error(error);
    }
});

module.exports = router;
