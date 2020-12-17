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
    /*
    sort info by decreasing
    add data-* in all paragraph with name of code country
    */
    const global = json.Global;
    const countries = json.Countries.slice();
    this.table = forView.createTable(global);
    this.wrapperTable.insertAdjacentElement('beforeend', this.table);
    this.listGlobal = document.querySelector('.ST__total-list');
    this.listLastDay = document.querySelector('.ST__one-day-list');

    for (let i = 0; i < countries.length; i += 1) {
      const currentCountry = countries[i];
      const globalInfo = {
        country: currentCountry.Country,
        number: currentCountry.TotalDeaths,
        status: 'deaths',
        type: 'total'
      };
      const forGlobal = forView.createParagraph(globalInfo);

      const lastInfo = {
        country: currentCountry.Country,
        number: currentCountry.NewDeaths,
        status: 'deaths',
        type: 'one-day'
      };
      const forLast = forView.createParagraph(lastInfo);
      this.listGlobal.insertAdjacentElement('beforeend', forGlobal);
      this.listLastDay.insertAdjacentElement('beforeend', forLast);
    }
    const globalList = forView.sort(this.listGlobal.children);
    const listLastDay = forView.sort(this.listLastDay.children);

    forView.clearChildren(this.listGlobal);
    forView.clearChildren(this.listLastDay);
    forView.addAllChildren(this.listGlobal, globalList);
    forView.addAllChildren(this.listLastDay, listLastDay);
  }
}

export default View;
