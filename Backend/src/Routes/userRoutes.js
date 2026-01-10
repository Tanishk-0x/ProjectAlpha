const express = require('express'); 
const isAuth = require('../Middlewares/authMiddleware');
const {getCurrentUser , AddPhone} = require('../Controllers/userController');
const router = express.Router() ; 

router.get('/getuser' , isAuth , getCurrentUser);

router.post('/addphone' , isAuth , AddPhone); 

module.exports = router ; 