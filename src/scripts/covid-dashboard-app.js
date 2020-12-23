import StatisticsTable from './statistics-table-scripts/controller.js';
import InteractiveMap from './interactive-map/interactive-map';
import GraphController from './graph/GraphController.js';
import InitCasesComponent from './cases/init-cases-component';
import FullscreenOn from '../assets/fullscreen-on.svg';
import FullscreenOff from '../assets/fullscreen-off.svg';
import { urlCovidDataApi } from './interactive-map/constants';

export default class CovidDashboardApp {
  static async initialize() {
    const overlay = document.querySelector('.load-overlay');
    const response = await fetch(urlCovidDataApi);

    if (response.ok) {
      let data = await response.json();

      CovidDashboardApp.buildCovidDashboardApp(data);
      overlay.setAttribute('style', 'display: none;');
    } else {
      overlay.innerHTML = `<span>Error HTTP: ${response.status}</span>`;
    }
  }

  static buildCovidDashboardApp(data) {
    InteractiveMap.initialize(data);
    const graph = new GraphController();
    graph.initialize();
    const graphNavigation = graph.navigation;
    const statisticsTable = new StatisticsTable(data);
    statisticsTable.init();
    // new InitCasesComponent().startWork();
    CovidDashboardApp.createButtonFullscreen();
  }

  static createButtonFullscreen() {
    const idButtons = ['list', 'map', 'table', 'graph'];
    const componentContainers = document.querySelectorAll('.component-container');
    const imgFullscreenOn = document.createElement('img');
    const imgFullscreenOff = document.createElement('img');

    imgFullscreenOff.setAttribute('src', FullscreenOff);
    imgFullscreenOff.setAttribute('alt', 'fullscreen');
    imgFullscreenOff.setAttribute('src', FullscreenOn);
    imgFullscreenOff.setAttribute('alt', 'fullscreen');

    const buttons = idButtons.map((id) => {
      const button = document.createElement('button');

      button.setAttribute('id', id);
      button.setAttribute('class', 'button-fullscreen');
      button.setAttribute('data-fullscreen', 'false');
      button.appendChild(imgFullscreenOff.cloneNode());

      return button;
    });

    componentContainers.forEach((item, index) => item.appendChild(buttons[index]));

    return {
      imgFullscreenOn: imgFullscreenOn,
      imgFullscreenOff: imgFullscreenOff,
      buttons: buttons,
      componentContainers: componentContainers
    };
  }
}
