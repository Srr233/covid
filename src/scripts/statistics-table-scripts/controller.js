import Model from './model.js';
import View from './view.js';

class Controller {
  constructor(options) {
    const { map, list } = options;
    this.model = new Model();
    this.view = new View(map, list);
  }

  setCountry(name) {
    const statusCountry = this.model.getCurrentCountry(name);
    statusCountry.then(res => {
      this.view.updateTable(res);
    }, err => { throw new Error(err); });
  }
}

export default Controller;
