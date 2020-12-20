import createDOMElement from './createDOMElement.js';
import createChart from './createChart.js';

export default class GraphComponent {
  constructor() {
    this.body = document.body;
  }

  initialize() {
    this.sectionGraph = createDOMElement('section', 'graph');

    this.canvas1 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas2 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas3 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas4 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas5 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);

    this.dailyCases = createDOMElement('div', 'chart daily-cases active', this.canvas1, this.sectionGraph);
    this.dailyDeaths = createDOMElement('div', 'chart daily-deaths', this.canvas2, this.sectionGraph);
    this.cumulativeCases = createDOMElement('div', 'chart cumulative-cases', this.canvas3, this.sectionGraph);
    this.CumulativeDeaths = createDOMElement('div', 'chart cumulative-deaths', this.canvas4, this.sectionGraph);
    this.logCases = createDOMElement('div', 'chart log-cases-chart', this.canvas5, this.sectionGraph);

    this.navigation = createDOMElement('div', 'graph-navigation', '', this.sectionGraph);

    this.body.prepend(this.sectionGraph);

    this.createNavigation();
    // this.showData([1, 3, 5, 2, 8, 10, 33, 21, 12, 4, 9, 13, 14, 11, 10, 8, 15]);
  }

  createNavigation() {
    const dailyCases = createDOMElement('div', 'nav-item daily-cases-nav active', 'Daily Cases');
    const dailyDeaths = createDOMElement('div', 'nav-item daily-deaths-nav', 'Daily Deaths');
    const dailyRecovered = createDOMElement('div', 'nav-item daily-recovered-nav', 'Daily Recovered');
    const CumulativeDeaths = createDOMElement('div', 'nav-item cumulative-deaths-nav', 'Cumulative Deaths');
    const logCases = createDOMElement('div', 'nav-item log-cases-nav', 'Log Cases');

    // const leftArrowImg = createDOMElement('img', 'arrow', '', '', ['src', '../src/assets/left-arrow.svg']);
    // const rightArrowImg = createDOMElement('img', 'arrow', '', '', ['src', '../src/assets/right-arrow.svg']);
    const leftArrow = createDOMElement('div', 'left-arrow', 'left');
    const rightArrow = createDOMElement('div', 'right-arrow', 'right');

    this.navigation.append(
      leftArrow,
      dailyCases,
      dailyDeaths,
      dailyRecovered,
      CumulativeDeaths,
      logCases,
      rightArrow
    );
  }

  showData(covidData) {
    this.covidData = covidData;

    const confirmed = covidData.map((element) => element.Confirmed);
    const deaths = covidData.map((element) => element.Deaths);
    const recovered = covidData.map((element) => element.Recovered);
    
    const yellow = 'rgb(255, 170, 0)';
    const black = 'rgb(34, 34, 34)';
    const green = 'rgb(28, 145, 17)';

    createChart(this.canvas1, confirmed, yellow);
    createChart(this.canvas2, deaths, black);
    createChart(this.canvas3, recovered, green);
    createChart(this.canvas4, confirmed, black);
    createChart(this.canvas5, confirmed, green);
  }
}
