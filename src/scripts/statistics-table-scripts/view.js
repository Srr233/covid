class View {
  constructor(wrapperElementMap, wrapperListCountries) {
    this.wrapperMap = wrapperElementMap;
    this.wrapperListCountries = wrapperListCountries;
  }

  updateTable(options) {
    const {
      NewConfirmed,
      NewDeaths,
      NewRecovered,
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      Country
    } = options;

    this.newConfirmed = NewConfirmed;
    this.newDeaths = NewDeaths;
    this.newRecovered = NewRecovered;
    this.totalConfirmed = TotalConfirmed;
    this.totalDeaths = TotalDeaths;
    this.totalRecovered = TotalRecovered;
    this.country = Country;
  }
}

export default View;
