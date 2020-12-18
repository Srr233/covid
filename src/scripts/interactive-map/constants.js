const urlCovidDataApi = 'https://corona.lmao.ninja/v2/countries';
const accessToken = 'pk.eyJ1IjoiZG1pdHJ5MjAyIiwiYSI6ImNraXJreXc5OTBvcGwzMWwzeGJ3dXVrbmsifQ.cv6TNVdCaUOH5wqHSuwAMw';
const urlTemplate = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapContainerName = 'interactive-map';
const templateTileLayer = 'mapbox/light-v10';

const gradesCases = [
  { color: '#fff5f0', cases: 0 },
  { color: '#fee0d2', cases: 5000 },
  { color: '#fcbba1', cases: 10000 },
  { color: '#fc9272', cases: 20000 },
  { color: '#fb6a4a', cases: 50000 },
  { color: '#ef3b2c', cases: 100000 },
  { color: '#cb181d', cases: 200000 },
  { color: '#a50f15', cases: 500000 },
  { color: '#67000d', cases: 1000000 }
];
const mapOptions = {
  zoomSnap: 0.25,
  minZoom: 1
};
const tileLayerOptions = {
  attribution: attribution,
  maxZoom: 12,
  id: templateTileLayer,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: accessToken
};

export {
  urlCovidDataApi,
  urlTemplate,
  mapOptions,
  tileLayerOptions,
  mapContainerName,
  gradesCases
};
