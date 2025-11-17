const jwt = require('jsonwebtoken');

const isAuth = async (req , res , next) => {
    try {
        const token = req.cookies.token ; 
        if(!token){
            res.status(400).json({
                success : false , 
                message : 'Token Missing'
            }); 
        }

        const verifyToken = jwt.verify(token , process.env.JWT_SECRET);
        if(!verifyToken){
            res.status(400).json({
                success : false , 
                message : 'Invalid Token'
            });
        }

        req.userId = verifyToken.userId ; 
        next() ; 
    }

    catch (error) {
        res.status(500).json({
            success : false , 
            message : `isAuth Error : ${error}`
        }); 
    }
}

module.exports = isAuth