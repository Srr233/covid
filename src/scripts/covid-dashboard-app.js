import GraphController from './graph/GraphController.js';

export default class CovidDashboardApp {
  static initialize() {
    new GraphController().initialize();
  }
}
