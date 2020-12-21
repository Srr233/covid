import InitCasesComponent from './cases/init-cases-component.js';
export default class CovidDashboardApp {
  static initialize() {
    new InitCasesComponent().startWork();
  }
}
