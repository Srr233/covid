import Chart from 'chart.js';

export default function createChart(canvasNode, dataArray, dateArray, color) {
  // const confirmed = covidData.map((element) => element.Confirmed);
  return new Chart(canvasNode, {
    type: 'bar',

    data: {
      labels: dataArray,
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      //   'October', 'November', 'December'],
      datasets: [{
        label: '',
        barPercentage: 1,
        backgroundColor: color,
        data: dataArray
      }]
    },

    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 11,
            fontSize: 14,
            callback: function xTips(value, index) {
              const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              if (index < month.length) {
                return month[index];
              }
              return value;
              // // const newValue = value; // .split('/');
              // // const valueMonth = newValue; // .splice(0, 1).join('');
              // // const changedTicksName = month[valueMonth - 1];
              // const changedTicksName = month[tickCount];
              // tickCount += 1;
              // return changedTicksName;
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: function(tooltipItem, chart) {
            return dateArray[tooltipItem[0].index].split('T')[0];
          },
          label: function(tooltipItem) {
            return Number.parseFloat(tooltipItem.value) / 1000 + 'k';
          }
        },
        backgroundColor: '#343a40',
        titleFontColor: 'rgba(255, 255, 255)',
        displayColors: false,
        borderColor: color,
        borderWidth: 2
      }
    }
  });
}
