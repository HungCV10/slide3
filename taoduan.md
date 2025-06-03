1. trỏ vào thư mục chứa dự án
mở terminal dùng lệnh: express --view=hbs <Tên dự án> 
2. Mở dự án vừa tạo
    chạy lệnh: npm i nodemon
3. Mở file package.json, tại “scripts” thêm dòng code:
"dev": "nodemon .bin/www"


đóng cổng
netstat -ano | findstr :4000
taskkill /PID 12345 /F   (12345 là listioning)