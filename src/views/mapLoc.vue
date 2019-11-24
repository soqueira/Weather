<template>
  <div>{{lat}} {{lon}}</div>
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
      lon: '',
    };
  },
  methods: {
    setCoord() {
      this.lat = this.$route.params.lat;
      this.lon = this.$route.params.lon;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
