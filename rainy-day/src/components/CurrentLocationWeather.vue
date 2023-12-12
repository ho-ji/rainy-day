<template lang="">
  <section>
    <h2>
      {{ title }} <span>{{ address }}</span>
    </h2>
    <div id="info">
      <table>
        weather info
      </table>
      <div id="map"></div>
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
    title: String,
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    if (window.naver && window.naver.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=afcltvotp4&submodules=geocoder'
      script.onload = () => (window.naver.maps.onJSContentLoaded = this.initMap)
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById('map')
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
  width: 100rem;
  height: 50rem;
  background-color: red;
}
#info {
  display: flex;
  justify-content: space-between;
}
#map {
  width: 50rem;
  height: 50rem;
}
</style>
