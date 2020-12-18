import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor() {
    this.view = new View();
    this.summary = fetch('https://api.covid19api.com/summary');
    this.currentCountry = {};
    this.allInfo = null;
  }

  async setAllData() {
    if (this.allInfo) {
      this.view.updateTable(this.allInfo);
    } else {
      const json = await forModel.getAllData(this.summary);
      this.allInfo = json;
      this.view.updateTable(json);
    }
  }

  async setCurrentCountry(countryCode) {
    this.currentCountryCode = countryCode;
    const currentCountry = this.allInfo.find(item => item.CountryCode === countryCode);

    if (currentCountry) {
      this.currentCountry = currentCountry;
    } else {
      throw new Error('Country not found!');
    }
  }

  changeList(options) {
    this.view.changeList(options, this.allInfo);
  }

  async init() {
    const json = await forModel.getAllData(this.summary);
    this.allInfo = json;
    this.view.init(json);
  }
}

export default Model;
