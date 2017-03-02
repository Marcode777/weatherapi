var https = require("https"); //***** for being able to fetch top-selling items, I think becoming an Amazon Advertising Associate might be required in order to be able to use Amazon's Product Advertising API, unless there is another Amazon API that's available for specifically fetching top-selling items



exports.handler = (event, context) => {

  try{

    if (event.session.new){
    // New Session
    console.log("new session!");
}
  switch (event.request.type){

    case "LaunchRequest":
    // > Launch Request
      console.log("launch request!");
      context.succeed(
        generateResponse(
          buildSpeechletResponse("Welcome!!!!!!!! Let's make this work!", true),
          {}
          )
      )
      break;

    case "IntentRequest":
    // > Intent Request
      console.log("intent request!"); 
      console.log("come on and work!");// endpoint added here below
      switch(event.request.intent.name){
        case "getWeatherIntent":
          var endpoint = "https://api.wunderground.com/api/3758d4a57136a50e/conditions/q/NY/New_York_City.json"; // *remember to have the https format * this works with this "placebo endpoint data" https://jsonplaceholder.typicode.com/posts ***** api.openweathermap.org/data/2.5/weather?zip=10005,us&APPID=08d6215ef934232110949692d5ffb8da  
          var body = ""
          https.get(endpoint, (response) => {
            response.on('data', (chunk) => {body += chunk})
            response.on('end', () => {
              var data = JSON.parse(body);
              var weatherCount = data.current_observation.temperature_string; // when accessing data, and accessing items, such as the username of the first item in an array, use syntax in this form: data[0].username
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`current temperature in New York City is ${weatherCount}`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )
            })
          })
      
      break; // endpoint added here above

       // this section is the new experimental/trial and error section
        
        case "getResponseIntent":
          
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`current response is this response`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )
      
      break; // also added this break statement

        case "getDiapersComIntent":

              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`Sure, what would you like to ask Diapers.com?`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )

        break;

        case "getDiapersClothIntent":

              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`Sure, some parents choose to use cloth diapers over disposable ones because they are reusable, green, cost-efficient and adorable. For two to three years, your baby's life and yours will be dominated by diapers. Lots of them. New-borns typically need to be changed 10 to 12 times a day. By the time your child can sleep through the night, that number goes down to about 8 changes a day. If you are considering using cloth diapers for your baby, would you like me to tell you how cloth diapers work, or how to clean cloth diapers or how many you would need?`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )

        break; // At this point, in order to have Alexa answer a user's question, I am having to make a unique intent for every question to answer it.

        case "getDiapersHowClothDiapersWorkIntent":

              context.succeed(
                generateResponse( // keep in mind that Alexa's response texts can not have any special characters
                  buildSpeechletResponse(`Sure, the basic design of a cloth diaper is based on a water-proof outer cover with an absorbent interior. There are three broad styles: the first style is a flat diaper, which is essentially a rectangular cloth that you wrap around the baby and secure with fasteners. The cloth acts as the absorbent interior. Over the flat diaper, the baby wears a cover made of waterproof material. The second style is a pocket diaper, which is a cover with a built-in interior pouch that holds an absorbent water insert. The insert is washable and reusable. The third style is an all-in-one diaper that is most similar in design to a disposable diaper. The cover is waterproof, but instead of relying on a pocket insert, the entire interior is absorbent. Would you like to find out about how to clean the diapers?`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )

        break;

        case "getDiapersHowToCleanClothDiapersIntent":

              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`Sure, you will want to start by disposing of solid waste. There are ways to make this task easy, and not so icky, most notably, flushable inserts that work with all styles of cloth diapers, and sprayers that attach to your toilet and remove solid waste with a stream of water. Once solid waste is removed, simply place used cloth diapers in a pail with a liner, then throw them into the wash every two to three days. Cloth diapers come with explicit care instruction, but in general, they require an extra wash and or rinse. You can use the same detergent that you use for your baby's clothes, or buy a special cloth-diaper detergent. No bleach is necessary. Diaper covers should generally be air-dried because dryers can damage the waterproof coating.`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )

        break;

        case "getDiapersHowManyClothDiapersDoINeedIntent":

              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`Here is where the math adds up. Once you find the brand that fits well, and assuming you wash a load of diapers every two to three days, you'll only need about 30 cloth diapers to carry your child through potty training.`, true), // another key was to change the quotes surrounding object literals into backticks
                  {}
                  )
                )

        break;


    } // this is the event request type end-bracket, every intent, both old and new should be contained here prior to this end-bracket

    case "SessionEndedRequest":
    // > Session Ended Request
      console.log("session ended request!");
      break; 

    default:
      context.fail("invalid request type!: {event.request.type}");
  }

  } catch(error) {context.fail("Exception: ${error}")}
  
  

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return{
    outputSpeech:{
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}