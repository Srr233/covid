import Chart from 'chart.js';

export default function createChart(canvas, data, color) {
  // const confirmed = covidData.map((element) => element.Confirmed);
  return new Chart(canvas, {
    type: 'bar',

    data: {
      labels: data,
      // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      //  'October', 'November', 'December'],
      datasets: [{
        label: '',
        backgroundColor: color,
        data: data
      }]
    },

    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              // sampleSize: 110,
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
          }
        ]
      },
      tooltips: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        titleFontColor: 'rgba(0, 0, 0)',
        displayColors: false,
        borderColor: 'rgb(255, 170, 0)',
        borderWidth: 2
      }
    }
  });
}
