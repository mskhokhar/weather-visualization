// window.usCities = require('./city.list.json');
// const cities = require('cities.json');
// const cities = require("all-the-cities");
const cities = require('./cities.json');

const fetchForecast = require('./util/weatherbit/fetchForecast');
const fetchWeather = require('./util/openWeather/fetchWeather');

require('./components/graphs/theme');
require('./components/graphs/meteogram');


document.addEventListener('DOMContentLoaded', () => {
  populateCities();
  document.querySelector("#submit-city").addEventListener("click", () => { 
         
    let cityName = document
      .querySelector("#city-input")
      .value
      .split(" ")
      .join('')
    let lat = document.querySelector(`.city-${cityName}`).dataset["lat"];
    let lon = document.querySelector(`.city-${cityName}`).dataset["lon"];
    fetchWeather(lat,lon);
    fetchForecast(lat,lon);
    
    
  });

})


const populateCities = () => {
    let select = document.getElementById("city");
    cities.forEach(city => {
      let opt = document.createElement("option");
      let cityName = city.name.split(' ').join('');
      opt.classList.add(`city-${cityName}`);
      opt.dataset.lat = city.coord.lat;
      opt.dataset.lon = city.coord.lon;
      opt.value = city.name.concat(', ', city.country);
      opt.innerHTML = city.name.concat(', ',city.country);
      select.appendChild(opt);
    
    });
}





