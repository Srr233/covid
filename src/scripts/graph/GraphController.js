import GraphComponent from './Graph-component.js';

export default class GraphController {
  constructor() {
    this.apiUrlWorld = 'https://api.covid19api.com/total/country/united-states';
    this.apiUrlCountries = 'https://api.covid19api.com/total/country/';
    this.apiUrl = 'https://api.covid19api.com/countries';
  }

  initialize() {
    this.graphComponent = new GraphComponent();
    this.graphComponent.initialize();

    this.graphComponent.navigation.addEventListener('click', (event) => {
      this.handleEvent(event.target);
    });

    const navigationChildren = this.graphComponent.navigation.children;
    const graphChildren = this.graphComponent.sectionGraph.children;
    this.navItemsArray = Object.values(navigationChildren).filter((element) => {
      return element.className.includes('nav-item');
    });
    this.chartsArray = Object.values(graphChildren).filter((element) => {
      return element.className.includes('chart');
    });

    this.buildCharts();
  }

  buildCharts(country) {
    if (country) {
      fetch(this.apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cnt = data.find((elem) => elem.ISO2 === country);
          this.buildChartsFor(this.apiUrlCountries + this.cnt.Slug);
        });
    } else {
      this.buildGlobalCharts();
    }
  }

  buildChartsFor(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.graphComponent.showData(data);
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

  handleEvent(target) {
    this.activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    if (target.className.includes('nav-item')) {
      console.log('ttt');
    }

    if (target.className.includes('left')) {
      this.handleLeftArrow();
    }

    if (target.className.includes('right')) {
      this.handleRightArrow();
    }
  }

  handleLeftArrow() {
    this.navItemsArray[this.activeNavItemIndex].classList.toggle('active');
    this.chartsArray[this.activeNavItemIndex].classList.toggle('active');
    if (this.activeNavItemIndex > 0) {
      this.navItemsArray[this.activeNavItemIndex - 1].classList.toggle('active');
      this.chartsArray[this.activeNavItemIndex - 1].classList.toggle('active');
    } else {
      this.navItemsArray[this.navItemsArray.length - 1].classList.toggle('active');
      this.chartsArray[this.navItemsArray.length - 1].classList.toggle('active');
    }
  }

  handleRightArrow() {
    this.navItemsArray[this.activeNavItemIndex].classList.toggle('active');
    this.chartsArray[this.activeNavItemIndex].classList.toggle('active');
    if (this.activeNavItemIndex < this.navItemsArray.length - 1) {
      this.navItemsArray[this.activeNavItemIndex + 1].classList.toggle('active');
      this.chartsArray[this.activeNavItemIndex + 1].classList.toggle('active');
    } else {
      this.navItemsArray[0].classList.toggle('active');
      this.chartsArray[0].classList.toggle('active');
    }
  }
}
