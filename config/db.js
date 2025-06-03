// cài đặt: npm i mongoose 
const mongoose = require('mongoose') // khai báo thư viện
mongoose.set('strictQuery', true);

// atlat
const atlat = "mongodb+srv://hungcv10:hungcv10@cluster0.ulii1zt.mongodb.net/test01?retryWrites=true&w=majority&appName=Cluster0";

// local
const local = "mongodb://127.0.0.1:27017/dbtest";

// tạo hàm kết nối
const connect = async()=>{
    try {
        await mongoose.connect(atlat, {
            useNewUrlParser: true,
            useUnifiedTopology: true// giúp kết nối ổn định hơn
        })
        console.log("kết nối thành công")
        
    } catch (error) {
        console.log("kết nối thất bại");
        console.log(error);
    }
}

module.exports = {connect}