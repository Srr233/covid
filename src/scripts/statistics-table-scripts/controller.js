import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
  }

  setCountry(countryCode) {
    this.model.setCurrentCountry(countryCode);
  }

  setGlobal() {
    this.model.setAllData();
  }

  init() {
    this.model.init();
  }
}

export default Controller;
