var https = require("https");



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
      }
      break; // endpoint added here above

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