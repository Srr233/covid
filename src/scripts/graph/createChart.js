import Chart from 'chart.js';

export default function createChart(canvas, covidData) {
  const confirmed = covidData.map((element) => element.Confirmed);
  return new Chart(canvas, {
    type: 'bar',

    data: {
      labels: confirmed,//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      //  'October', 'November', 'December'],
      datasets: [{
        label: '',
        backgroundColor: 'rgb(255, 170, 0)',
        data: confirmed
      }]
    },

    options: {
      tooltips: {
        custom: function () {
          let tooltipEl = document.getElementById('chartjs-tooltip');
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = 'www';
            canvas.appendChild(tooltipEl);
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        titleFontColor: 'rgba(0, 0, 0)',
        displayColors: false,
        borderColor: 'rgb(255, 170, 0)',
        borderWidth: 2
      }
    }
  });
}
