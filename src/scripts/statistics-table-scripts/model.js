class Model {
  constructor() {
    this.links = {
      summary: fetch('https://api.covid19api.com/summary')

    };
    this.currentCountry = null;
  }

  getAllData() {
    return Promise.all(Object.values(this.links)).then(arr => arr.map(response => response.json()));
  }

  getCurrentCountry(countryName) {
    this.currentCountry = countryName;
    return fetch(this.links.summary)
      .then(r => r.json(), err => {
        throw new Error('Country not found, check the name: ' + err);
      })
      .then(arr => {
        const res = arr.Countries.find(item => item.Country === countryName);
        if (res) return res;
        throw new Error('Country not found!');
      });
  }
}

export default Model;
