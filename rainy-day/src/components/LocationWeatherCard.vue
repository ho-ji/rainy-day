<template lang="">
  <section class="card">
    <h2>
      {{ name }} <span>{{ address }}</span>
    </h2>
    <div class="info">
      <div v-if="isError">ERROR</div>
      <ul
        class="list"
        v-else>
        <WeatherListItem
          v-for="value in info"
          :key="value.id"
          :info="value" />
      </ul>
      <div
        ref="map"
        class="map"></div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import WeatherListItem from './WeatherListItem.vue'
import {v4 as uuidv4} from 'uuid'
export default {
  name: 'LocationWeatherCard',
  components: {
    WeatherListItem,
  },
  data() {
    return {
      map: null,
      marker: null,
      address: '',
      info: [],
      isError: false,
    }
  },
  props: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    this.initMap()
    this.initWeather()
  },
  methods: {
    initMap() {
      const container = this.$refs.map
      const options = {
        center: new window.naver.maps.LatLng(this.latitude, this.longitude),
        zoom: 15,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        draggable: false,
        keyboardShortcuts: false,
        scrollWheel: false,
      }
      this.map = new window.naver.maps.Map(container, options)
      this.markers = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(this.latitude, this.longitude),
        map: this.map,
      })
      this.getAddress()
    },
    getAddress() {
      window.naver.maps.Service.reverseGeocode(
        {
          coords: new window.naver.maps.LatLng(this.latitude, this.longitude),
          orders: window.naver.maps.Service.OrderType.ADDR,
        },
        (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) return
          const result = response.v2.results[0].region
          for (const key in result) {
            if (key !== 'area0') {
              this.address += result[key].name + ' '
            }
          }
        }
      )
    },
    initWeather() {
      const serviceKey = 'UWkURKHp6eGygDVrRnYP2wroHOWGo2zCBd7phHPGGtlulhllM321P03rrBPg2gju%2BxQFrMPyIIbwnaNMV0%2BMDA%3D%3D'
      const {x, y} = this.convertXY()
      const {time, date} = this.getBaseDate()
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${x}&ny=${y}`
      axios
        .get(url)
        .then((response) => {
          const data = response.data.response.body.items.item
          const result = data.filter((i) => i.category === 'SKY' || i.category === 'PTY' || i.category === 'POP' || i.category === 'TMP')
          let dateText = ['글피', '모레', '내일']
          //TMP SKY PTY POP 순서
          for (let i = 0; i < result.length - 4; i += 4) {
            const temp = {}
            temp.weather = result[i + 2].fcstValue === '0' ? '-' + result[i + 1].fcstValue : result[i + 2].fcstValue
            temp.temp = result[i].fcstValue
            temp.rainPercent = result[i + 3].fcstValue
            temp.time = parseInt(result[i].fcstTime.slice(0, 2))
            temp.isNight = temp.time < 7 || temp.time > 17
            temp.time += '시'
            if (temp.time === '0시') temp.time = dateText.pop()
            temp.id = uuidv4()
            this.info.push(temp)
          }
        })
        .catch(() => {
          this.isError = true
        })
    },
    convertXY() {
      const RE = 6371.00877 // 지구 반경(km)
      const GRID = 5.0 // 격자 간격(km)
      const SLAT1 = 30.0 // 투영 위도1(degree)
      const SLAT2 = 60.0 // 투영 위도2(degree)
      const OLON = 126.0 // 기준점 경도(degree)
      const OLAT = 38.0 // 기준점 위도(degree)
      const XO = 43 // 기준점 X좌표(GRID)
      const YO = 136

      const DEGRAD = Math.PI / 180.0

      const re = RE / GRID
      const slat1 = SLAT1 * DEGRAD
      const slat2 = SLAT2 * DEGRAD
      const olon = OLON * DEGRAD
      const olat = OLAT * DEGRAD

      let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
      let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
      sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn
      let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
      ro = (re * sf) / Math.pow(ro, sn)
      const rs = {}
      let ra = Math.tan(Math.PI * 0.25 + this.latitude * DEGRAD * 0.5)
      ra = (re * sf) / Math.pow(ra, sn)
      let theta = this.longitude * DEGRAD - olon
      if (theta > Math.PI) theta -= 2.0 * Math.PI
      if (theta < -Math.PI) theta += 2.0 * Math.PI
      theta *= sn
      rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5)
      rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)
      return rs
    },
    getBaseDate() {
      const today = new Date()
      let date = today.getFullYear() + String(today.getMonth() + 1).padStart(2, 0)
      let time = ''
      if (today.getHours() <= 2 && today.getMinutes() < 15) {
        date += String(today.getDate() - 1).padStart(2, 0)
        time = '2300'
      } else {
        date += String(today.getDate()).padStart(2, 0)
        if (today.getMinutes() < 15) time = String(3 * parseInt(today.getHours() / 3) - 1).padStart(2, 0) + '00'
        else time = String(3 * parseInt((today.getHours() + 1) / 3) - 1).padStart(2, 0) + '00'
      }
      return {date, time}
    },
  },
}
</script>
<style lang="scss" scoped>
section {
  height: 38rem;
  h2 {
    margin-bottom: 3rem;
    font-size: 2rem;
    > span {
      margin-left: 1rem;
      font-size: 1.6rem;
      color: #666;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    .list {
      display: flex;
      width: 100%;
      border: 1px solid #eee;
      border-top: 2px solid var(--main-color);
      border-radius: 3px;
      overflow-x: scroll;
    }
    .map {
      flex-shrink: 0;
      width: 30rem;
      height: 30rem;
    }
  }
}
</style>
