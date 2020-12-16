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
}

export default Controller;
