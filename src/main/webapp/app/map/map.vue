<template>
  <div>
    <v-row class="flex" justify="center">
      <v-card :ripple="false" class="portrait" @contextmenu="showMenu($event)">
        <div @click="showPopup($event)" id="map"></div>
      </v-card>
    </v-row>
    <v-menu v-model="showMenuModel" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-list-item @click="onMenuAddHandler()">
          <v-list-item-title>Add</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-list id="popup">
      <v-list-item>
        <v-list-item-title>Coord: {{ lonLat }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
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
import Draw from 'ol/interaction/Draw';
import Point from 'ol';

let map;
let draw;
let source;
let feature;
export default {
  async mounted() {
    await this.initiateMap();
  },
  data() {
    return {
      showMenuModel: false,
      x: 0,
      y: 0,
      xpop: 0,
      ypop: 0,
      lonLat: [0, 0],
    };
  },
  methods: {
    initiateMap: function () {
      // create vector layer
      source = new VectorSource();
      let vector = new VectorLayer({
        source: source,
      });
      // create title layer
      let raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer
      map = new Map({
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
      map.on('click', function (event) {
        feature = map.getFeaturesAtPixel(event.pixel)[0];
      });
    },
    onMenuAddHandler: function () {
      map.once('click', evt => {
        console.log(evt.pixel);
        console.log(evt.coordinate);
      });
      draw = new Draw({
        source: source,
        type: 'Point',
      });
      map.getInteractions().push(draw);

      map.once('click', evt => {
        map.getInteractions().remove(draw);
      });
    },
    showMenu(e) {
      e.preventDefault();
      this.showMenuModel = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenuModel = true;
      });
      this.showPopupModel = false;
    },
    showPopup: function (event) {
      console.log('clicked map');
      if (feature) {
        this.showPopupModel = true;
        this.lonLat = feature.getGeometry().getCoordinates();

        this.xpop = map.getPixelFromCoordinate(this.lonLat)[0];
        this.ypop = map.getPixelFromCoordinate(this.lonLat)[1];
      } else {
        console.log('clicked somewhere else');
      }
    },
  },
};
</script>
<style>
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 500px;
  width: 100%;
}

v-card {
  /*position: absolute;*/
  margin: 0;
  padding: 0;
  height: 500px;
  width: 99%;
}

v-row {
  max-width: 100%;
  width: 100%;
}

.portrait.v-card {
  /*margin: 0 auto;*/
  /*max-width: 600px;*/
  width: 100%;
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
