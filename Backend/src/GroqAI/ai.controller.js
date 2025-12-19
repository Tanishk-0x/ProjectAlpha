const GenerateByGroq = require('./ai.service'); 

const GenerateContent = async (req , res) => {
    try {
        const ques = req.body.ques ; 
        
        if(!ques){
            return res.send({
                message : "Input Is Required!"
            }); 
        }

        const response = await GenerateByGroq( ques ) ; 

        res.send(response); 

        const result = JSON.parse(response); 
        console.log(result); 
    }
    
    catch (error) {
        console.log(`Error : ${error}`)
        return res.send({
            message : "Error" , 
            error : error 
        });
    }
}

module.exports = GenerateContent ; 