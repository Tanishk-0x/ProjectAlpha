const express = require('express'); 
const router = express.Router() ; 
const isAuth = require('../Middlewares/authMiddleware'); 
const Upload = require('../Middlewares/multer');
const {addListing , getListing} = require('../Controllers/listingController'); 

router.post('/add' , isAuth , Upload.fields([
    {name:"image1" , maxCount:1 },
    {name:"image2" , maxCount:1 },
    {name:"image3" , maxCount:1 },
]) , addListing ); 

router.get('/get' , getListing); 


module.exports = router ; 