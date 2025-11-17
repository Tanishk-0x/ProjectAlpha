const express = require('express'); 
const isAuth = require('../Middlewares/authMiddleware');
const getCurrentUser = require('../Controllers/userController');
const router = express.Router() ; 


router.get('/getuser' , isAuth , getCurrentUser);


module.exports = router ; 