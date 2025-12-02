const express = require('express'); 
const router = express.Router() ; 
const isAuth = require('../Middlewares/authMiddleware'); 
const Upload = require('../Middlewares/multer');
const {addListing , getListing , findListing , updateListing} = require('../Controllers/listingController'); 

router.post('/add' , isAuth , Upload.fields([
    {name:"image1" , maxCount:1 },
    {name:"image2" , maxCount:1 },
    {name:"image3" , maxCount:1 },
]) , addListing ); 

router.get('/get' , getListing); 
router.get('/findlistingbyid/:id' , isAuth , findListing); 

router.post('/update/:id' , isAuth , Upload.fields([
    {name:"image1" , maxCount:1 },
    {name:"image2" , maxCount:1 },
    {name:"image3" , maxCount:1 },
]) , updateListing ); 

module.exports = router ; 