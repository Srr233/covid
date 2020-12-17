import { forView } from './services.js';

class View {
  constructor() {
    this.wrapperTable = document.querySelector('#wrap');
    this.table = null;
  }

  updateTable(options) {
    if (!this.table) {
      this.table = forView.createTable(options);
    }
  }

  init(json) {
    this.table = forView.createTable(json.Global);
    this.wrapperTable.insertAdjacentElement('beforeend', this.table);
  }
}

export default View;
