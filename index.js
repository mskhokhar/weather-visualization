const Continents = require('./continets.json');
const cities = require('./city.list.json')
const cc_map = require('./contries-continents.json');

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
      fetchWeather(cityId);
    });

  var myChart = Highcharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [{
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }]
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
        
      cities.forEach(city => {
        if (selected_country === city.country) {
          let opt = document.createElement("option");
          opt.value = city.id;
          opt.innerHTML = city.name;
          select.appendChild(opt);
        }
      });
    }
}

const fetchWeather = (cityId) => {
  let request = new XMLHttpRequest();
  
  request.open('GET', `http://api.openweathermap.org/data/2.5/forecast?appid=32414ff520ac014d5e93f3e467a66f39&id=${cityId}`, true)
  console.log('hitting');
  request.onload = function () {
  let data = JSON.parse(this.response);
  console.log('weather data', data)
}
request.send();
}

