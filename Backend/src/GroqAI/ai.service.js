const Groq = require('groq-sdk'); 

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY 
});

const GenerateByGroq = async ( ques ) => {
    try {
        const ChatCompletion = await groq.chat.completions.create({
            // Model ... 
            model : "llama-3.3-70b-versatile" ,

            // Message ... 
            messages : [
                {
                    role : "system" ,
                    content : `
                            You are an API middleware that converts natural language search queries into a structured query object.
                            Extract specific search parameters from the user's input and map them strictly to the allowed JSON schema below.
                            
                            ### ALLOWED SCHEMA (Output this JSON only)
                            {
                                "location": String | null,       // e.g. "Mumbai", "Goa"
                                "maxPrice": Number | null,       // Extract numeric value. If user says "2k", output 2000.
                                "propertyType": String | null,   // Map to one of: ["Apartment", "Villa", "Studio", "Shared"]
                                "bedrooms": Number | null,       // Minimum number requested
                                "amenities": String[]            // Extract Like: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Pet Friendly"]
                            }

                            RULES & CONSTRAINTS
                            1. If a specific field is not mentioned, set it to null.
                            2. Smart Logic: - If the user says "cheap", set "maxPrice" to 2000 (or a reasonable default). 
                                - If the user says "luxury", set "minPrice" to 10000.
                                - Convert "couple friendly" to "amenities": ["Privacy"] or ignore if not in list.
                            3. Synonym Mapping:
                                - Map "gym" or "workout" -> "Gym" (if in amenities list, otherwise ignore).
                                - Map "internet" -> "WiFi".
                            4. Return **ONLY valid JSON**. Do not include markdown formatting like \`\`\`json or \`\`\`.

                            ### Example
                            Input: "I need a villa in Manali under 5000 with a heater"
                            Output: { "location": "Manali", "maxPrice": 5000, "minPrice": null, "propertyType": "Villa", "bedrooms": null, "amenities": ["Heater"] }

                    `
                },
                {
                    role : "user" , 
                    content : ques 
                }
            ]
        }); 

        const result = (ChatCompletion.choices[0].message.content)

        return result ;
    }
    
    catch (error) { 
        console.log(`Error In Groq : ${error}`);
        return error ;
    }
}

module.exports = GenerateByGroq ; 
