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

const findListing = async (req , res) => {
    try {
        const {id} = req.params ; 
        const listing = await Listing.findById(id); 

        if(!listing){
            res.status(404).json({
                success : false , 
                message : "Listing Not Found"
            });
        }

        res.status(200).json({
            success : true , 
            message : "Listing Found SuccessFully" , 
            listing : listing
        });
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Finding Listings ${error}`
        })
    }
}

const updateListing = async (req , res) => {
    try {
        let image1 ; 
        let image2 ; 
        let image3 ; 
        const {id} = req.params ; 
        const {title , description , rent , city , landmark , category} = req.body ;
        
        if(req.files.image1){
            image1 = await uploadOnCloudinary(req.files.image1[0].path); 
        }
        if(req.files.image2){
            image2 = await uploadOnCloudinary(req.files.image2[0].path); 
        }
        if(req.files.image3){
            image3 = await uploadOnCloudinary(req.files.image3[0].path); 
        }   

        const listing = await Listing.findByIdAndUpdate( id , {
            title , 
            description , 
            rent , 
            city , 
            landmark , 
            category , 
            image1 , 
            image2 ,
            image3
        }, { new:true }); 


        res.status(201).json({
            success : true , 
            message : "Listing Updated SuccessFully" , 
            listing : listing
        });

    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Updating Listings ${error}`
        }); 
    }
}

const deleteListing = async (req , res) => {
    try {
        const {id} = req.params ; 
        const listing = await Listing.findByIdAndDelete(id); 
        const user = await User.findByIdAndUpdate(listing.host , {
            $pull:{listing:listing._id} , 
        },{new:true});
        
        if(!user){
            res.status(404).json({
                success : false , 
                message : 'User Not Found'
            });
        }

        res.status(200).json({
            success : true , 
            message : 'Listing Deleted SuccessFully'
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Deleting Listing ${error}`
        }); 
    }
}

const rateListing = async (req , res) => {
    try {
       const {id}= req.params ; 
       const {ratings} = req.body ; 
       const listing = await Listing.findById(id); 
       
       if(!listing){
            res.status(404).json({
                success : false , 
                message : "Listing Not Found"
            }); 
       }

        // Update Listing 
       listing.ratings = Number(ratings);
       await listing.save();  

       res.status(200).json({
            success : true , 
            message : "Thanks For Your FeedBack" , 
            ratings : listing.ratings  
       }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Rating Listing ${error}`
        })    
    }
}

const searchListing = async (req , res) => {
    try {
        const { query } = req.query ; 

        if(!query){
            res.status(400).json({
                success : false , 
                message : "Search Query Is Required"
            }); 
        }

        const listing = await Listing.find({
            $or : [
                { landmark : { $regex : query , $options : "i"}} , 
                { city : { $regex : query , $options : "i"}} , 
                { title : { $regex : query , $options : "i"}} , 
            ]
        }); 

        res.status(200).json({
            success : true , 
            message : "Listing Fetched" , 
            listing : listing
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Search Listing ${error}`
        })     
    }
}

module.exports = {addListing , getListing , findListing , updateListing , deleteListing , rateListing , searchListing} ; 