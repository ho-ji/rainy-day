<template>
  <li>
    <div class="time">
      <span ref="time">
        {{ info.time }}
      </span>
    </div>
    <p
      ref="weather"
      class="weather">
      <span class="a11y-hidden">{{ weatherText }}</span>
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
    if (this.info.time.substr(-1) !== '시') time.classList.add('date')
  },
}
</script>
<style lang="scss" scoped>
li {
  width: 6rem;
  flex-shrink: 0;
  text-align: center;
  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .date {
    background-color: var(--main-color);
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
  }
  .time {
    border-bottom: 1px solid #eee;
    padding: 1rem 0;
  }
  .weather {
    display: inline-block;
    background-image: url('/src/assets/images/weather.png');
    width: 5rem;
    height: 5rem;
    background-size: cover;
    margin-top: 2rem;
  }
  .sunny {
    background-position: 0 0;
    background-repeat: no-repeat;
  }
  .sunny-night {
    background-position: -100% 0;
  }
  .most-cloudy {
    background-position: -200% 0;
  }
  .most-cloudy-night {
    background-position: -300% 0;
  }
  .cloudy {
    background-position: -400% 0;
  }
  .rainy {
    background-position: -500% 0;
  }
  .rain-snow {
    background-position: -600% 0;
  }
  .snow {
    background-position: -700% 0;
  }
  .shower {
    background-position: -800% 0;
  }
  .shower-night {
    background-position: -900% 0;
  }
  .rain-percent {
    color: var(--main-color);
  }
}
</style>
