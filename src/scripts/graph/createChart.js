import Chart from 'chart.js';

export default function createChart(canvasNode, dataArray, dateArray, color) {
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
              // const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
              //   'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              // if (index < month.length) {
              //   return month[index];
              // }
              // return value;
              return null;
            }
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 11,
            fontSize: 14,
            callback: function xTips(value, index) {
              // const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
              //   'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              // if (index < month.length) {
              //   return month[index];
              // }
              // return value;
              return null;
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem) {
            return dateArray[tooltipItem[0].index].split('T')[0];
          },
          label: function label(tooltipItem) {
            const labelData = Math.fround(Number.parseFloat(tooltipItem.value)) / 1000 + 'k';
            
            // return labelData.toPrecision(2);
            return labelData;
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
