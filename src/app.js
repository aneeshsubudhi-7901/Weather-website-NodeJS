const path = require("path"); //nodejs core module
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// console.log(__dirname); //contains path to the directory
// //console.log(__filename); //contains path to the file itself
// console.log(path.join(__dirname, "../public")); //to go one folder up and go to public.now comes serving up the directory

const app = express(); //to store our application

//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs"); //for express setting,to set a valur fora particular express setting
app.set("views", viewsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath)); //static takes th folder we want ot serve up)

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aneesh Subudhi",
  }); //no need for file extension,we are using hbs,it converts into html;first argument is view that we want to render,second arg:values that the view can access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aneesh Subudhi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Aneesh Subudhi",
  });
});

app.get("/weather", (req, res) => {
  //res.send("Weather page");
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          coordinates: [latitude, longitude],
          address: req.query.address,
          forecast: forecastData,
        });
      });
    }
  );
});

//wire up /weather
//
//1. Require geocode/forecast into app.js
//2. Use the address to geocode
//3. Use the coordinates to get forecast
//4. Send back the real forecast and location

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  } //by using return we are stopping the execution there by avoiding sending two responses back which gives an error
  console.log(req.query.search); //contains query string information
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Aneesh Subudhi",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aneesh Subudhi",
    errorMessage: "Page not found",
  });
}); //here * character means match anything that has not been expressed so far(like weather,about,help have already been expressed)

app.listen(3000, () => {
  console.log("Server is up on port 3000");
}); //starts the server
//it always up and running in case user wants something

//app.com
//app.com/help
//app.com/about

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>"); //to send something back to the requester,html can also be sent,it detects the html inside
// }); //what the server should send in case the user gets,the second arg is a function whichdescribes what we wanna do if we visit the route given in first arg,req here is incoming request to the server,res is response

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Aneesh",
//     },
//     {
//       name: "Andrew",
//     },
//   ]); //JSON data could be sent
// }); //it dtects the object and stringifys it to json object string

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

//goal : setup two new routes
//
//1. setup an about route and render a page title
//2. setup a weather route and render a page title
//3. test the work by visiting both in the browser
//

//goal:update routes
//1.setup about route to render a title with HTML
//2. setup a weather route to send back JSON
//   -object with forecast and location strings
//3.test your work by visiting both in the browser

//to configure express to serve static assets,like html pages,js,css,images
//its better to write separate html page rather sending html in form of strings as done previously
//we will create another folder for those static assets(public folder)
//__dirname : contains path to the directory
//__filename : contains path to the file itself
//u can use path for path manipulation,like path.join
//after that configure the express to serve up the public dir up

//goal : create two more html files
//
//1.create a html page for about with "About" title
//2.create a html page for help with "Help" title
//3.Remove the old route handlers for both
//4.Visit both in the browser to test your work

/*IMPORTANT : - HOW ARE HBS FILES ABLE TO ACCESS CSS AND IMG FILES WITH THE SAME PATHS GIVEN IN DELETED HTML FILES,ANSWER : Our express.static() middleware will check the public folder to see if those files exists and serve them if they do.*/

//GOAL: create a template for help page
//
//1.setup a help template to render a help message to the screen
//2. setup the help route and render the template with an example message
//3.visit the route in the browser and see your help message print

//CUSTOMIZING VIEWS DIRECTORY
//if we change the views folder name from views to template we see an error occurs its because express looks for a folder 'views' in project directory.In order to tackle this we make variable storing the path to templates folder and then use app.set to det the settings of express("views") to the path stored in variable

//advanced templating
//even after making the partials,on saving partials,the server is not restarting (nodemon),the partial templates have to be loaded
//we can address this by : nodemon src/app.js -e js,hbs

//goal:create a partial for the footer
//
//1.setup the template for he footer partial "created by some name"
//2.render the partial at the bottom of all three pages
//3.test your work by visiting all three pages

//we will show a 404 page in case user enters url and dont know what to show

//when express gets a incoming request it looks for a match,its gonna a look through how have you setup,for eaxample /help,it will look for handler in publics folder and the handlers for /help

//goal:create and render a 404 page with handlebars
//
//1.setup the template to render the header and footer
//2. setup the template to render an error message in a paragraph
//3.render the template for both  404 routes
//  -Page not found
//  -Help article not found
//4. Test your work.Visit /what and /help/units

//query strings.....
//goal:update weather endpoint to accept address
//1. No address? Send back an error message
//2. Address? Send back the static JSON
//3. -Add address property onto JSON which returns the provided address
//4. Test /weather and /weather?address=philadelphia

//default parameters syntax
