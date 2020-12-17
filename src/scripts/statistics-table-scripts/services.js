const forModel = {
  async getAllData(promise) {
    const response = await promise;
    const json = await response.json();
    return json;
  }
};

const forView = {
  clearChildren(element) {
    const length = element.childElementCount;
    if (!length) {
      return;
    }
    for (let i = 0; i < length; i += 1) {
      element.firstElementChild.remove();
    }
  },
  createTable(info) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ST');
    const allTableHTML = `<div class="ST__total-wrapper">
      <div class="ST__total">
        <div class="ST__total-name-wrapper">
          <span class="ST__total-name">Global deaths</span>
          <span class="ST__total-number">${info.TotalDeaths.toLocaleString()}</span>
        </div>
        <div class="ST__total-list">
        </div>
      </div>
      <div class="ST__total-buttons">
        <button class="ST__total-buttons__left"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M11 15.5l-7-7 7-7zM10 3.914L5.414 8.5 10 13.086z"></path>
          </svg>
        </button>
        <span class="ST__total-current-status">total deaths</span>
        <button class="ST__total-buttons__right"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M5 1.5l7 7-7 7zm1 11.586L10.586 8.5 6 3.914z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="ST__one-day-wrapper">
      <div class="ST__one-day">
        <div class="ST__one-day-name-wrapper">
          <span class="ST__one-day-name">Last deaths</span>
          <span class="ST__one-day-number">${info.NewDeaths.toLocaleString()}</span>
        </div>
        <div class="ST__one-day-list">
         
        </div>
      </div>
      <div class="ST__one-day-buttons">
        <button class="ST__one-day-buttons__left"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M11 15.5l-7-7 7-7zM10 3.914L5.414 8.5 10 13.086z"></path>
          </svg>
        </button>
        <span class="ST__one-day-current-status">last deaths</span>
        <button class="ST__one-day-buttons__right"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M5 1.5l7 7-7 7zm1 11.586L10.586 8.5 6 3.914z"></path>
          </svg>
        </button>
      </div>
    </div>`;
    wrapper.insertAdjacentHTML('beforeend', allTableHTML);
    return wrapper;
  }
};
export { forModel, forView };
