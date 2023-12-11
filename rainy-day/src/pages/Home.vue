<template>
  <h1>여기에 비가 오나요?</h1>
  <main>
    <CurrentLocationWeather
      v-for="item in location"
      :key="item"
      :title="item.title"
      :latitude="item.latitude"
      :longitude="item.longitude" />
    <button type="button">장소 추가</button>
  </main>
</template>
<script>
import CurrentLocationWeather from '@/components/CurrentLocationWeather.vue'
export default {
  name: 'Home',
  components: {
    CurrentLocationWeather,
  },
  data() {
    return {
      location: [],
    }
  },
  created() {
    if (!('geolocation' in navigator)) {
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      this.location.push({title: '현위치', latitude, longitude})
    })
  },
}
</script>
<style lang="scss" scoped>
h1 {
  margin-top: 5rem;
  text-align: center;
  font-size: 3.2rem;
}
main {
  margin: 0 10rem;
}
</style>
