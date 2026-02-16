const express = require('express');
const { createBooking , cancelBooking , ApproveBooking} = require('../Controllers/bookingController');
const isAuth = require('../Middlewares/authMiddleware');
const router = express.Router(); 

router.post('/create/:id' , isAuth , createBooking); 
router.delete('/cancel/:id' , isAuth , cancelBooking);

router.post('/approve/:id' , ApproveBooking ); 

module.exports = router ; 