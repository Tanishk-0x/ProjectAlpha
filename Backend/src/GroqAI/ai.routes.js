const express = require('express'); 
const router = express.Router();
const GenerateContent = require('./ai.controller'); 

router.post('/genresponse' , GenerateContent); 

module.exports = router ; 