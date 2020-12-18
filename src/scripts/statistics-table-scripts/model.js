import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor() {
    this.view = new View();
    this.summary = fetch('https://api.covid19api.com/summary');
    this.currentCountry = {};
    this.allInfo = null;
    this.status = {
      oneDay: 'NewDeaths',
      total: 'TotalDeaths'
    };
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

  setCurrentCountry(code) {
    const currentCountry = this.allInfo.Countries.find(item => item.CountryCode === code);

    if (currentCountry) {
      this.view.selectOne(currentCountry, this.status, code);
    } else {
      throw new Error('Country not found!');
    }
  }

  changeList(options) {
    const status = this.view.changeList(options, this.allInfo);
    this.status = status;
  }

  async init() {
    const json = await forModel.getAllData(this.summary);
    this.allInfo = json;
    this.view.init(json);
  }
}

export default Model;
