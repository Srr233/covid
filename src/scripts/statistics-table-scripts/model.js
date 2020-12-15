class Model {
  constructor() {
    this.links = {
      summary: fetch('https://api.covid19api.com/summary')

    };
    this.currentCountryCode = null;
  }

  getAllData() {
    return Promise.all(Object.values(this.links)).then(arr => arr.map(response => response.json()));
  }

  async getCurrentCountry(countryCode) {
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
    return currentCountry;
  }
}

export default Model;
