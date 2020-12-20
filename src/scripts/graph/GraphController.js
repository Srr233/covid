import GraphComponent from './Graph-component.js';

export default class GraphController {
  constructor() {
    this.apiUrlWorld = 'https://api.covid19api.com/total/country/united-states';
    this.apiUrlCountries = 'https://api.covid19api.com/total/country/';
    this.apiUrl = 'https://api.covid19api.com/countries';
    this.apiPopulation = 'https://disease.sh/v3/covid-19/countries';
  }

  initialize() {
    this.graphComponent = new GraphComponent();
    this.graphComponent.initialize();

    this.graphComponent.navigation.addEventListener('click', (event) => {
      this.handleEvent(event.target);
    });

    const navigationChildren = this.graphComponent.navigation.children;
    const graphComponentChildren = this.graphComponent.sectionGraph.children;
    this.navItemsArray = Object.values(navigationChildren).filter((element) => {
      return element.className.includes('nav-item');
    });
    this.chartsArray = Object.values(graphComponentChildren).filter((element) => {
      return element.className.includes('chart');
    });

    this.buildCharts('TR');
  }

  buildCharts(countryCode) {
    if (countryCode) {
      fetch(this.apiUrl)
      // fetch(this.api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data)
          this.cnt = data.find((elem) => elem.ISO2 === countryCode);
          // console.log(this.cnt)
          this.buildChartsFor(this.apiUrlCountries + this.cnt.Slug, countryCode);
        });
    } else {
      this.buildGlobalCharts();
    }
  }

  buildChartsFor(url, countryCode) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.graphComponent.showData(data);
        this.buildChartsPer100K(data, countryCode);
      });
  }

  buildGlobalCharts() {
    fetch(this.apiUrlWorld)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.graphComponent.showData(data);
      });
  }

  buildChartsPer100K(covidData, countryCode) {
    fetch(this.apiPopulation)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const currentCountry = data.find((elem) => elem.countryInfo.iso2 === countryCode);
        this.graphComponent.showDataPer100K(covidData, currentCountry.population);
      });
  }

  handleEvent(target) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    if (target.className.includes('nav-item')) {
      // console.log('ttt');
      // this.switchChart('deaths', 'per 100 thousand');
    }

    if (target.className.includes('left')) {
      this.handleLeftArrow(activeNavItemIndex);
    }

    if (target.className.includes('right')) {
      this.handleRightArrow(activeNavItemIndex);
    }
  }

  handleLeftArrow(activeNavItemIndex) {
    this.navItemsArray[activeNavItemIndex].classList.toggle('active');
    this.chartsArray[activeNavItemIndex].classList.toggle('active');
    if (activeNavItemIndex > 0) {
      this.navItemsArray[activeNavItemIndex - 1].classList.toggle('active');
      this.chartsArray[activeNavItemIndex - 1].classList.toggle('active');
    } else {
      this.navItemsArray[this.navItemsArray.length - 1].classList.toggle('active');
      this.chartsArray[this.navItemsArray.length - 1].classList.toggle('active');
    }
  }

  handleRightArrow(activeNavItemIndex) {
    this.navItemsArray[activeNavItemIndex].classList.toggle('active');
    this.chartsArray[activeNavItemIndex].classList.toggle('active');
    if (activeNavItemIndex < this.navItemsArray.length - 1) {
      this.navItemsArray[activeNavItemIndex + 1].classList.toggle('active');
      this.chartsArray[activeNavItemIndex + 1].classList.toggle('active');
    } else {
      this.navItemsArray[0].classList.toggle('active');
      this.chartsArray[0].classList.toggle('active');
    }
  }

  switchChart(caseType, magnitude) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    this.navItemsArray[activeNavItemIndex].classList.remove('active');
    this.chartsArray[activeNavItemIndex].classList.remove('active');

    if (caseType === 'cases' && magnitude === 'absolute') {
      this.navItemsArray[0].classList.add('active');
      this.chartsArray[0].classList.add('active');
    }
    if (caseType === 'deaths' && magnitude === 'absolute') {
      this.navItemsArray[1].classList.add('active');
      this.chartsArray[1].classList.add('active');
    }
    if (caseType === 'recovered' && magnitude === 'absolute') {
      this.navItemsArray[2].classList.add('active');
      this.chartsArray[2].classList.add('active');
    }

    if (caseType === 'cases' && magnitude === 'per 100 thousand') {
      this.navItemsArray[3].classList.add('active');
      this.chartsArray[3].classList.add('active');
    }
    if (caseType === 'deaths' && magnitude === 'per 100 thousand') {
      this.navItemsArray[4].classList.add('active');
      this.chartsArray[4].classList.add('active');
    }
    if (caseType === 'recovered' && magnitude === 'per 100 thousand') {
      this.navItemsArray[5].classList.add('active');
      this.chartsArray[5].classList.add('active');
    }
  }
}
