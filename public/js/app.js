"use-strict";
//we will use fetch api which is a browser based api not used in nodejs can be used in client side JS
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   //kicks off async I/O operation
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

//GOAL:fetch weather!
//
//1. Setup a call to fetch weather for Boston
//2. Get the parse JSON response
//  -  If error property,print error
//  -  IF no error property, print location and forecast
//3. Refresh the browser and test your work

// fetch("http://localhost:3000/weather?address=philadelphia").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       return console.log(data.error);
//     }
//     console.log(data.location + "\n" + data.forecast);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //we see before that on clicking search button browser shows console output and then refreshes,this function prevents that from happening
  const location = search.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});

//goal:render content to paragraph
//1.select the second message p form js
//2.just before fetch,render loading message and empty p
//3.if error,render error
//4.if no error, render location and forecast
//5.test your work!Search for errors and for valid locations
