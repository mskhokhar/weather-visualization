
const createWeatherTiles = require('../../components/tiles/weatherTiles');

module.exports = (coord) => {
    let request = new XMLHttpRequest();

    request.open('GET', ` https://api.weatherbit.io/v2.0/forecast/daily?key=0e739b00f5aa4e30a4e3e0c601e1b133&${coord}`, true);

    request.onload = function () {
        let data = JSON.parse(this.response);

        createWeatherTiles(data);
        // createDetailedGraph(data.data);
    }
    request.send();

}