<template>
  <div @click="getCoordinatesOnClick" id="map"></div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<script>
import 'ol/ol.css';
// This is library of openlayer for handle map
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
export default {
  async mounted() {
    await this.initiateMap();
  },
  methods: {
    initiateMap() {
      // create vector layer
      var source = new VectorSource();
      var vector = new VectorLayer({
        source: source,
      });
      // create title layer
      var raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer
      var map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: 'degrees',
          }),
        ]),
        target: 'map',
        layers: [raster, vector],
        view: new View({
          projection: 'EPSG:4326',
          center: [0, 0],
          zoom: 2,
        }),
      });
    },
    // localmap.on('singleclick', function (evt) {
    //     console.log(evt.coordinate);
    //
    //     // convert coordinate to EPSG-4326
    //     console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    // });
    // getCoordinatesOnClick() {
    //     console.log(evt.coordinate);
    //     // console.log(map.getEventCoordinate.)
    // }
  },
};
</script>
<style>
/*@import 'ol/ol.css';*/
/*@import './vuetify/dist/vuetify.min.css';*/
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 500px;
  width: 99%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
