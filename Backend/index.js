const express = require('express') ; 
require('dotenv').config() ; 
require('./src/Config/database').dbConnect() ; 

const app = express() ; 
const Port = process.env.PORT ; 


//Default Route 
app.get('/' , (req,res) => {
    res.send(`<h1>Default Route</h1>`)
});

//Starting Server
app.listen(Port , () => {
    console.log(`Server Started SuccessFully At Port : ${Port}✅`)
});