import GraphComponent from './Graph-component.js';

const apiUrl = 'https://api.covid19api.com/summary';
let covidData = fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });

const graphComponent = new GraphComponent(covidData);
graphComponent.initialize();
