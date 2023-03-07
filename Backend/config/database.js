const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const connect = mongoose.connect(process.env.MongoDB_URI);

const connection = mongoose.connection

connection.on('connected', ()=>{
    console.log('Database connection success')
})

connection.on('error',()=>{
    console.log('Database connection failed')
})

module.exports = mongoose;