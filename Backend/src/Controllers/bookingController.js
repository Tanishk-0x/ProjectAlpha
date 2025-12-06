const Booking = require('../Models/bookingModel'); 
const Listing = require('../Models/listingModel'); 
const User = require('../Models/userModel'); 

const createBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        const {checkIn , checkOut , totalRent} = req.body ; 

        const listing = await Listing.findById(id); 

        // check for listing 
        if(!listing){
            res.status(404).json({
                success : false , 
                message : "Listing Not Found"
            }); 
        }

        // check for invalid dates
        if(new Date(checkIn) >= new Date(checkOut)){
            res.status(400).json({
                success : false , 
                message : "Invalid CheckIn/CheckOut Date"
            }); 
        } 

        // check for already booked or not?
        if(listing.isBooked){
            res.status(400).json({
                success : false , 
                message : "Listing Already Booked"
            }); 
        }

        // creating booking
        const booking = await Booking.create({
            checkIn ,
            checkOut ,
            totalRent , 

            host : listing.host , 
            guest : req.userId , 
            listing : listing._id ,
        });

        // push listing_id into user's booking
        const user = await User.findByIdAndUpdate(req.userId , {
            $push:{booking:listing._id} ,
        } , {new:true});

        if(!user){
            res.status(404).json({
                success : false , 
                message : "User Not Found"
            });
        }

        // mark the guest
        listing.guest = req.userId ; 

        // mark as booked 
        listing.isBooked = true ; 

        // save
        await listing.save(); 

        res.status(201).json({
            success : true , 
            message : "Booking Created SuccessFully" , 
            booking : booking 
        });
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Booking : ${error}`
        }); 
    }
}

const cancelBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        // IsBooked = False
        const listing = await Listing.findByIdAndUpdate(id , {isBooked:false})
        // Update in User's Booking 
        const user = await User.findByIdAndUpdate(listing.guest , {
            $pull:{booking:listing._id}
        },{ new:true });

        if(!user){
            res.status(404).json({
                success : false ,
                message : "User Not Found"
            }); 
        }

        res.status(200).json({
            success : true , 
            message : "Booking Canceled SuccessFully"
        }); 
    }
    
    catch (error) {
       res.status(500).json({
            success : false , 
            message : `An Error Occured While Cancel Booking : ${error}`
        }); 
    }
}

module.exports = {createBooking , cancelBooking}