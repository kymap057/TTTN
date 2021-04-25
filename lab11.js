const event = require('events');

const eventEmitter =  new event.EventEmitter();
eventEmitter.on('connection',(data)=>{
    console.log("connection successful...! ",data);
})
//thực thi sự kiện
eventEmitter.emit('connection', new Date());