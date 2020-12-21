import InteractiveMap from './interactive-map/interactive-map';
import GraphController from './graph/GraphController.js';

export default class CovidDashboardApp {
  static initialize() {
    InteractiveMap.initialize();
    new GraphController().initialize();
  }
}
