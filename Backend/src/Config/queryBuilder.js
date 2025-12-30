
const QueryBuilder = async (response) => {
    
    const Query = { isBooked : false } ; 

    if(response.city){
        Query.city = {$regex : response.city , $options:"i"}
    }

    if(response.landmark){
        Query.landmark = {$regex : response.landmark , $options:"i"}
    }

    if(response.category){
        Query.category = {$regex : response.category , $options:"i"} 
    }

    if(response.maxPrice){
        Query.rent = {$lte : response.maxPrice}
    }

    if( response.amenities && response.amenities.length > 0){
        const AmenitiesArray = response.amenities.map(item => new RegExp(item, "i")); 
        Query.amenities = { $all : AmenitiesArray }
    }

    return Query ; 

}

module.exports = QueryBuilder ; 