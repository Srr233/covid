const urlCovidDataApi = 'https://corona.lmao.ninja/v2/countries';
const accessToken = 'pk.eyJ1IjoiZG1pdHJ5MjAyIiwiYSI6ImNraXJreXc5OTBvcGwzMWwzeGJ3dXVrbmsifQ.cv6TNVdCaUOH5wqHSuwAMw';
const urlTemplate = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapContainerName = 'interactive-map';
const templateTileLayer = 'mapbox/light-v10';

const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 2.5,
  minZoom: 2.5
};
const tileLayerOptions = {
  attribution: attribution,
  maxZoom: 18,
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
  mapContainerName
};
