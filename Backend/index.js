const express = require('express') ; 
require('dotenv').config() ; 
require('./src/Config/database').dbConnect() ; 
const authRoutes = require('./src/Routes/authRoutes') ;
const userRoutes = require('./src/Routes/userRoutes') ; 
const cookieParser = require('cookie-parser');
const cors = require('cors') ;

const app = express() ; 
const Port = process.env.PORT ; 

//Setup Cors
app.use(cors({
    origin : "http://localhost:5173" , 
    credentials : true
}));

app.use(cookieParser());
app.use(express.json()); 

//Mounting
app.use('/auth' , authRoutes);
app.use('/user' , userRoutes);


//Starting Server
app.listen(Port , () => {
    console.log(`Server Started SuccessFully At Port : ${Port}✅`)
});