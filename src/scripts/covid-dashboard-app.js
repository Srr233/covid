import StatisticsTable from './statistics-table-scripts/controller.js';
import InteractiveMap from './interactive-map/interactive-map';
import GraphController from './graph/GraphController.js';
import InitCasesComponent from './cases/init-cases-component';

export default class CovidDashboardApp {
  static initialize() {
    InteractiveMap.initialize();
    const graph = new GraphController();
    graph.initialize();
    const graphNavigation = graph.navigation;
    const statisticsTable = new StatisticsTable();
    statisticsTable.init();
    new InitCasesComponent().startWork();
  }
}
