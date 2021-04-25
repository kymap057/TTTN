const nodemailer = require('nodemailer');

const option = {
    service :"Gmail",
    auth: {
        user: "vohoangky147@gmail.com", // email hoặc username
        pass: "password" // password
    }
};
const transporter = nodemailer.createTransport(option);
transporter.verify(
    function(error, success) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('Kết nối thành công!',success);
            var mail = {
                from: 'vohoangky147@gmail.com', // Địa chỉ email của người gửi
                to: 'vohoangky147@gmail.com', // Địa chỉ email của người gửi
                subject: 'Thư được gửi bằng Node.js', // Tiêu đề mail
                text: 'send mail nodemailer nodejs....! Hoàng kỳ', // Nội dung mail dạng text
            };
            //Tiến hành gửi email
            transporter.sendMail(mail, function(error, info) {
                if (error) { // nếu có lỗi
                    console.log(error);
                } else { //nếu thành công
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
