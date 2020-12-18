import L from 'leaflet';
import DataGeoCountry from '../../data/custom-medium.geo.json';
import {
  urlCovidDataApi,
  urlTemplate,
  mapOptions,
  tileLayerOptions,
  mapContainerName,
  gradesCases
} from './constants';
import 'leaflet/dist/leaflet.css';

export default class InteractiveMap {
  static map;

  static tileLayer;

  static geoJsonLayer;

  static info;

  static legend;

  static async initialize() {
    const response = await fetch(urlCovidDataApi);

    if (response.ok) {
      let dataCovidCountry = await response.json();
      const data = this.dataPreparation(dataCovidCountry, DataGeoCountry);

      // eslint-disable-next-line no-console
      console.log(data);

      InteractiveMap.createContainer();
      InteractiveMap.createMap(data);
    } else {
      // eslint-disable-next-line no-alert
      alert('Error HTTP: ' + response.status);
    }
  }

  static dataPreparation(dataCovidCountry, dataGeoCountry) {
    const features = dataGeoCountry.features.map((geoData) => {
      const geometry = geoData.geometry;
      const type = geoData.type;
      const properties = dataCovidCountry
        .find((covidData) => geoData.properties.iso_a3 === covidData.countryInfo.iso3);

      return {
        type: type,
        properties: properties,
        geometry: geometry
      };
    });

    return {
      type: dataGeoCountry.type,
      features: features
    };
  }

  static createMap(data) {
    InteractiveMap.map = new L.Map(mapContainerName, mapOptions);
    InteractiveMap.tileLayer = new L.TileLayer(urlTemplate, tileLayerOptions);
    InteractiveMap.geoJsonLayer = L.geoJson(data, {
      style: InteractiveMap.getStyle,
      onEachFeature: InteractiveMap.onEachFeature
    });
    InteractiveMap.info = InteractiveMap.createInfo();
    InteractiveMap.legend = InteractiveMap.createLegend();

    InteractiveMap.map.addLayer(InteractiveMap.tileLayer);
    InteractiveMap.geoJsonLayer.addTo(InteractiveMap.map);
    InteractiveMap.info.addTo(InteractiveMap.map);
    InteractiveMap.legend.addTo(InteractiveMap.map);
    L.control.scale().addTo(InteractiveMap.map);
    InteractiveMap.map.fitWorld();
    InteractiveMap.map.setZoom(2.5);
    InteractiveMap.map.setMaxBounds([[90, -180], [-90, 180]]);
  }

  static createInfo() {
    let info = L.control();

    info.update = (properties) => {
      const innerHTMl = properties
        ? ''.concat(`<span><b>${properties.continent}<br>${properties.country}</b><span>`)
          .concat(`<br><span>cases: ${properties.cases}</span>`)
          .concat(`<br><span>active: ${properties.active}</span>`)
          .concat(`<br><span>recovered: ${properties.recovered}</span>`)
          .concat(`<br><span>deaths: ${properties.deaths}</span>`)
          .concat(`<br><span>tests: ${properties.tests}</span>`)
        : '<span>Hover over a state</span>';

      info.container.innerHTML = `<h4>Information on COVID-19</h4>${innerHTMl}`;
    };

    info.onAdd = () => {
      info.container = L.DomUtil.create('div', 'info');
      info.update();
      return info.container;
    };

    return info;
  }

  static createLegend() {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const container = L.DomUtil.create('div', 'info legend');
      const grades = Array.from(gradesCases).reverse();

      container.innerHTML = '<h4>Legend</h4>';
      container.innerHTML += `<i style="background:${grades[0].color}"></i><span>${grades[0].cases} &plus;</span><br>`;
      for (let index = 1; index < grades.length; index += 1) {
        container.innerHTML
          += `<i style="background:${grades[index].color}"></i><span>${grades[index].cases} &ndash; ${grades[index - 1].cases}</span><br>`;
      }
      container.innerHTML += '<i style="background: #000000"></i><span>&ndash; no information</span><br>';

      return container;
    };

    return legend;
  }

  static createContainer() {
    const container = document.createElement('div');

    container.setAttribute('id', mapContainerName);
    container.setAttribute('class', mapContainerName);
    document.body.appendChild(container);

    return container;
  }

  static getStyle(feature) {
    const color = feature.properties
      ? InteractiveMap.getColor(feature.properties.cases)
      : '#000000';

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      dashArray: '',
      fillOpacity: 0.75
    };
  }

  static getColor(cases) {
    if (cases > gradesCases[8].cases) return gradesCases[8].color;
    if (cases > gradesCases[7].cases) return gradesCases[7].color;
    if (cases > gradesCases[6].cases) return gradesCases[6].color;
    if (cases > gradesCases[5].cases) return gradesCases[5].color;
    if (cases > gradesCases[4].cases) return gradesCases[4].color;
    if (cases > gradesCases[3].cases) return gradesCases[3].color;
    if (cases > gradesCases[2].cases) return gradesCases[2].color;
    if (cases > gradesCases[1].cases) return gradesCases[1].color;
    return gradesCases[0].color;
  }

  static highlightFeature(event) {
    const layer = event.target;

    layer.setStyle({
      weight: 6,
      color: layer.options.fillColor,
      dashArray: '',
      fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    InteractiveMap.info.update(layer.feature.properties);
  }

  static resetHighlight(event) {
    InteractiveMap.geoJsonLayer.resetStyle(event.target);
    InteractiveMap.info.update();
  }

  static moveToFeature(event) {
    const layer = event.target;
    const latLong = layer.feature.properties
      ? [layer.feature.properties.countryInfo.lat, layer.feature.properties.countryInfo.long]
      : layer.getCenter();

    InteractiveMap.map.setView(latLong, InteractiveMap.map.getZoom());
  }

  static onEachFeature(feature, layer) {
    layer.on({
      mouseover: InteractiveMap.highlightFeature,
      mouseout: InteractiveMap.resetHighlight,
      click: InteractiveMap.moveToFeature
    });
  }
}
