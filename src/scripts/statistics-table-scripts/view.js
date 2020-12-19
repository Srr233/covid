import { forView } from './services.js';

class View {
  constructor() {
    this.wrapperTable = document.querySelector('#wrap');
    this.table = null;
  }

  changeList(options, isOneHundred) {
    const {
      type, status, allStatus, allCases, countries
    } = options;

    this.table.querySelector('.ST__info-current-status').textContent = allStatus;
    this.table.querySelector('.ST__info-name').textContent = allStatus;
    this.table.querySelector('.ST__info-current-status').textContent = allStatus;
    this.table.querySelector('.ST__info-name').textContent = allStatus;
    if (isOneHundred) {
      this.table.querySelector('.ST__info-number').textContent = allCases[type][allStatus].toLocaleString();
    } else {
      this.table.querySelector('.ST__info-number').textContent = allCases[type][status].toLocaleString();
    }

    const newList = forView.createList(countries, status, type, isOneHundred);
    forView.clearChildren(this.listInfo);

    newList.forEach(item => {
      const forLast = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forLast);
    });
    const forInfo = forView.sort(this.listInfo.children);
    forView.clearChildren(this.listInfo);
    forView.addAllChildren(this.listInfo, forInfo);
  }

  updateTable(json) {
    forView.clearChildren(this.table.parentElement);
    this.init(json);
  }

  selectOne(info, isOneHundred) {
    const newList = forView.createList([info.country], info.status, info.type, isOneHundred);
    forView.clearChildren(this.listInfo);

    newList.forEach(item => {
      const forInfo = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forInfo);
      this.table.querySelector('.ST__info-number').textContent = item.number;
    });
  }

  init(globalInfo, countries, status) {
    const arrCountries = countries;
    const key = status;

    this.table = forView.createTable(globalInfo);
    this.wrapperTable.insertAdjacentElement('beforeend', this.table);
    this.listInfo = document.querySelector('.ST__info-list');

    const newList = forView.createList(arrCountries, key, 'total');

    newList.forEach(item => {
      const forInfo = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forInfo);
    });
    const list = forView.sort(this.listInfo.children);

    forView.clearChildren(this.listInfo);
    forView.addAllChildren(this.listInfo, list);
  }
}

export default View;
