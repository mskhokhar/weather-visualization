var dateFormat = require("dateformat");
module.exports = (data) => {

    let forecastData = data.data;

    let weatherTiles = document.querySelector('.weather-tiles');

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
        // let low_temp_label = document.createElement('span')
        // // low_temp_label.innerHTML = 'Lowest Temp: ';
        // low_temp.appendChild(low_temp_label);
        let low_temp_value = document.createElement('span');
        low_temp_value.innerText = `${forecast.low_temp} C`
        low_temp.appendChild(low_temp_value);

        let max_temp = document.createElement('div');
        // let max_temp_label = document.createElement('label')
        // // max_temp_label.innerText = 'Maximum Temp: ';
        // max_temp.appendChild(max_temp_label);
        let max_temp_value = document.createElement('span');
        max_temp_value.innerText = `${forecast.max_temp} C`;
        max_temp.appendChild(max_temp_value);

        // let precipitation_prob = document.createElement('div');
        // // let precipitation_prob_label = document.createElement('label');
        // // // precipitation_prob_label.innerText = 'Precipitation probability: ';
        // // precipitation_prob.appendChild(precipitation_prob_label);
        // let precipitation_prob_value = document.createElement('span');
        // precipitation_prob_value.innerText = ` %`
        // precipitation_prob.appendChild(precipitation_prob_value)

        let precipitation = document.createElement('div');
        // let precipitation_label = document.createElement('label');
        // // precipitation_label.innerText = 'Precipitation: ';
        // precipitation.appendChild(precipitation_label);
        let precipitation_value = document.createElement('span');
        precipitation_value.innerText = `${forecast.pop}% / ${Math.round(forecast.precip * 10) / 10} mm`
        precipitation.appendChild(precipitation_value)

        let pressure = document.createElement('div');
        // let pressure_label = document.createElement('label');
        // // pressure_label.innerText = 'Pressure: ';
        // pressure.appendChild(pressure_label);
        let pressure_value = document.createElement('span');
        pressure_value.innerText = `${Math.round(forecast.pres)} hPa`
        pressure.appendChild(pressure_value)

        let visibility = document.createElement('div');
        // let visibility_label = document.createElement('label');
        // // visibility_label.innerText = 'Visibility: ';
        // visibility.appendChild(visibility_label);
        let visibility_value = document.createElement('span');
        visibility_value.innerText = `${forecast.vis} km`
        visibility.appendChild(visibility_value)


        tilesDiv.appendChild(icon);
        tilesDiv.appendChild(date);
        tilesDiv.appendChild(low_temp);
        tilesDiv.appendChild(max_temp);
        // tilesDiv.appendChild(precipitation_prob);
        tilesDiv.appendChild(precipitation);
        tilesDiv.appendChild(pressure);
        tilesDiv.appendChild(visibility);

        weatherTiles.appendChild(tilesDiv);
    }

}