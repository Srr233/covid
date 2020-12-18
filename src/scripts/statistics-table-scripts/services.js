function getCurrentNameInfo(status, time) {
  const name = status + time;
  const date1 = {
    recoveredtotal: 'TotalRecovered',
    confirmedtotal: 'TotalConfirmed',
    deathstotal: 'TotalDeaths',
    'recoveredone-day': 'NewRecovered',
    'confirmedone-day': 'NewConfirmed',
    'deathsone-day': 'NewDeaths'
  };
  const date2 = {
    TotalRecovered: 'recovered',
    TotalConfirmed: 'confirmed',
    TotalDeaths: 'deaths',
    NewRecovered: 'recovered',
    NewConfirmed: 'confirmed',
    NewDeaths: 'deaths'
  };
  return date1[name] || date2[name];
}

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
        <button class="ST__total-buttons__left" data-type="total left"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M11 15.5l-7-7 7-7zM10 3.914L5.414 8.5 10 13.086z"></path>
          </svg>
        </button>
        <span class="ST__total-current-status">total deaths</span>
        <button class="ST__total-buttons__right" data-type="total right"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
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
        <button class="ST__one-day-buttons__left" data-type="oneDay left"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M11 15.5l-7-7 7-7zM10 3.914L5.414 8.5 10 13.086z"></path>
          </svg>
        </button>
        <span class="ST__one-day-current-status">last deaths</span>
        <button class="ST__one-day-buttons__right" data-type="oneDay right"><svg xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 16 16">
            <path d="M5 1.5l7 7-7 7zm1 11.586L10.586 8.5 6 3.914z"></path>
          </svg>
        </button>
      </div>
    </div>`;
    wrapper.insertAdjacentHTML('beforeend', allTableHTML);
    return wrapper;
  },
  createParagraph({
    country, number, status, type, code
  }) {
    const wrapper = document.createElement('p');
    wrapper.setAttribute('data-code', code);
    const allInfoHTML = `
    <span class="ST__${type}-list-number pointerOff">${number}</span>
    <span class="ST__${type}-list-status pointerOff">${status}</span>
    <span class="ST__${type}-list-country pointerOff">${country}</span>`;
    wrapper.insertAdjacentHTML('beforeend', allInfoHTML);
    return wrapper;
  },
  sort(arr) {
    const groups = Array.isArray(arr) ? arr : Array.from(arr);
    groups.sort((a, b) => {
      const elem1 = a.firstElementChild;
      const elem2 = b.firstElementChild;
      const n1 = elem1.textContent.split(/\s/).join('');
      const n2 = elem2.textContent.split(/\s/).join('');
      return n2 - n1;
    });
    return groups;
  },
  addAllChildren(parent, childrenArray) {
    const [wrapper, children] = [parent, childrenArray];

    for (let i = 0; i < children.length; i += 1) {
      wrapper.insertAdjacentElement('beforeend', children[i]);
    }
  },
  getNextTypeStatistics(type, direction) {
    const types = ['deaths', 'recovered', 'confirmed'];
    const index = types.indexOf(type);
    let res = '';
    if (direction === 'right' && index < 2) {
      res = types[index + 1];
    } else if (direction === 'left' && index > 0) {
      res = types[index - 1];
    } else if (direction === 'right') {
      res = types[0];
    } else if (direction === 'left') {
      res = types[2];
    }
    return res;
  },
  getCurrentNameInfo,
  createList(countries, nextStatus, time) {
    const resArr = [];
    const normalNameStatus = getCurrentNameInfo(nextStatus, time);
    for (let i = 0; i < countries.length; i += 1) {
      const currentCountry = countries[i];
      const lastInfo = {
        country: currentCountry.Country,
        number: currentCountry[normalNameStatus].toLocaleString(),
        status: nextStatus,
        type: time,
        code: currentCountry.CountryCode
      };
      resArr.push(lastInfo);
    }
    return resArr;
  }
};

export { forModel, forView };
