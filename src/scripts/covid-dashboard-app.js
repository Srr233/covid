import StatisticsTable from './statistics-table-scripts/controller.js';

export default class CovidDashboardApp {
  static initialize() {
    const statisticsTable = new StatisticsTable();
    statisticsTable.init();
  }
}
