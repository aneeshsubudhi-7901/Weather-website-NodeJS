const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=79b2c6f9866e0e2ee42c7062f9cf1193&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    //we shorthand syntax for url hence we replaced url:url with url.destructuring used,only body is needed
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const temp = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`;
      callback(undefined, temp);
    }
  });
};

module.exports = forecast;
