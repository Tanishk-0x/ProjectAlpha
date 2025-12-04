const express = require('express');
const { createBooking } = require('../Controllers/bookingController');
const isAuth = require('../Middlewares/authMiddleware');
const router = express.Router(); 

router.post('/create/:id' , isAuth , createBooking); 


module.exports = router ; 