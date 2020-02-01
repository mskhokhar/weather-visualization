const Continents = require('./continets.json');
const cities = require('./city.list.json')
const cc_map = require('./contries-continents.json');

const fetchForecast = require('./util/weatherbit/fetchForecast');
const fetchWeather = require('./util/openWeather/fetchWeather');

require('./components/graphs/theme');
require('./components/graphs/meteogram');

// import {detailGraph} from './detailGraph';

document.addEventListener('DOMContentLoaded', () => {
  populateCities();
  document.querySelector("#submit-city").addEventListener("click", () => {      
    let cityId = document.getElementById("city-input").value;
    let coord = document.getElementsByClassName(`city-${cityId}`)[0].dataset['dataCoord'];
    fetchWeather(cityId);
    fetchForecast(coord);
    
  });

})


const populateCities = () => {
    let select = document.getElementById("city");
    var length = select.options.length;
    for (i = 0; i < length; i++) {
      select.options[i] = null;
    }

    cities.forEach(city => {
      let opt = document.createElement("option");
      opt.classList.add(`city-${city.id}`);
      opt.dataset.dataCoord = `lat=${city.coord.lat}&lon=${city.coord.lon}`;
      opt.value = city.id;
      opt.innerHTML = city.name;
      select.appendChild(opt);
    
    });
}




// const createDetailedGraph = (data) => {
//   let graphInput = {};
//   let inputArray=[];
//   data.forEach(forecast => {
//     let forecastData = {};
//   });
// }



