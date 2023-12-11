<template lang="">
  <section>
    <h2>
      {{ title }} <span>{{ address }}</span>
    </h2>
    <div id="info">
      <table>
        weather info
      </table>
      <div
        ref="map"
        id="map"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CurrentLocationWeather',

  data() {
    return {
      map: null,
      markers: [],
      address: '',
    }
  },
  props: {
    title: String,
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    if (!this.latitude || !this.longitude) return null
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=15c0e35831cafc8c9883fd79e26612d8&autoload=false&libraries=services'
      document.head.appendChild(script)
      script.onload = () => window.kakao.maps.load(this.initMap)
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(this.latitude, this.longitude),
        level: 6,
      }
      this.map = new window.kakao.maps.Map(container, options)
      this.map.setZoomable(false)
      this.map.setDraggable(false)
      this.displayMarker([[this.latitude, this.longitude]])
      this.getAddress()
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null))
      }

      const positions = markerPositions.map((position) => new window.kakao.maps.LatLng(...position))

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new window.kakao.maps.Marker({
              map: this.map,
              position,
            })
        )

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new window.kakao.maps.LatLngBounds())

        this.map.setBounds(bounds)
      }
    },
    getAddress() {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.coord2RegionCode(this.longitude, this.latitude, (result) => {
        this.address = result[0].address_name
      })
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
