import Leaflet from 'leaflet';
import DataGeoCountry from '../../data/custom-medium.geo.json';
import {
  urlCovidDataApi, urlTemplate, mapOptions, tileLayerOptions, mapContainerName
} from './constants';
import 'leaflet/dist/leaflet.css';

export default class InteractiveMap {
  static map;

  static tileLayer;

  static geoJsonLayer;

  static async initialize() {
    const response = await fetch(urlCovidDataApi);

    if (response.ok) {
      let dataCovidCountry = await response.json();
      const data = this.dataPreparation(dataCovidCountry, DataGeoCountry);

      InteractiveMap.createContainer();
      InteractiveMap.createMap(data);
    } else {
      // eslint-disable-next-line no-alert
      alert('Error HTTP: ' + response.status);
    }
  }

  static createMap(data) {
    InteractiveMap.map = new Leaflet.Map(mapContainerName, mapOptions);
    InteractiveMap.tileLayer = new Leaflet.TileLayer(urlTemplate, tileLayerOptions);
    InteractiveMap.geoJsonLayer = Leaflet.geoJson(data, {
      style: InteractiveMap.getStyle,
      onEachFeature: InteractiveMap.onEachFeature
    });

    InteractiveMap.map.addLayer(InteractiveMap.tileLayer);
    InteractiveMap.geoJsonLayer.addTo(InteractiveMap.map);
    InteractiveMap.map.fitWorld();
  }

  static createContainer() {
    const container = document.createElement('div');

    container.setAttribute('id', mapContainerName);
    container.setAttribute('class', mapContainerName);
    document.body.appendChild(container);

    return container;
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

  static getStyle(feature) {
    const color = feature.properties
      ? InteractiveMap.getColor(feature.properties.cases)
      : '#000000';

    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    };
  }

  static getColor(cases) {
    if (cases > 1000000) return '#67000d';
    if (cases > 500000) return '#a50f15';
    if (cases > 200000) return '#cb181d';
    if (cases > 100000) return '#ef3b2c';
    if (cases > 50000) return '#fb6a4a';
    if (cases > 20000) return '#fc9272';
    if (cases > 10000) return '#fcbba1';
    if (cases > 5000) return '#fee0d2';
    return '#fff5f0';
  }

  static highlightFeature(event) {
    const layer = event.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!Leaflet.Browser.ie && !Leaflet.Browser.opera && !Leaflet.Browser.edge) {
      layer.bringToFront();
    }
  }

  static resetHighlight(event) {
    InteractiveMap.geoJsonLayer.resetStyle(event.target);
  }

  static zoomToFeature(event) {
    InteractiveMap.map.fitBounds(event.target.getBounds());
  }

  static onEachFeature(feature, layer) {
    layer.on({
      mouseover: InteractiveMap.highlightFeature,
      mouseout: InteractiveMap.resetHighlight,
      click: InteractiveMap.zoomToFeature
    });
  }
}
