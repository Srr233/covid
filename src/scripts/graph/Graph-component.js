import createDOMElement from './createDOMElement.js';

export default class GraphComponent {
  constructor(covidData) {
    this.covidData = covidData;
    this.body = document.body;
  }

  initialize() {
    this.main = createDOMElement('main', 'wrapper');
    this.title = createDOMElement('h1', 'title', 'Graph', this.main);
    this.content = createDOMElement('div', 'content', '', this.main);
    this.body.prepend(this.main);
    this.showData();
  }

  showData() {
    this.content.innerHTML = this.covidData.Global;
    console.log(this.covidData);
  }
}
