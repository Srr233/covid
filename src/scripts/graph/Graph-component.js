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
    this.canvas6 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);

    this.Cases = createDOMElement('div', 'chart cases active', this.canvas1, this.sectionGraph);
    this.Deaths = createDOMElement('div', 'chart deaths', this.canvas2, this.sectionGraph);
    this.Recovered = createDOMElement('div', 'chart recovered', this.canvas3, this.sectionGraph);
    this.CasesPer100K = createDOMElement('div', 'chart cases-per100K', this.canvas4, this.sectionGraph);
    this.DeathsPer100K = createDOMElement('div', 'chart deaths-per100K', this.canvas5, this.sectionGraph);
    this.RecoveredPer100K = createDOMElement('div', 'chart recovered-per100K', this.canvas6, this.sectionGraph);

    this.navigation = createDOMElement('div', 'graph-navigation', '', this.sectionGraph);

    this.body.prepend(this.sectionGraph);

    this.createNavigation();
    // this.showData([1, 3, 5, 2, 8, 10, 33, 21, 12, 4, 9, 13, 14, 11, 10, 8, 15]);
  }

  createNavigation() {
    const Cases = createDOMElement('div', 'nav-item cases-nav active', 'Daily Cases');
    const Deaths = createDOMElement('div', 'nav-item deaths-nav', 'Daily Deaths');
    const Recovered = createDOMElement('div', 'nav-item recovered-nav', 'Daily Recovered');
    const CasesPer100K = createDOMElement('div', 'nav-item cases-per100K-nav', 'Daily Cases per 100k');
    const DeathsPer100K = createDOMElement('div', 'nav-item deaths-per100K-nav', 'Daily Deaths per 100k');
    const RecoveredPer100K = createDOMElement('div', 'nav-item recovered-per100K-nav', 'Daily Recovered per 100k');

    // const leftArrowImg = createDOMElement('img', 'arrow', '', '', ['src', '../src/assets/left-arrow.svg']);
    // const rightArrowImg = createDOMElement('img', 'arrow', '', '', ['src', '../src/assets/right-arrow.svg']);
    const leftArrow = createDOMElement('div', 'left-arrow', 'left');
    const rightArrow = createDOMElement('div', 'right-arrow', 'right');

    this.navigation.append(
      leftArrow,
      Cases,
      Deaths,
      Recovered,
      CasesPer100K,
      DeathsPer100K,
      RecoveredPer100K,
      rightArrow
    );
  }

  showData(covidData) {
    this.covidData = covidData;

    const confirmedArray = covidData.map((element) => element.Confirmed);
    const deathsArray = covidData.map((element) => element.Deaths);
    const recoveredArray = covidData.map((element) => element.Recovered);
    const dateArray = covidData.map((element) => element.Date);

    const yellow = 'rgb(255, 170, 0)';
    const black = 'rgb(34, 34, 34)';
    const green = 'rgb(28, 145, 17)';

    createChart(this.canvas1, confirmedArray, dateArray, yellow);
    createChart(this.canvas2, deathsArray, dateArray, black);
    createChart(this.canvas3, recoveredArray, dateArray, green);
  }

  showDataPer100K(covidData, population) {
    const confirmedArray = covidData.map((element) => element.Confirmed);
    const deathsArray = covidData.map((element) => element.Deaths);
    const recoveredArray = covidData.map((element) => element.Recovered);
    const dateArray = covidData.map((element) => element.Date);

    const confirmedPer100KArray = confirmedArray.map((el) => el / (population / 100000));
    const deathsPer100KArray = deathsArray.map((el) => el / (population / 100000));
    const recoveredPer100KArray = recoveredArray.map((el) => el / (population / 100000));

    const purple = 'rgb(150, 45, 170)';
    const blue = 'rgb(20, 1, 99)';
    const red = 'rgb(155, 0, 19)';

    createChart(this.canvas4, confirmedPer100KArray, dateArray, purple);
    createChart(this.canvas5, deathsPer100KArray, dateArray, blue);
    createChart(this.canvas6, recoveredPer100KArray, dateArray, red);
  }
}
