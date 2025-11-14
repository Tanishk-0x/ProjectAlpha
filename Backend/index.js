const express = require('express') ; 
require('dotenv').config() ; 
require('./src/Config/database').dbConnect() ; 
const authRoutes = require('./src/Routes/authRoutes') ;
const cookieParser = require('cookie-parser');

const app = express() ; 
const Port = process.env.PORT ; 

app.use(cookieParser());
app.use(express.json()); 

//Mounting
app.use('/auth' , authRoutes);


//Starting Server
app.listen(Port , () => {
    console.log(`Server Started SuccessFully At Port : ${Port}✅`)
});