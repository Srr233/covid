import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
  }

  setCountry(code) {
    this.model.setCurrentCountry(code);
  }

  setGlobal() {
    this.model.setAllData();
  }

  changeType(event) {
    const target = event.target;
    let direction = target.dataset.type;
    if (!direction) return;
    const currentStatus = target.parentElement.querySelector('span').textContent;
    let status = currentStatus;
    status = status.split(' ');
    let isOne = false;
    if (status.length > 2) {
      isOne = true;
      status = [status[0], status.slice(-1).join('')];
    }
    const options = {
      type: status[0],
      direction: direction,
      status: status[1],
      allStatus: currentStatus,
      isOneHundred: isOne
    };
    this.model.changeList(options);
  }

  init() {
    this.model.init();
    this.changeType = this.changeType.bind(this);
  }
}

export default Controller;
