const uploadOnCloudinary = require('../Config/cloudinary'); 
const Listing = require('../Models/listingModel'); 
const User = require('../Models/userModel'); 

const addListing = async (req , res) => {
    try {
        const host = req.userId ; 
        const {title , description , rent , city , landmark , category} = req.body ;
        
        const image1 = await uploadOnCloudinary(req.files.image1[0].path); 
        const image2 = await uploadOnCloudinary(req.files.image2[0].path); 
        const image3 = await uploadOnCloudinary(req.files.image3[0].path); 

        const listing = await Listing.create({
            host , 
            title , 
            description , 
            rent , 
            city , 
            landmark , 
            category , 
            image1 , 
            image2 ,
            image3
        }); 

        const user = await User.findByIdAndUpdate(host , {$push:{listing:listing._id}} , {new:true}); 

        if(!user){
            res.status(404).json({
                success : false , 
                message : "User Not Found"
            }); 
        }

        res.status(201).json({
            success : true , 
            message : "Listing Created SuccessFully" , 
            listing : listing
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Creating Listing ${error}`
        });
    }
}; 


const getListing = async (req , res) => {
    try {
        const listing = await Listing.find().sort({createdAt:-1}); 
        res.status(200).json({
            success : true , 
            message : "Listings Fetched SuccessFully" , 
            listing : listing ,
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching Listings ${error}`
        })    
    }
}

module.exports = {addListing , getListing} ; 