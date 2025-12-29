const GenerateByGroq = require('./ai.service'); 

const GenerateContent = async (req , res) => {
    try {
        const ques = req.body.ques ; 
        if(!ques){
            return res.status(403).json({
                success : false , 
                message : 'Input required!'
            });
        }
        const response = await GenerateByGroq( ques ) ; 

        return response ;
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Generate Content : ${error}`
        });
    }
}

module.exports = GenerateContent ; 