const express = require('express'),
      path= require('path'),
      app = express(),
      request = require('request'),
      moment = require('moment'),
      geocode= require('./util/geocode'),
      forecast = require('./util/forecast'),
      newspapers= require('./util/newspaper'),
      nCoVid = require('./util/ncovi');
require('dotenv').config({path:'./config/.env'})


const publicDirectoryPath= path.join(__dirname,'../public');

//set định dang views
app.set('view engine','ejs');
//đường dẫn đến thư mục
app.set('views','./views');
//cấu hình public
app.use(express.static(publicDirectoryPath));
const { Console } = require('console');
//vị trí đồng bộ template
var engine = require('ejs-locals');
app.engine('ejs',engine);


//request sever
app.get('/weather-app',(req,res)=>{
  
    if(!req.query.address){
       return res.send({
           err:'you must provide an address...!!',
           messenger: 400
       })
    }
    geocode(req.query.address,(err,data)=>{
        if(err) return res.send({
            error:'unable to find location..!!',
            messenger:400
        });
        forecast(data.latitude,data.longitude,req.query.lang,(error,dataWeather)=>{
            if(error) res.send({error});
            res.send({
                dataWeather,
                location: data.location,
                messenger: 200
            });
        });

    });
});

//client
app.get('/',async (req,res)=>{
    await newspapers((err,data)=>{
        if (err) {
            return res.redirect('*')
        }
        let time = new Date();
        console.log('index loaded')
        res.render('index',{
            title: 'Trang Chủ',
            content:'Tin tức trong ngày',
            description:`Được cập nhật ngày ${moment().format('DD/MM/YYYY')}`,
            data: data,
            path:'/'
        })
    })
    
});

app.get('/about',(req,res)=>{
    let lists=[
        {name: 'Facebook ', link: 'https://www.facebook.com/liberty.vhk',text:'Hoàng kỳ',icon:'fa fa-facebook-square'},
        {name: 'SĐT', link: 'tel:0388417767',text:'0388417767',icon:'fa fa-phone-square'},
        {name: 'Gmail ', link: 'mailto:vohoangky147@gmail.com',text:'Hoàng kỳ',icon:'fa fa-envelope'},
        {name: 'GitHub ', link:'https://github.com/kymap057',text:'https://github.com/kymap057',icon:'fa fa-github'},
    ]
    res.render('about',{
        title: 'About',
        content: 'Thông tin liên hệ: ',
        lists: lists,
        path:'/about'
    })
}); 
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        content:`Time: ${moment().format('DD-MM-YYYY')}`,
        path:'/help'
    })
});
app.get('/weather',(rep,res)=>{
    res.render('weather',{
        title:'Weather-App',
        path:'/weather'
    })
});
app.get('/ncovid',async (rep,res)=>{
    let c1 = await nCoVid.SumCov1();
    const data = c1.data;
    console.log(c1.sum1,' ', c1.sum2,' ',c1.sum3,' data length: ',data.length);
    res.render('ncovi', {
        title:'nCoVid',
        description:`Được cập nhật ngày ${moment().format('DD/MM/YYYY')}`,
        sum: c1.sum,
        st1: c1.sum1,
        st2: c1.sum2,
        st3: c1.sum3,
        lists: data,
        path:'/ncovid'
   });
});
app.get('*',(rep,res)=>{
    console.log("page not found...!")
    res.render('not-found',{
        title:'404',
        path:''
    })
});
const port= process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`app listen post ${port}....!`);
});