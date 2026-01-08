const Listing = require('../Models/listingModel'); 
const GenerateContent = require('../GroqAI/ai.controller'); 
const QueryBuilder = require('../Config/queryBuilder');

// 1. fetch search query 
// 2. call groq to generate JSON
// 3. create query 
// 4. search for listing with that query 
// 5. return listings as response 

const naturalSearch = async (req , res) => {
    try {
        const searchQuery = req.body.searchquery ; 
        const flag = req.body.flag ; 

        if(!flag || !searchQuery){
            return res.status(403).json({
                success : false , 
                message : "Input Can't Be Empty"
            });
        }

        const response = await GenerateContent(searchQuery , flag); 

        const Query = await QueryBuilder(response); 

        const listing = await Listing.find(Query).sort({rent : -1});   

        if(!listing){
            return res.status(404).json({
                success : false , 
                message : "No Listing Found!"
            }); 
        }

        return res.status(200).json({
            success : true , 
            message : "Listing Found SuccessFully" , 
            response : response ,
            query : Query ,
            listing : listing
        }); 
 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured In Natural Search : ${error}`
        });    
    }
}

module.exports = naturalSearch ; 