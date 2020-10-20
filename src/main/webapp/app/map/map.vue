<template>
  <div>
    <v-row class="flex" justify="center">
      <v-card :ripple="false" class="portrait" @contextmenu="show">
        <div id="map"></div>
      </v-card>
    </v-row>

    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
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

let map;
let draw;
let source;
export default {
  async mounted() {
    await this.initiateMap();
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      coord: '',
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
    },
    onMenuAddHandler: function () {
      map.once('click', evt => {
        // this.onContextHandler(evt);
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
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
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
