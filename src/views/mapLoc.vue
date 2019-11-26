<template>
  <div>
    <a href="javascript:history.go(-1)">Back</a>
    <GmapMap
      :center='{lat:lat, lng:lng}'
      :zoom='11'
      :options='options'
      map-type-id='terrain'
      style='position: absolute; width: 100%; height: 100%; left: 0px; top: 0px'
    >
      <gmap-marker :position='{lat: lat, lng: lng}'></gmap-marker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'mapLoc',
  created() {
    this.setCoord();
  },
  data() {
    return {
      lat: '',
      lng: '',
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#ebe3cd',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#523735',
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#f5f1e6',
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#c9b2a6',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#dcd2be',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ae9e90',
              },
            ],
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#93817c',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#a5b076',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#447530',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f1e6',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#fdfcf8',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f8c967',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#e9bc62',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e98d58',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#db8555',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#806b63',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8f7d77',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#ebe3cd',
              },
            ],
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#b9d3c2',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#92998d',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async setCoord() {
      this.lat = parseFloat(this.$route.params.lat);
      this.lng = parseFloat(this.$route.params.lon);
      console.log(`${this.lat} ${this.lng}`);
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../styles/colors';
a{
  padding: 10px 20px 10px 20px;
  background-color: $blue;
  z-index: 100;
  position: absolute;
  left: 5%;
  top: 5%;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  transition: .3s;
  &:hover{
    transition: .3s;
    background-color: $darkBlue;
  }
}
</style>
