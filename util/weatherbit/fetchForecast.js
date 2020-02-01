
const createWeatherTiles = require('../../components/tiles/weatherTiles');

module.exports = (coord) => {
    let request = new XMLHttpRequest();

    request.open('GET', ` http://api.weatherbit.io/v2.0/forecast/daily?key=0e739b00f5aa4e30a4e3e0c601e1b133&${coord}`, true);
    console.log('hitting 2');

    request.onload = function () {
        let data = JSON.parse(this.response);

        createWeatherTiles(data);
        // createDetailedGraph(data.data);
    }
    request.send();

}