const mongoose = require('mongoose');
const dbName = "test-nodejs";
const host = "localhost:27017";
mongoose.connect(`mongodb://${host}/${dbName}`,(err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("connect DB successful...!");
});
//xây dựng 1 model
const User = mongoose.model('User', {name: String, roles: Array, age: Number});
//tạo 1 đối tượng
// let user1 = new User({name: 'admin', age: 22, roles: ['admin', 'moderator', 'user']});
// user1.save(function (err, userData) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('saved successfully:', userData);
//     }
//   });
// let _idUser = `608592b0f874582198d05c81`;
// User.findByIdAndUpdate(_idUser,{name:"admin2"},(err,userData)=>{
//     if (err) {
//         console.log(err);
//     } else {
//        console.log('updated successfully:', userData);
//     }
// });
let _idUser = `608592b0f874582198d05c81`;
User.findByIdAndDelete(_idUser,(err,userData)=>{
    if (err) {
        console.log(err);
    } else {
       console.log('deleted successfully:', userData);
    }
});
User.findById(_idUser);
