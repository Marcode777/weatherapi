$(document).ready(function(){
  var weather = new XMLHttpRequest();
  // var r = weather.current_observation;
  var yeah

  $.ajax({
    type:"GET",
    url: "http://api.wunderground.com/api/3758d4a57136a50e/conditions/q/NY/New_York_City.json",
    success: function(data, textStatus, jqXHR){
      console.log(data.current_observation); //current_observation is from the key-value pair response, from reading the documentation and from opening console.log(data);
      console.log(data.response);
      console.log(textStatus);
      console.log(jqXHR);
      yeah = "Current location:" + data.current_observation.display_location.full + "<p><strong>";
      yeah += "current temp:" + data.current_observation.temperature_string + "<p><strong>";
      yeah += "feels like:" + data.current_observation.feelslike_string + "<p><strong>";
      yeah += "solar radiation:" + data.current_observation.solarradiation + "<p><strong>";
      yeah += "wind direction:" + data.current_observation.wind_dir + "<p><strong>";
      yeah += "wind speed:" + data.current_observation.wind_mph + "<p><strong>";
      yeah += "wind direction in degrees:" + data.current_observation.wind_degrees + "<p><strong>";
    

      document.getElementById("here").innerHTML = yeah;
    },
    error: function(jqXHR, textStatus, errorThrown){
     console.log(jqXHR);
     console.log(textStatus);
     console.log(errorThrown);
    }
  })
}); //this is the optimized and improved version, including more details such as feels like temp, and wind speed and wind direction


// var weather = new XMLHttpRequest();
// weather.open("GET", "http://api.wunderground.com/api/3758d4a57136a50e/conditions/q/NY/New_York_City.json", false); // on this line of code conditions, NY, and New_York_City can be substituted for what kind and which cities you want results for 
// weather.send(null);

// var r = JSON.parse(weather.response);

// var dis = "Current location: " + r.current_observation.display_location + "<p><strong>";
// dis +=  "current temp: " + r.current_observation.temperature_string + "<p><strong>";
// dis +=  " current wind speed: " + r.current_observation.wind_string +"<p><strong>"
// dis += "current wind direction:" +r.current_observation.wind_dir_string;
// document.getElementById("here").innerHTML = dis;




// $(document).ready(function(){
//   $.ajax({
//     type:"GET",
//     url:"http://api.wunderground.com/api/3758d4a57136a50e/conditions/q/CA/San_Francisco.json",
//     success: function(repos) {
//       for(var i = 0; i <repos.length; i++){
//         var newRepoUrl = buildRepoUrl(repos[i])
//         $(".here").append(newRepoUrl);
      
//       }
      
//     error: function(jqXHR, textStatus, errorThrown){
//      console.log(jqXHR);
//      console.log(textStatus);
//      console.log(errorThrown);
//     }
//   });

//   function buildRepoUrl(repoData){
//     var commitsApiUrl = "https://api.github.com/repos/";
//     commitsApiUrl += repoData.owner.login + "/";
//     commitsApiUrl += repoData.name + "/commits";

//     var newLink = $("<a>")
//       .attr("href", commitsApiUrl)
//       .addClass("list-group-item")
//       .append(repoData.full_name);
//     return newLink;
//   }
//   });

      // var callbackFunction = function(data) {
      // var wind = data.query.results.channel.wind;
      // alert(wind.chill);
      // },

// <script src="https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il')&format=json&callback=callbackFunction"></script>