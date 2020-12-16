import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class InteractiveMap {
  static async initialize() {
    const url = 'https://api.covid19api.com/all';
    const response = await fetch(url);

    if (response.ok) {
      let data = await response.json();
      this.create(data);
    } else {
      alert('Error HTTP: ' + response.status);
    }
  }

  static create(data) {
    console.log(data);

    this.createContainer();
    this.createMap();
  }

  static createMap() {
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
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken
    };

    const map = new Leaflet.Map('interactive-map', mapOptions);
    const layer = new Leaflet.TileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, tileLayerOptions);

    map.addLayer(layer);
    map.fitWorld();
  }

  static createContainer() {
    const container = document.createElement('div');

    container.setAttribute('id', 'interactive-map');
    container.setAttribute('class', 'interactive-map');
    document.body.appendChild(container);

    return container;
  }
}
