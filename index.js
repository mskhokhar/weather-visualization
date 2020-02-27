const cities = require('./city.list.json')


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
    let coord = document.querySelector(`.city-${cityName}`).dataset["dataCoord"];
    let cityId = document.querySelector(`.city-${cityName}`).dataset["cityId"];
    fetchWeather(cityId);
    fetchForecast(coord);
    
  });

})


const populateCities = () => {
    let select = document.getElementById("city");

    cities.forEach(city => {
      let opt = document.createElement("option");
      let cityName = city.name.split(' ').join('');
      opt.classList.add(`city-${cityName}`);
      opt.dataset.dataCoord = `lat=${city.coord.lat}&lon=${city.coord.lon}`;
      opt.dataset.cityId = city.id;
      opt.value = city.name;
      opt.innerHTML = city.name;
      select.appendChild(opt);
    
    });
}





