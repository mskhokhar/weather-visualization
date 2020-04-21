# Whats the weather?


This project displays weather of any city selected of every 3hours for 5 days graphically and it's 5 days weather forecast.

![home](https://github.com/mskhokhar/weather-visualization/blob/master/assets/images/weather_readme.gif)


# MVP:

  * Enable user to select any city around the globe.
  
  * Create a meteogram i.e. represent variations of temperature, air pressure, wind-direction, wind-speed and weather condition of a selected city in a single graph for every 3 hours over the time period of 96 hours, strating from current time.
  
  * User can view weather forecast for  next 5 days for the selected city starting from the current day in form tiles.

# Technologies, Libraries, APIs:

  * Technologies :
    * JavaScript.
    * Vanilla DOM.
    * node
  
  * Libraries :
    * Highcharts.
    
  * API:
    * OpenWeatherMap.
    * WeatherBit.
    
# Code snippet:

  * Dynamically create weather tiles using VanillaDOM:

```javascript
var dateFormat = require("dateformat");
module.exports = (data) => {

    let forecastData = data.data;

    let weatherTiles = document.querySelector('.weather-tiles');
    while (weatherTiles.hasChildNodes()) {
        weatherTiles.removeChild(weatherTiles.firstChild);
    }
    let labelContainer = document.createElement('div');
    labelContainer.classList.add('forecast-labels-container')
    let labels = ['', 'Date', 'Min. Temp', 'Max. Temp', 'Precipitation', 'Pressure','Visibility' ]
    labels.forEach(label => {
        let labelDiv = document.createElement('div');
        labelDiv.classList.add('forecast-label');
        labelDiv.innerHTML = label;
        labelContainer.appendChild(labelDiv);
    });

    weatherTiles.appendChild(labelContainer);

    for (let i = 0; i < 5; i++) {
        let tilesDiv = document.createElement('div');

        forecast = forecastData[i];

        let icon = document.createElement('img');
        icon.src = `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`;

        let date = document.createElement('div');
        let formattedDate = dateFormat(forecast.valid_date,"dddd, mmm d, yyyy")
        date.innerText = formattedDate;

        let low_temp = document.createElement('div');
        let low_temp_value = document.createElement('span');
        low_temp_value.innerText = `${forecast.low_temp} C`
        low_temp.appendChild(low_temp_value);

        let max_temp = document.createElement('div');
        let max_temp_value = document.createElement('span');
        max_temp_value.innerText = `${forecast.max_temp} C`;
        max_temp.appendChild(max_temp_value);


        let precipitation = document.createElement('div');
        let precipitation_value = document.createElement('span');
        precipitation_value.innerText = `${forecast.pop}% / ${Math.round(forecast.precip * 10) / 10} mm`
        precipitation.appendChild(precipitation_value)

        let pressure = document.createElement('div');
        let pressure_value = document.createElement('span');
        pressure_value.innerText = `${Math.round(forecast.pres)} hPa`
        pressure.appendChild(pressure_value)

        let visibility = document.createElement('div');
        let visibility_value = document.createElement('span');
        visibility_value.innerText = `${forecast.vis} km`
        visibility.appendChild(visibility_value)


        tilesDiv.appendChild(icon);
        tilesDiv.appendChild(date);
        tilesDiv.appendChild(low_temp);
        tilesDiv.appendChild(max_temp);
        tilesDiv.appendChild(precipitation);
        tilesDiv.appendChild(pressure);
        tilesDiv.appendChild(visibility);

        weatherTiles.appendChild(tilesDiv);
    }

}
```
  * Apply Dark theme to graph
```javascript
Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};

window.Highcharts.setOptions(Highcharts.theme);
```

# To Contribute:

To fix a bug or enhance an existing module, follow these steps:

Fork the repo

* Create a new branch (git checkout -b improve-feature)

* Make the appropriate changes in the files

* Add changes to reflect the changes made

* Commit your changes (git commit -am 'Improve feature')

* Push to the branch (git push origin improve-feature)

* Create a Pull Request

# Local install instructions:

* Open new terminal in the project directory and run the following in sequence:
  * npm install
* Run npm start and keep this terminal open (in the project directory)
