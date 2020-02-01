const Highcharts = require('highcharts');

const detailGraph = (input) => {
    let inputArray = [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }];
    input.data.forEach(element => {
        let inputObject = {};
        inputObject.name = element.dataType;
        inputObject.data = element.values;
        inputArray.push(inputObject);
    });
    Highcharts.chart('container-2', {
        
        title: {
            text: input.title
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: input.y_title
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: input.pointStart
            }
        },
        series: inputArray,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}