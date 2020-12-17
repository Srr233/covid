import Leaflet from 'leaflet';
import Geo from '../../data/custom-medium.geo.json';
import 'leaflet/dist/leaflet.css';

export default class InteractiveMap {
  static map;

  static geoJsonLayer;

  static async initialize() {
    // const url = 'https://api.covid19api.com/all';
    const url = 'https://corona.lmao.ninja/v2/countries';
    const response = await fetch(url);

    if (response.ok) {
      let dataCovid = await response.json();
      InteractiveMap.create(dataCovid);
    } else {
      // eslint-disable-next-line no-alert
      alert('Error HTTP: ' + response.status);
    }
  }

  static create(dataCovid) {
    const data = this.dataPreparation(dataCovid, Geo);

    // eslint-disable-next-line no-console
    console.log(data);

    InteractiveMap.createContainer();
    InteractiveMap.createMap(data);
  }

  static createMap(data) {
    const accessToken = 'pk.eyJ1IjoiZG1pdHJ5MjAyIiwiYSI6ImNraXJreXc5OTBvcGwzMWwzeGJ3dXVrbmsifQ.cv6TNVdCaUOH5wqHSuwAMw';
    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    const mapOptions = {
      center: [17.385044, 78.486671],
      zoom: 2.5,
      minZoom: 2.5
    };
    const tileLayerOptions = {
      attribution: attribution,
      maxZoom: 18,
      id: 'mapbox/light-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken
    };

    InteractiveMap.map = new Leaflet.Map('interactive-map', mapOptions);
    const layer = new Leaflet.TileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, tileLayerOptions);
    InteractiveMap.geoJsonLayer = Leaflet.geoJson(data, {
      style: InteractiveMap.getStyle,
      onEachFeature: InteractiveMap.onEachFeature
    });

    InteractiveMap.map.addLayer(layer);
    InteractiveMap.geoJsonLayer.addTo(InteractiveMap.map);
    InteractiveMap.map.fitWorld();
  }

  static createContainer() {
    const container = document.createElement('div');

    container.setAttribute('id', 'interactive-map');
    container.setAttribute('class', 'interactive-map');
    document.body.appendChild(container);

    return container;
  }

  static dataPreparation(dataCovid, dataCountry) {
    const features = dataCountry.features.map((data) => {
      const geometry = data.geometry;
      const type = data.type;
      const properties = dataCovid.find((item) => data.properties.iso_a3 === item.countryInfo.iso3);

      return {
        type: type,
        properties: properties,
        geometry: geometry
      };
    });

    return {
      type: dataCountry.type,
      features: features
    };
  }

  static getStyle(feature) {
    if (!feature.properties) return null;

    const getColor = (cases) => {
      if (cases > 1000000) return '#67000d';
      if (cases > 500000) return '#a50f15';
      if (cases > 200000) return '#cb181d';
      if (cases > 100000) return '#ef3b2c';
      if (cases > 50000) return '#fb6a4a';
      if (cases > 20000) return '#fc9272';
      if (cases > 10000) return '#fcbba1';
      if (cases > 5000) return '#fee0d2';
      return '#fff5f0';
    };

    return {
      fillColor: getColor(feature.properties.cases),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    };
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
