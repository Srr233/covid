import { forView } from './services.js';

class View {
  constructor() {
    this.wrapperTable = document.querySelector('#wrap');
    this.table = null;
  }

  changeList(options, allInfo) {
    const { time, direction, status } = options;
    const nextStatus = forView.getNextTypeStatistics(status, direction);
    if (time === 'oneDay') {
      const currentNameInfo = forView.getCurrentNameInfo(nextStatus, 'one-day');
      this.table.querySelector('.ST__one-day-current-status').textContent = `last ${nextStatus}`;
      this.table.querySelector('.ST__one-day-name').textContent = `Last ${nextStatus}`;
      this.table.querySelector('.ST__one-day-number').textContent = `${allInfo.Global[currentNameInfo].toLocaleString()}`;

      const newList = forView.createList(allInfo.Countries, nextStatus, 'one-day');
      forView.clearChildren(this.listLastDay);

      newList.forEach(item => {
        const forLast = forView.createParagraph(item);
        this.listLastDay.insertAdjacentElement('beforeend', forLast);
      });
      const listLastDay = forView.sort(this.listLastDay.children);
      forView.addAllChildren(this.listLastDay, listLastDay);
    } else if (time === 'total') {
      const currentNameInfo = forView.getCurrentNameInfo(nextStatus, 'total');
      this.table.querySelector('.ST__total-current-status').textContent = `total ${nextStatus}`;
      this.table.querySelector('.ST__total-name').textContent = `Global ${nextStatus}`;
      this.table.querySelector('.ST__total-number').textContent = `${allInfo.Global[currentNameInfo].toLocaleString()}`;

      const newList = forView.createList(allInfo.Countries, nextStatus, 'total');
      forView.clearChildren(this.listTotal);

      newList.forEach(item => {
        const forLast = forView.createParagraph(item);
        this.listTotal.insertAdjacentElement('beforeend', forLast);
      });
      const forTotal = forView.sort(this.listTotal.children);
      forView.addAllChildren(this.listTotal, forTotal);
    }
  }

  init(json) {
    /*
    add data-* in all paragraph with name of code country
    */
    const global = json.Global;
    const countries = json.Countries.slice();
    this.table = forView.createTable(global);
    this.wrapperTable.insertAdjacentElement('beforeend', this.table);
    this.listTotal = document.querySelector('.ST__total-list');
    this.listLastDay = document.querySelector('.ST__one-day-list');

    for (let i = 0; i < countries.length; i += 1) {
      const currentCountry = countries[i];
      const totalInfo = {
        country: currentCountry.Country,
        number: currentCountry.TotalDeaths.toLocaleString(),
        status: 'deaths',
        type: 'total',
        code: currentCountry.CountryCode
      };
      const forTotal = forView.createParagraph(totalInfo);

      const lastInfo = {
        country: currentCountry.Country,
        number: currentCountry.NewDeaths.toLocaleString(),
        status: 'deaths',
        type: 'one-day',
        code: currentCountry.CountryCode
      };
      const forLast = forView.createParagraph(lastInfo);
      this.listTotal.insertAdjacentElement('beforeend', forTotal);
      this.listLastDay.insertAdjacentElement('beforeend', forLast);
    }
    const globalList = forView.sort(this.listTotal.children);
    const listLastDay = forView.sort(this.listLastDay.children);

    forView.clearChildren(this.listTotal);
    forView.clearChildren(this.listLastDay);
    forView.addAllChildren(this.listTotal, globalList);
    forView.addAllChildren(this.listLastDay, listLastDay);
  }
}

export default View;
