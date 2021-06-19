const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");




});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxx";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesription = weatherData.weather[0].description;
      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      const humidity = weatherData.main.humidity;
      const pressure = weatherData.main.pressure;
      const windSpeed = weatherData.wind.speed;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDesription + "<p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degree celcius.</h1>");
      res.write("<p>Minimum temperature is " + minTemp + " and maximum temperature is " + maxTemp + "<p>");
      res.write("<p>Humidity is " + humidity + " pressure is " + pressure + " and wind speed is " + windSpeed + "km/h<p>");
      res.write("<img src= " + imageUrl + ">");
      res.send();
    })
  });


})






app.listen(3000, function() {
  console.log("server is running at port 3000");
});
