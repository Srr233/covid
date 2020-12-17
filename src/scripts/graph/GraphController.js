import GraphComponent from './Graph-component.js';

export default class GraphController {
  constructor() {
    this.apiUrl = 'https://api.covid19api.com/total/country/united-states';
  }

  initialize() {
    const graphComponent = new GraphComponent();
    graphComponent.initialize();

    fetch(this.apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        graphComponent.showData(data);
      });
  }
}
