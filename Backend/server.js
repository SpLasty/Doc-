const express = require('express');
const app = express();
require('dotenv').config()
const userRoute = require('./Routes/userRoute')
const adminRoute = require('./Routes/adminRoute')
const doctorRoute = require('./Routes/doctorRoute')
const database = require('./config/database');
app.use(express.json()) //Destructure the json data that the client is sending
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())




app.use('/api/user', userRoute) // whenever api request is coming with 'user', go and search api endpoints in userRoute
app.use('/api/admin', adminRoute) 
app.use('/api/doctor', doctorRoute)


app.listen(port, ()=>
    console.log(`Here at  ${port}`)
)