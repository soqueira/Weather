<template>
  <div class="container">
    <!-- background change transition -->
    <div class="bg" v-for='(climate, i) in climates' :key="i">
      <transition name='fadeBg'>
    <div class="climateBg" v-show="city && climate.name === weather.main"
    :style="{ backgroundImage: 'url(' + climate.bgImg + ')' }"></div>
      </transition>
    </div>

    <div class="weather weather-display">
      <div class="error" v-if='errorLog'>City Not Found</div>
    <template v-if="city && !errorLog">
      <div class="weather-main">
        <p class="temp">{{Math.round(weather.celsius) + '°'}}</p>
        <div class="dates">
        <p class="city-name">{{city}}</p>
        </div>
        <div class="climates">
          <div v-for='(climate, i) in climates' :key="i">
            <div v-if="city && climate.name === weather.main">
            <p>{{weather.description}}</p>
            <img class="weather-img" :src="climate.img" alt="">
            </div>
          </div>
        </div>
      </div>
    </template>
    </div>
    <div class="weather weather-search">
      <div class="weather-form">
        <input autocomplete="off" v-model='city'
        type="text" id="city" placeholder="Enter Your city">
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
        <template v-if="city && !errorLog">
        <div class="col2">
          <p>{{weather.humidity}} %</p>
          <p>{{weather.speed}} m/s</p>
          <p>{{weather.rain}} mm</p>
          <p>{{weather.pressure}} hpa</p>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Form',
  created() {
    this.initLocalStorage();
  },
  data() {
    return {
      city: '',
      errorLog: false,
      weatherData: [],
      lon: '',
      lat: '',
      weather: {
        main: '',
        description: '',
        humidity: '',
        rain: '',
        pressure: '',
        celsius: '',
        speed: '',
      },
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
          bgImg: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Lightning_Pritzerbe_01_%28MK%29.jpg',
        },
        {
          name: 'Haze',
          img:
            'https://i.imgur.com/k6aaWMj.png',
          bgImg: 'https://get.wallhere.com/photo/forest-sky-clouds-morning-mist-atmosphere-noisy-haze-cloud-fog-mountain-weather-2560x1440-px-atmospheric-phenomenon-atmosphere-of-earth-516383.jpg',
        },
        {
          name: 'Mist',
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
        {
          name: 'Error',
          img: '',
          bgImg: '',
        },
      ],
    };
  },
  methods: {
    getWeather() {
      this.getDataStorage();
      if (!this.city) return;
      this.errorLog = false;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=e09d7d063af31baf104769e9d39409b0`;
      axios
        .get(url)
        .then((res) => {
          this.weatherData = res.data;
        })
        .then(() => {
          this.weather = Object.assign({
            main: this.weatherData.weather[0].main,
            description: this.weatherData.weather[0].description,
            humidity: this.weatherData.main.humidity,
            pressure: this.weatherData.main.pressure,
            speed: this.weatherData.wind.speed,
            // kelvin to celsius
            celsius: this.weatherData.main.temp - 273.15,
          });
          // check if rain millimeter exist on JSON
          if (this.weatherData.rain === undefined) {
            this.weather.rain = 0;
          } else if (this.weatherData.rain['3h'] === undefined) {
            this.weather.rain = this.weatherData.rain['1h'];
          } else {
            this.weather.rain = this.weatherData.rain['3h'];
          }
        })
        .catch((error) => {
          this.errorLog = true;
          this.weather.name = error;
        })
        .finally(() => {
          this.upperFirstCase();
          this.setCoord();
        });
    },
    setCoord() {
      this.lon = this.weatherData.coord.lon;
      this.lat = this.weatherData.coord.lat;
    },
    upperFirstCase() {
      // this.description = this.weatherData.weather[0].description;
      // uppercase the first letter
      this.city = this.city.charAt(0).toUpperCase() + this.city.slice(1);
      this.weather.description = this.weather.description
        .charAt(0).toUpperCase() + this.weather.description.slice(1);
    },
    getDataStorage() {
      const dataStorage = {
        city: this.city,
      };
      localStorage.setItem('cityStorage', JSON.stringify(dataStorage));
    },
    initLocalStorage() {
      const localData = JSON.parse(localStorage.getItem('cityStorage'));
      if (localData === null) {
        this.randomCity();
        return;
      }
      this.city = localData.city;
      this.getWeather();
    },
    randomCity() {
      const cities = ['Paris', 'Mumbai', 'Vienna', 'Dubai', 'Kyoto', 'Frutal', 'Rio de Janeiro', 'São Paulo', 'Guarulhos'];
      this.city = cities[Math.floor(Math.random() * cities.length)];
      this.getWeather();
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
