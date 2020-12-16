import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor() {
    this.view = new View();
    this.summary = fetch('https://api.covid19api.com/summary');
    this.currentCountry = {};
  }

  async setAllData() {
    const json = await forModel.getAllData(this.summary);
    this.view.updateTable(json);
  }

  async setCurrentCountry(countryCode) {
    this.currentCountryCode = countryCode;

    const json = await forModel.getAllData(this.summary);
    const currentCountry = await new Promise((resolve, reject) => {
      const res = json.Countries.find(item => item.CountryCode === countryCode);
      if (res) {
        resolve(res);
      } else {
        reject(new Error('Country not found!'));
      }
    });

    if (currentCountry) {
      this.currentCountry = currentCountry;
    } else {
      throw new Error('Country not found!');
    }
  }
}

export default Model;
