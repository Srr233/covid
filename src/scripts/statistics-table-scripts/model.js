import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor() {
    this.view = new View();
    this.summary = fetch('https://corona.lmao.ninja/v2/countries');
    this.currentCountry = {};
    this.allInfo = null;
    this.status = 'total cases';
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
    const currentCountry = this.allInfo.find(item => item.countryInfo.iso2 === code);
    let isOneHundred;
    const type = this.status.split(/\s/)[0];
    const status = this.status.split(/\s/).slice(-1).join('');
    if (this.status.includes('100k')) {
      isOneHundred = true;
    } else {
      isOneHundred = false;
    }
    const info = {
      country: currentCountry,
      status: status,
      type: type
    };

    if (currentCountry) {
      this.view.selectOne(info, isOneHundred);
    } else {
      throw new Error('Country not found!');
    }
  }

  changeList(options) {
    const copy = options;
    copy.allStatus = forModel.getNextTypeStatistics(copy.allStatus, options.direction);
    this.allStatus = copy.allStatus;
    this.status = copy.allStatus;

    if (copy.allStatus.includes('100k')) {
      copy.isOneHundred = true;
    } else {
      copy.isOneHundred = false;
    }
    const allInfo = {
      allStatus: copy.allStatus,
      status: copy.allStatus.split(/\s/).slice(-1).join(''),
      type: copy.allStatus.split(/\s/)[0],
      countries: this.allInfo,
      allCases: this.allCases
    };
    this.view.changeList(allInfo, copy.isOneHundred);
  }

  async init() {
    const json = await forModel.getAllData(this.summary);
    this.allInfo = json;
    this.allCases = forModel.getAllCases(this.allInfo);

    this.view.init(this.allCases.total.cases, this.allInfo, 'cases');
  }
}

export default Model;
