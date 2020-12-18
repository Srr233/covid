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
    let status = target.parentElement.querySelector('span').textContent;
    status = status.split(' ')[1];
    const type = target.dataset.type.split(' ');
    const options = {
      time: type[0],
      direction: type[1],
      status
    };
    this.model.changeList(options);
  }

  init() {
    this.model.init();
    this.changeType = this.changeType.bind(this);
  }
}

export default Controller;
