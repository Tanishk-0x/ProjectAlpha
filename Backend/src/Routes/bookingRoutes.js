const express = require('express');
const { createBooking , cancelBooking } = require('../Controllers/bookingController');
const isAuth = require('../Middlewares/authMiddleware');
const router = express.Router(); 

router.post('/create/:id' , isAuth , createBooking); 
router.post('/cancel/:id' , isAuth , cancelBooking);

module.exports = router ; 