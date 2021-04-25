const request = require('request');

request.post({
    url:'https://testapihk.herokuapp.com/users',//địa chỉ trang
    method:"POST",//phương thức thực hiện
    body: JSON.stringify({ // data được gửi lên server
            description: "test request",
            name: "Nodejs 2021",
            email: "testRequest@gmail.com",
            password: "matkhau123"
        })
    },(err,res,body)=>{
        //nếu có lỗi
        if (err){//in ra lỗi
            console.log(err.message);
        }
        //in ra header
        console.log(res);
        //in ra body nhận được
        console.log(body);
    })

