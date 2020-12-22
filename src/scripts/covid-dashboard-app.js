import StatisticsTable from './statistics-table-scripts/controller.js';
import InteractiveMap from './interactive-map/interactive-map';
import GraphController from './graph/GraphController.js';

export default class CovidDashboardApp {
  static initialize() {
    InteractiveMap.initialize();
    new GraphController().initialize();
    const statisticsTable = new StatisticsTable();
    statisticsTable.init();
  }
}
