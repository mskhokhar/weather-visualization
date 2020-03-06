const Meteogram = require('../../components/graphs/meteogram');
module.exports = (cityId) => {
    let request = new XMLHttpRequest();

    request.open('GET', `https://api.openweathermap.org/data/2.5/forecast?appid=32414ff520ac014d5e93f3e467a66f39&id=${cityId}&mode=xml&units=metric`, true);

    request.onload = function () {
        // let data = JSON.parse(this.response);
        // console.log('weather data', this.responseXML)
        window.meteogram = new Meteogram(this.responseXML, 'container');
    }
    request.send();

}