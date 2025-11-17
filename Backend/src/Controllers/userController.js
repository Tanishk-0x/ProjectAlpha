const User = require('../Models/userModel'); 

const getCurrentUser = async (req , res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); 
        if(!user){
            res.status(400).json({
                success : false , 
                message : 'User Not Fetched'
            });
        }

        res.status(200).json({
            success : true , 
            message : 'User Fetched SuccessFully' , 
            user : user 
        }); 
    }

    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching User: ${error}`
        });
    }
}

module.exports = getCurrentUser;