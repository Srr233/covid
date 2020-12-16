import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor() {
    this.view = new View();
    this.links = {
      summary: fetch('https://api.covid19api.com/summary')

    };
    this.currentCountry = {};
  }

  async setAllData() {
    return Promise.all(Object.values(this.links)).then(arr => arr.map(response => response.json()));
  }

  async setCurrentCountry(countryCode) {
    this.currentCountryCode = countryCode;

    const response = await this.links.summary;
    const json = await response.json();
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
