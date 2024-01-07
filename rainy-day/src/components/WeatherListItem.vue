<template>
  <li>
    <div class="time">
      <span ref="time">
        {{ info.time === '0시' ? info.date : info.time }}
      </span>
    </div>
    <p
      ref="weather"
      class="weather">
      <span class="tooltip">{{ weatherText }}</span>
    </p>
    <p>{{ info.temp }}°</p>
    <p class="rain-percent">{{ info.rainPercent }}%</p>
  </li>
</template>
<script>
export default {
  name: 'WeatherListItem',
  props: {
    info: Object,
  },
  data() {
    return {
      weatherText: '',
    }
  },
  methods: {
    weatherClass() {
      switch (this.info.weather) {
        case '-4': {
          this.weatherText = '흐림'
          return 'cloudy'
        }
        case '-3': {
          this.weatherText = '구름많음'
          return this.info.isNight ? 'most-cloudy-night' : 'most-cloudy'
        }
        case '-1': {
          this.weatherText = '맑음'
          return this.info.isNight ? 'sunny-night' : 'sunny'
        }
        case '1': {
          this.weatherText = '비'
          return 'rainy'
        }
        case '2': {
          this.weatherText = '비 또는 눈'
          return 'rain-snow'
        }
        case '3': {
          this.weatherText = '눈'
          return 'snowy'
        }
        case '4': {
          this.weatherText = '소나기'
          return this.info.isNight ? 'shower-night' : 'shower'
        }
        default:
          return ''
      }
    },
  },
  mounted() {
    const weather = this.$refs.weather
    weather.classList.add(this.weatherClass())

    const time = this.$refs.time
    if (this.info.time === '0시') time.classList.add('date')
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/components/weatherListItem.scss';
</style>
