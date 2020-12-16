import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.test = null;
  }

  setCountry(countryCode) {
    this.model.setCurrentCountry(countryCode);
  }

  test() {
    this.test = false;
  }
}

export default Controller;
