const GenerateByGroq = require('./ai.service'); 

const GenerateContent = async ( searchquery ) => {
    try {
        const response = await GenerateByGroq( searchquery ) ; 

        const result = JSON.parse(response); 
        return result ; 
    }
    
    catch (error) {
        console.log(`Error : ${error}`)
        return error ;
    }
}

module.exports = GenerateContent ; 