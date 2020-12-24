import GraphComponent from './Graph-component.js';
import services from './services.js';

export default class GraphController {
  constructor() {
    this.apiUrlWorld = 'https://corona-api.com/timeline';
    this.apiUrlCountries = 'https://api.covid19api.com/total/country/';
    this.apiUrl = 'https://corona-api.com/countries?include=timeline';
    this.apiPopulation = 'https://disease.sh/v3/covid-19/countries';
  }

  initialize() {
    this.graphComponent = new GraphComponent();
    this.graphComponent.initialize();

    this.navigation = this.graphComponent.navigation;
    this.navigation.addEventListener('click', (event) => {
      this.handleEvent(event.target);
    });

    // this.modalMenu = this.graphComponent.modalMenu;
    // this.modalMenu.addEventListener('click', (event) => {
    //   this.handleModalMenuEvent(event.target);
    // });
    // const modalTitle = this.modalMenu.querySelector('.modal-title');
    // const modal = this.modalMenu.getElementByClass()
    // document.body.addEventListener('click', (event) => {
    //   if (event.target !== modalTitle) {
    //     this.modalMenu.classList.remove('active');
    //     console.log(modal)
    //   }
    // });

    this.navItemsArray = Object.values(this.navigation.children).filter((element) => {
      return element.className.includes('nav-item');
    });

    const graphComponentChildren = this.graphComponent.graphDiv.children;
    this.chartsArray = Object.values(graphComponentChildren).filter((element) => {
      return element.className.includes('chart');
    });

    this.buildCharts();
  }

  buildCharts(countryCode) {
    if (countryCode) {
      fetch(this.apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const currentCountry = data.data.find((elem) => elem.code === countryCode);
          const isGlobal = false;
          this.graphComponent.showData(currentCountry.timeline, isGlobal);
          this.graphComponent.showDataPer100K(currentCountry.timeline, currentCountry.population);
        });
    } else {
      this.buildGlobalCharts();
    }
  }

  buildGlobalCharts() {
    fetch(this.apiUrlWorld)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const isGlobal = true;
        this.graphComponent.showData(data.data, isGlobal);
        this.graphComponent.showDataPer100K(data.data);
      });
  }

  handleEvent(target) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    if (target.className.includes('nav-item')) {
      // this.showModalMenu();
    }

    if (target.className.includes('left')) {
      services.handleNavArrows('left', activeNavItemIndex, this.navItemsArray, this.chartsArray);
    }

    if (target.className.includes('right')) {
      services.handleNavArrows('right', activeNavItemIndex, this.navItemsArray, this.chartsArray);
    }
    services.setNavAttribute(this.navigation);
  }

  showModalMenu() {
    this.modalMenu.classList.toggle('active');
  }

  handleModalMenuEvent(target) {
    if (target.textContent === 'Daily Cases') {
      this.switchChart('cases', 'today', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Daily Deaths') {
      this.switchChart('deaths', 'today', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Daily Recovered') {
      this.switchChart('recovered', 'today', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Daily Cases per 100k') {
      this.switchChart('cases', 'today', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.textContent === 'Daily Deaths per 100k') {
      this.switchChart('deaths', 'today', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.textContent === 'Daily Recovered per 100k') {
      this.switchChart('recovered', 'today', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Cases') {
      this.switchChart('cases', 'total', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Deaths') {
      this.switchChart('deaths', 'total', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Recovered') {
      this.switchChart('recovered', 'total', 'absolute');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Cases per 100k') {
      this.switchChart('cases', 'total', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Deaths per 100k') {
      this.switchChart('deaths', 'total', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.textContent === 'Cumulative Recovered per 100k') {
      this.switchChart('recovered', 'total', 'per 100 thousand');
      this.showModalMenu();
    }
  }

  switchChart(caseType, period, magnitude) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    this.navItemsArray[activeNavItemIndex].classList.remove('active');
    this.chartsArray[activeNavItemIndex].classList.remove('active');

    if (caseType === 'cases' && period === 'today' && magnitude === 'absolute') {
      this.navItemsArray[0].classList.add('active');
      this.chartsArray[0].classList.add('active');
    }
    if (caseType === 'deaths' && period === 'today' && magnitude === 'absolute') {
      this.navItemsArray[1].classList.add('active');
      this.chartsArray[1].classList.add('active');
    }
    if (caseType === 'recovered' && period === 'today' && magnitude === 'absolute') {
      this.navItemsArray[2].classList.add('active');
      this.chartsArray[2].classList.add('active');
    }
    if (caseType === 'cases' && period === 'today' && magnitude === 'per 100 thousand') {
      this.navItemsArray[3].classList.add('active');
      this.chartsArray[3].classList.add('active');
    }
    if (caseType === 'deaths' && period === 'today' && magnitude === 'per 100 thousand') {
      this.navItemsArray[4].classList.add('active');
      this.chartsArray[4].classList.add('active');
    }
    if (caseType === 'recovered' && period === 'today' && magnitude === 'per 100 thousand') {
      this.navItemsArray[5].classList.add('active');
      this.chartsArray[5].classList.add('active');
    }
    if (caseType === 'cases' && period === 'total' && magnitude === 'absolute') {
      this.navItemsArray[6].classList.add('active');
      this.chartsArray[6].classList.add('active');
    }
    if (caseType === 'deaths' && period === 'total' && magnitude === 'absolute') {
      this.navItemsArray[7].classList.add('active');
      this.chartsArray[7].classList.add('active');
    }
    if (caseType === 'recovered' && period === 'total' && magnitude === 'absolute') {
      this.navItemsArray[8].classList.add('active');
      this.chartsArray[8].classList.add('active');
    }
    if (caseType === 'cases' && period === 'total' && magnitude === 'per 100 thousand') {
      this.navItemsArray[9].classList.add('active');
      this.chartsArray[9].classList.add('active');
    }
    if (caseType === 'deaths' && period === 'total' && magnitude === 'per 100 thousand') {
      this.navItemsArray[10].classList.add('active');
      this.chartsArray[10].classList.add('active');
    }
    if (caseType === 'recovered' && period === 'total' && magnitude === 'per 100 thousand') {
      this.navItemsArray[11].classList.add('active');
      this.chartsArray[11].classList.add('active');
    }
    services.setNavAttribute(this.navigation);
  }
}
