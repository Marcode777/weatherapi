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
      console.log("intent request!"); // endpoint added here below
      switch(event.request.intent.name){
        case "getWeatherIntent":
          console.log(event.request.intent.name);
          var endpoint = "https://jsonplaceholder.typicode.com/posts/1"; // this works with this "placebo endpoint data"
          var body = "";
          var yeah
          https.get(endpoint, (response) => {
            response.on('data', (chunk) => {body += chunk})
            response.on('end', () => {
              var data = JSON.parse(body);
              var weatherCount = data;
              console.log(data);
              context.succeed(
                generateResponse(
                  buildSpeechletResponse("current temp is ${weatherCount}", true),
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

generateResponse = (sessionAttributes, speechletResponse) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}