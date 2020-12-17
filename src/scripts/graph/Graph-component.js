import createDOMElement from './createDOMElement.js';
import createChart from './createChart.js';

export default class GraphComponent {
  constructor() {
    this.body = document.body;
  }

  initialize() {
    this.sectionGraph = createDOMElement('section', 'graph');
    this.canvas1 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart']);
    this.canvas2 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart']);
    this.canvas3 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart']);
    this.canvas4 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart']);
    this.canvas5 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart']);
    this.dailyCases = createDOMElement('div', 'daily-cases-chart', this.canvas1, this.sectionGraph);
    this.dailyDeaths = createDOMElement('div', 'daily-deaths-chart', this.canvas2, this.sectionGraph);
    this.cumulativeCases = createDOMElement('div', 'cumulative-cases-chart', this.canvas3, this.sectionGraph);
    this.CumulativeDeaths = createDOMElement('div', 'cumulative-deaths-chart', this.canvas4, this.sectionGraph);
    this.logCases = createDOMElement('div', 'log-cases-chart', this.canvas5, this.sectionGraph);
    this.navigation = createDOMElement('div', 'graph-navigation', '', this.sectionGraph);
    this.body.prepend(this.sectionGraph);
    this.createNavigation();
  }

  createNavigation() {
    const dailyCases = createDOMElement('div', 'daily-cases-nav', 'Daily Cases');
    const dailyDeaths = createDOMElement('div', 'daily-deaths--nav', 'Daily Deaths');
    const cumulativeCases = createDOMElement('div', 'cumulative-cases-nav', 'Cumulative Cases');
    const CumulativeDeaths = createDOMElement('div', 'cumulative-deaths-nav', 'Cumulative Deaths');
    const logCases = createDOMElement('div', 'log-cases-nav', 'Log Cases');
    this.navigation.append(dailyCases, dailyDeaths, cumulativeCases, CumulativeDeaths, logCases);
  }

  showData(covidData) {
    this.covidData = covidData;
    createChart(this.canvas1, covidData);
    createChart(this.canvas2, covidData);
    createChart(this.canvas3, covidData);
    createChart(this.canvas4, covidData);
    createChart(this.canvas5, covidData);
  }
}
