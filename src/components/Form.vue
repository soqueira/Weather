<template>
  <div class="container" >
    <div class="bg" v-for='(climate, i) in climates' :key="i">
      <transition name='fadeBg'>
    <div class="climateBg" v-show="climate.name === weatherMain"
    :style="{ backgroundImage: 'url(' + climate.bgImg + ')' }"></div>
      </transition>
    </div>
    <div class="weather weather-display">
      <div class="weather-main" v-if='country'>
        <p class="temp">{{Celsius}}°</p>
        <div class="dates">
        <p class="city-name">{{city}}</p>
        </div>
        <div class="climates">
          <div v-for='(climate, i) in climates' :key="i">
            <div v-if="climate.name === weatherMain">
            <p>{{climate.name}}</p>
            <img class="weather-img" :src="climate.img" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather weather-search">
      <div class="weather-form">
        <input v-model='city' type="text" id="city" placeholder="Enter Your city" />
        <button class="btn" @click.prevent.stop='getWeather()'>Search</button>
      </div>
      <div class="map">
        <router-link :to="{name: 'Gmap', params:{
              cityName: city,
              lon: lon,
              lat: lat
            }
          }">
          See {{city}} map here
          <svg class="arrow" x="0px" y="0px" viewBox="0 0 477.175 477.175">
            <g>
              <path
                d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,
                0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3
                ,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,
                360.731,229.075z"
              />
            </g>
          </svg>
        </router-link>
      </div>
      <div class="weather-details">
        <p class="details">Weather details</p>
        <div class="col1">
          <p>Humidity</p>
          <p>Wind</p>
          <p>Rain</p>
          <p>Pressure</p>
        </div>
        <div class="col2">
          <p>{{weatherData.main.humidity}} %</p>
          <p>{{weatherData.wind.speed}} m/s</p>
          <p v-if='weatherData.rain'>{{weatherData.rain['3h']}} mm</p>
          <p v-if='!weatherData.rain'>0 mm</p>
          <p>{{weatherData.main.pressure}} hpa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Form',
  created() {
    this.getWeather();
  },
  data() {
    return {
      city: 'Frutal',
      country: '',
      errorLog: '',
      weatherData: [],
      loader: false,
      climates: [
        {
          name: 'Clear',
          img:
            'https://i.imgur.com/pffqJGC.png',
          bgImg: 'https://cardinalwxservice.com/wp-content/uploads/2019/04/maxresdefault-3.jpg',
        },
        {
          name: 'Sunny',
          img:
            'https://i.imgur.com/eVRhdy1.png',
          bgImg: 'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/download/sunny-valley-3840x2160.jpg',
        },
        {
          name: 'Drizzle',
          img:
            'https://i.imgur.com/Ge8ZwHe.png',
          bgImg: 'https://c.wallhere.com/photos/eb/69/sun_wet_water_rain_clouds_cloudy_portoalegre_rainy-1121947.jpg!d',
        },
        {
          name: 'Clouds',
          img:
            'https://i.imgur.com/xmTGTlB.png',
          bgImg: 'https://rachelchoflowers.com/wp-content/uploads/2019/09/May-Gray-Got-You-Down-1.jpg',
        },
        {
          name: 'Rain',
          img:
            'https://i.imgur.com/oQ1cDtG.png',
          bgImg: 'http://www.intermediachannel.it/wp-content/uploads/2014/07/Maltempo-Imc.jpg',
        },
        {
          name: 'Thunderstorm',
          img:
            'https://i.imgur.com/dbYAIXB.png',
          bgImg: 'https://hdqwalls.com/download/lightning-storm-4k-ei-2560x1440.jpg',
        },
        {
          name: 'Haze',
          img:
            'https://i.imgur.com/k6aaWMj.png',
          bgImg: 'https://get.wallhere.com/photo/forest-sky-clouds-morning-mist-atmosphere-noisy-haze-cloud-fog-mountain-weather-2560x1440-px-atmospheric-phenomenon-atmosphere-of-earth-516383.jpg',
        },
        {
          name: 'Fog',
          img:
            'https://i.imgur.com/k6aaWMj.png',
          bgImg: 'https://wallpaperplay.com/walls/full/0/d/1/62615.jpg',
        },
      ],
      weatherMain: '',
      lon: '',
      lat: '',
    };
  },
  methods: {
    getWeather() {
      this.loader = true;
      this.errorLog = '';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=e09d7d063af31baf104769e9d39409b0`;
      axios
        .get(url)
        .then((res) => {
          this.weatherData = res.data;
          // only to check if the data exist
          this.country = this.weatherData.sys.country;
          this.weatherMain = this.weatherData.weather[0].main;
          // uppercase the first letter
          this.city = this.city.charAt(0).toUpperCase() + this.city.slice(1);
          this.lon = this.weatherData.coord.lon;
          this.lat = this.weatherData.coord.lat;
        })
        .catch((error) => {
          this.errorLog = error;
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
  computed: {
    // Kelvin to Celsius
    Celsius() {
      return Math.round(this.weatherData.main.temp - 273.15);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/form";
 .fadeBg-enter-active,
        .fadeBg-leave-active {
            transition-property: opacity;
            transition-duration: .25s;
        }

        .fadeBg-enter-active {
            transition-delay: .25s;
        }

        .fadeBg-enter,
        .fadeBg-leave-active {
            opacity: 0
        }
</style>
