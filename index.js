const Continents = require('./continets.json');
// const Highcharts = require('highcharts');
// require("highcharts/modules/exporting")(Highcharts);
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
      let coord = document.getElementsByClassName(`city-${cityId}`)[0].dataset['dataCoord'];
      console.log('element', document.getElementsByClassName(`city-${cityId}`));
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

const fetchWeather = (cityId) => {
  let request = new XMLHttpRequest();
  
  request.open('GET', `http://api.openweathermap.org/data/2.5/forecast?appid=32414ff520ac014d5e93f3e467a66f39&id=${cityId}&mode=xml&units=metric`, true);
  console.log('hitting');
  
  request.onload = function () {
  // let data = JSON.parse(this.response);
  // console.log('weather data', this.responseXML)
    window.meteogram = new Meteogram(this.responseXML, 'container');
  }
  request.send();

}
const fetchForecast = (coord) => {
  let request = new XMLHttpRequest();
  console.log('coord', coord);
  
  request.open('GET', ` http://api.weatherbit.io/v2.0/forecast/daily?key=0e739b00f5aa4e30a4e3e0c601e1b133&${coord}`, true);
  console.log('hitting 2');
  
  request.onload = function () {
  let data = JSON.parse(this.response);
  console.log('weather data', data)
  }
  request.send();

}

//-----------------------------------------------------------------------------------------





function Meteogram(xml, container) {
  // Parallel arrays for the chart data, these are populated as the XML/JSON file
  // is loaded
  this.symbols = [];
  this.precipitations = [];
  this.precipitationsError = []; // Only for some data sets
  this.winds = [];
  this.temperatures = [];
  this.pressures = [];

  // Initialize
  this.xml = xml;
  this.container = container;

  // Run
  this.parseYrData();
}

//smoothening of temperature line
Meteogram.prototype.smoothLine = function (data) {
  var i = data.length,
    sum,
    value;
  
  while (i--) {
    data[i].value = value = data[i].y; // preserve value for tooltip

    // Set the smoothed value to the average of the closest points, but don't allow
    // it to differ more than 0.5 degrees from the given value
    sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
    data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
  }
};

Meteogram.prototype.drawWeatherSymbols = function (chart) {
  var meteogram = this;
  
  $.each(chart.series[0].data, function (i, point) {
    if (meteogram.resolution > 36e5 || i % 2 === 0) {

      chart.renderer
        .image(
          'http://openweathermap.org/img/wn/' +
          meteogram.symbols[i] + '@2x.png',
          point.plotX + chart.plotLeft - 8,
          point.plotY + chart.plotTop - 30,
          30,
          30
        )
        .attr({
          zIndex: 5
        })
        .add();
    }
  });
};


/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
  
  var xAxis = chart.xAxis[0],
    x,
    pos,
    max,
    isLong,
    isLast,
    i;

  for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

    // Get the X position
    isLast = pos === max + 36e5;
    x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

    // Draw the vertical dividers and ticks
    if (this.resolution > 36e5) {
      isLong = pos % this.resolution === 0;
    } else {
      isLong = i % 2 === 0;
    }
    chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
      'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
      .attr({
        stroke: chart.options.chart.plotBorderColor,
        'stroke-width': 1
      })
      .add();
  }

  // Center items in block
  chart.get('windbarbs').markerGroup.attr({
    translateX: chart.get('windbarbs').markerGroup.translateX + 8
  });

};

/**
 * Get the title based on the XML data
 */
Meteogram.prototype.getTitle = function () {
  
  return 'Meteogram for ' + this.xml.querySelector('location name').textContent +
    ', ' + this.xml.querySelector('location country').textContent;
};

/**
 * Build and return the Highcharts options structure
 */
Meteogram.prototype.getChartOptions = function () {
  var meteogram = this;
  
  return {
    chart: {
      renderTo: this.container,
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 310,
      alignTicks: false,
      scrollablePlotArea: {
        minWidth: 720
      }
    },

    defs: {
      patterns: [{
        id: 'precipitation-error',
        path: {
          d: [
            'M', 3.3, 0, 'L', -6.7, 10,
            'M', 6.7, 0, 'L', -3.3, 10,
            'M', 10, 0, 'L', 0, 10,
            'M', 13.3, 0, 'L', 3.3, 10,
            'M', 16.7, 0, 'L', 6.7, 10
          ].join(' '),
          stroke: '#68CFE8',
          strokeWidth: 1
        }
      }]
    },

    title: {
      text: this.getTitle(),
      align: 'left',
      style: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    },

    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat:
        '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
        '<b>{point.point.symbolName}</b><br>'

    },

    xAxis: [{ // Bottom X axis
      type: 'datetime',
      tickInterval: 2 * 36e5, // two hours
      minorTickInterval: 36e5, // one hour
      tickLength: 0,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      offset: 30,
      showLastLabel: true,
      labels: {
        format: '{value:%H}'
      },
      crosshair: true
    }, { // Top X axis
      linkedTo: 0,
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
      labels: {
        format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
        align: 'left',
        x: 3,
        y: -5
      },
      opposite: true,
      tickLength: 20,
      gridLineWidth: 1
    }],

    yAxis: [{ // temperature axis
      title: {
        text: null
      },
      labels: {
        format: '{value}°',
        style: {
          fontSize: '10px'
        },
        x: -3
      },
      plotLines: [{ // zero plane
        value: 0,
        color: '#BBBBBB',
        width: 1,
        zIndex: 2
      }],
      maxPadding: 0.3,
      minRange: 8,
      tickInterval: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)'

    }, { // precipitation axis
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      tickLength: 0,
      minRange: 10,
      min: 0

    }, { // Air pressure
      allowDecimals: false,
      title: { // Title on top of axis
        text: 'hPa',
        offset: 0,
        align: 'high',
        rotation: 0,
        style: {
          fontSize: '10px',
          color: Highcharts.getOptions().colors[2]
        },
        textAlign: 'left',
        x: 3
      },
      labels: {
        style: {
          fontSize: '8px',
          color: Highcharts.getOptions().colors[2]
        },
        y: 2,
        x: 3
      },
      gridLineWidth: 0,
      opposite: true,
      showLastLabel: false
    }],

    legend: {
      enabled: false
    },

    plotOptions: {
      series: {
        pointPlacement: 'between'
      }
    },


    series: [{
      name: 'Temperature',
      data: this.temperatures,
      type: 'spline',
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true
          }
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          '{series.name}: <b>{point.value}°C</b><br/>'
      },
      zIndex: 1,
      color: '#FF3333',
      negativeColor: '#48AFE8'
    }, {
      name: 'Precipitation',
      data: this.precipitationsError,
      type: 'column',
      color: 'url(#precipitation-error)',
      yAxis: 1,
      groupPadding: 0,
      pointPadding: 0,
      tooltip: {
        valueSuffix: ' mm',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          '{series.name}: <b>{point.minvalue} mm - {point.maxvalue} mm</b><br/>'
      },
      grouping: false,
      dataLabels: {
        enabled: meteogram.hasPrecipitationError,
        formatter: function () {
          if (this.point.maxvalue > 0) {
            return this.point.maxvalue;
          }
        },
        style: {
          fontSize: '8px',
          color: 'gray'
        }
      }
    }, {
      name: 'Precipitation',
      data: this.precipitations,
      type: 'column',
      color: '#68CFE8',
      yAxis: 1,
      groupPadding: 0,
      pointPadding: 0,
      grouping: false,
      dataLabels: {
        enabled: !meteogram.hasPrecipitationError,
        formatter: function () {
          if (this.y > 0) {
            return this.y;
          }
        },
        style: {
          fontSize: '8px',
          color: 'gray'
        }
      },
      tooltip: {
        valueSuffix: ' mm'
      }
    }, {
      name: 'Air pressure',
      color: Highcharts.getOptions().colors[2],
      data: this.pressures,
      marker: {
        enabled: false
      },
      shadow: false,
      tooltip: {
        valueSuffix: ' hPa'
      },
      dashStyle: 'shortdot',
      yAxis: 2
    }, {
      name: 'Wind',
      type: 'windbarb',
      id: 'windbarbs',
      color: Highcharts.getOptions().colors[1],
      lineWidth: 1.5,
      data: this.winds,
      vectorLength: 18,
      yOffset: -15,
      tooltip: {
        valueSuffix: ' m/s'
      }
    }]
  };
};

/**
 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {
  
  this.drawWeatherSymbols(chart);
  this.drawBlocksForWindArrows(chart);

};

/**
 * Create the chart. This function is called async when the data file is loaded and parsed.
 */
Meteogram.prototype.createChart = function () {
  
  var meteogram = this;
  // Highcharts.setOptions(Highcharts.theme);

  this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
    meteogram.onChartLoad(chart);
  });
};

Meteogram.prototype.error = function () {
  $('#loading').html('<i class="fa fa-frown-o"></i> Failed loading data, please try again later');
};

/**
 * Handle the data. This part of the code is not Highcharts specific, but deals with yr.no's
 * specific data format
 */
Meteogram.prototype.parseYrData = function () {
  
  var meteogram = this,
    xml = this.xml,
    pointStart,
    forecast = xml && xml.querySelector('forecast');

  if (!forecast) {
    return this.error();
  }

  // The returned xml variable is a JavaScript representation of the provided
  // XML, generated on the server by running PHP simple_load_xml and
  // converting it to JavaScript by json_encode.
  Highcharts.each(
    forecast.querySelectorAll('time'),
    function (time, i) {
      // Get the times - only Safari can't parse ISO8601 so we need to do
      // some replacements
      var from = time.getAttribute('from') + ' UTC',
        to = time.getAttribute('to') + ' UTC';

      from = from.replace(/-/g, '/').replace('T', ' ');
      from = Date.parse(from);
      to = to.replace(/-/g, '/').replace('T', ' ');
      to = Date.parse(to);

      if (to > pointStart + 4 * 24 * 36e5) {
        return;
      }

      // If it is more than an hour between points, show all symbols
      if (i === 0) {
        meteogram.resolution = to - from;
      }

      // Populate the parallel arrays
      meteogram.symbols.push(
        time.querySelector('symbol').getAttribute('var')
          .match(/[0-9]{2}[dnm]?/)[0]
      );

      meteogram.temperatures.push({
        x: from,
        y: parseInt(
          time.querySelector('temperature').getAttribute('value'),
          10
        ),
        // custom options used in the tooltip formatter
        to: to,
        symbolName: time.querySelector('symbol').getAttribute('name')
      });

      var precipitation = time.querySelector('precipitation');
      meteogram.precipitations.push({
        x: from,
        y: parseFloat(
          Highcharts.pick(
            precipitation.getAttribute('minvalue'),
            precipitation.getAttribute('value')
          )
        )
      });

      if (precipitation.getAttribute('maxvalue')) {
        meteogram.hasPrecipitationError = true;
        meteogram.precipitationsError.push({
          x: from,
          y: parseFloat(precipitation.getAttribute('maxvalue')),
          minvalue: parseFloat(precipitation.getAttribute('minvalue')),
          maxvalue: parseFloat(precipitation.getAttribute('maxvalue')),
          value: parseFloat(precipitation.getAttribute('value'))
        });
      }

      if (i % 2 === 0) {
        meteogram.winds.push({
          x: from,
          value: parseFloat(time.querySelector('windSpeed')
            .getAttribute('mps')),
          direction: parseFloat(time.querySelector('windDirection')
            .getAttribute('deg'))
        });
      }

      meteogram.pressures.push({
        x: from,
        y: parseFloat(time.querySelector('pressure').getAttribute('value'))
      });

      if (i === 0) {
        pointStart = (from + to) / 2;
      }
    }
  );

  // Smooth the line
  this.smoothLine(this.temperatures);

  // Create the chart when the data is loaded
  this.createChart();
};

// --------------------------------------------------------------------------------------


// Apply the theme
// Highcharts.createElement('link', {
//   href: 'https://fonts.googleapis.com/css?family=Unica+One',
//   rel: 'stylesheet',
//   type: 'text/css'
// }, null, document.getElementsByTagName('head')[0]);
// Highcharts.theme = {
//   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
//     '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//   chart: {
//     backgroundColor: {
//       linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//       stops: [
//         [0, '#2a2a2b'],
//         [1, '#3e3e40']
//       ]
//     },
//     style: {
//       fontFamily: '\'Unica One\', sans-serif'
//     },
//     plotBorderColor: '#606063'
//   },
//   title: {
//     style: {
//       color: '#E0E0E3',
//       textTransform: 'uppercase',
//       fontSize: '20px'
//     }
//   },
//   subtitle: {
//     style: {
//       color: '#E0E0E3',
//       textTransform: 'uppercase'
//     }
//   },
//   xAxis: {
//     gridLineColor: '#707073',
//     labels: {
//       style: {
//         color: '#E0E0E3'
//       }
//     },
//     lineColor: '#707073',
//     minorGridLineColor: '#505053',
//     tickColor: '#707073',
//     title: {
//       style: {
//         color: '#A0A0A3'
//       }
//     }
//   },
//   yAxis: {
//     gridLineColor: '#707073',
//     labels: {
//       style: {
//         color: '#E0E0E3'
//       }
//     },
//     lineColor: '#707073',
//     minorGridLineColor: '#505053',
//     tickColor: '#707073',
//     tickWidth: 1,
//     title: {
//       style: {
//         color: '#A0A0A3'
//       }
//     }
//   },
//   tooltip: {
//     backgroundColor: 'rgba(0, 0, 0, 0.85)',
//     style: {
//       color: '#F0F0F0'
//     }
//   },
//   plotOptions: {
//     series: {
//       dataLabels: {
//         color: '#F0F0F3',
//         style: {
//           fontSize: '13px'
//         }
//       },
//       marker: {
//         lineColor: '#333'
//       }
//     },
//     boxplot: {
//       fillColor: '#505053'
//     },
//     candlestick: {
//       lineColor: 'white'
//     },
//     errorbar: {
//       color: 'white'
//     }
//   },
//   legend: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     itemStyle: {
//       color: '#E0E0E3'
//     },
//     itemHoverStyle: {
//       color: '#FFF'
//     },
//     itemHiddenStyle: {
//       color: '#606063'
//     },
//     title: {
//       style: {
//         color: '#C0C0C0'
//       }
//     }
//   },
//   credits: {
//     style: {
//       color: '#666'
//     }
//   },
//   labels: {
//     style: {
//       color: '#707073'
//     }
//   },
//   drilldown: {
//     activeAxisLabelStyle: {
//       color: '#F0F0F3'
//     },
//     activeDataLabelStyle: {
//       color: '#F0F0F3'
//     }
//   },
//   navigation: {
//     buttonOptions: {
//       symbolStroke: '#DDDDDD',
//       theme: {
//         fill: '#505053'
//       }
//     }
//   },
//   // scroll charts
//   rangeSelector: {
//     buttonTheme: {
//       fill: '#505053',
//       stroke: '#000000',
//       style: {
//         color: '#CCC'
//       },
//       states: {
//         hover: {
//           fill: '#707073',
//           stroke: '#000000',
//           style: {
//             color: 'white'
//           }
//         },
//         select: {
//           fill: '#000003',
//           stroke: '#000000',
//           style: {
//             color: 'white'
//           }
//         }
//       }
//     },
//     inputBoxBorderColor: '#505053',
//     inputStyle: {
//       backgroundColor: '#333',
//       color: 'silver'
//     },
//     labelStyle: {
//       color: 'silver'
//     }
//   },
//   navigator: {
//     handles: {
//       backgroundColor: '#666',
//       borderColor: '#AAA'
//     },
//     outlineColor: '#CCC',
//     maskFill: 'rgba(255,255,255,0.1)',
//     series: {
//       color: '#7798BF',
//       lineColor: '#A6C7ED'
//     },
//     xAxis: {
//       gridLineColor: '#505053'
//     }
//   },
//   scrollbar: {
//     barBackgroundColor: '#808083',
//     barBorderColor: '#808083',
//     buttonArrowColor: '#CCC',
//     buttonBackgroundColor: '#606063',
//     buttonBorderColor: '#606063',
//     rifleColor: '#FFF',
//     trackBackgroundColor: '#404043',
//     trackBorderColor: '#404043'
//   }
// };
// Apply the theme
