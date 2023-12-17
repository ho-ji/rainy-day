<template lang="">
  <section class="card">
    <h2>
      {{ name }} <span>{{ address }}</span>
    </h2>
    <div class="info">
      <table>
        weather info
      </table>
      <div
        ref="map"
        class="map"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CurrentLocationWeather',

  data() {
    return {
      map: null,
      marker: null,
      address: '',
    }
  },
  props: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    this.initMap()
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
  },
}
</script>
<style lang="scss" scoped>
section {
  height: 40rem;
  h2 {
    margin-bottom: 2rem;
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
  }
  .map {
    width: 30rem;
    height: 30rem;
  }
}
</style>
