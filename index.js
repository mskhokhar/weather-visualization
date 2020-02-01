const Continents = require('./continets.json');
const cities = require('./city.list.json')
const cc_map = require('./contries-continents.json');

const fetchForecast = require('./util/weatherbit/fetchForecast');
const fetchWeather = require('./util/openWeather/fetchWeather');

require('./components/graphs/theme');
require('./components/graphs/meteogram');

// import {detailGraph} from './detailGraph';

document.addEventListener('DOMContentLoaded', () => {
    populateContinents();
    document.querySelector("#continents").addEventListener("change", () => {
      populateCountries();
    });
    document.querySelector("#countries").addEventListener("change", () => {
      populateCities();
    });

    document.querySelector("#submit-city").addEventListener("click", () => {      
      let cityId = document.getElementById("city-input").value;
      let coord = document.getElementsByClassName(`city-${cityId}`)[0].dataset['dataCoord'];
      fetchWeather(cityId);
      fetchForecast(coord);
      
    });

})

const populateContinents = () => {
  let select = document.getElementById("continents");
    
  Continents.forEach(continent => {
    let opt = document.createElement("option");
    opt.value = continent.code;
    opt.innerHTML = continent.name;
    select.appendChild(opt);
  });
};
const populateCountries = () => {
    let select = document.getElementById("countries");
    var length = select.options.length;
    for (i = 0; i < length; i++) {
      select.options[i] = null;
    }

    let selected_continent = document.getElementById('continents').value;
    if (selected_continent) {
        
        cc_map.forEach(country => {
          if (selected_continent === country.Continent_Code) {
            let opt = document.createElement("option");
            opt.value = country.Two_Letter_Country_Code;
            opt.innerHTML = country.Country_Name.split(',')[0];
            select.appendChild(opt);
          }
        });
    }
}

const populateCities = () => {
    let select = document.getElementById("city");
    var length = select.options.length;
    for (i = 0; i < length; i++) {
      select.options[i] = null;
    }

    let selected_country = document.getElementById("countries").value;
    if (selected_country) {
      console.log('country',selected_country);
      console.log('lat',cities[0].coord.lat);
        
      cities.forEach(city => {
        if (selected_country === city.country) {
          let opt = document.createElement("option");
          opt.classList.add(`city-${city.id}`);
          opt.dataset.dataCoord = `lat=${city.coord.lat}&lon=${city.coord.lon}`;
          opt.value = city.id;
          opt.innerHTML = city.name;
          select.appendChild(opt);
        }
      });
    }
}




// const createDetailedGraph = (data) => {
//   let graphInput = {};
//   let inputArray=[];
//   data.forEach(forecast => {
//     let forecastData = {};
//   });
// }



