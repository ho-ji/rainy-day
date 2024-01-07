<template>
  <h1>여기에 비가 오나요?</h1>
  <main>
    <LocationWeatherCard
      v-for="(item, index) in location"
      :key="item"
      :name="item.name"
      :latitude="item.latitude"
      :longitude="item.longitude"
      :index="index"
      @deleteLocation="deleteLoction" />
    <button
      v-if="!isShowCard"
      type="button"
      @click="showCard"
      class="add">
      장소 추가
    </button>
    <AddLocationCard
      v-else
      @close="showCard"
      @addLocation="addLocation" />
  </main>
  <Footer />
</template>
<script>
import LocationWeatherCard from '@/components/LocationWeatherCard.vue'
import AddLocationCard from '@/components/AddLocationCard.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Home',
  components: {
    LocationWeatherCard,
    AddLocationCard,
    Footer,
  },
  data() {
    return {
      location: [],
      isShowCard: false,
    }
  },
  created() {
    if (!navigator.geolocation) {
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.location.push({name: '현위치', latitude, longitude})
        const places = JSON.parse(localStorage.getItem('weatherPlaces'))
        if (places) this.location.push(...places)
      },
      () => {
        this.location.push({name: '기본위치', latitude: 37.552987017, longitude: 126.972591728})
        const places = JSON.parse(localStorage.getItem('weatherPlaces'))
        if (places) this.location.push(...places)
      }
    )
  },
  methods: {
    showCard() {
      this.isShowCard = !this.isShowCard
    },
    addLocation(name, latitude, longitude) {
      this.location.push({name, latitude, longitude})
      this.isShowCard = false
      localStorage.setItem('weatherPlaces', JSON.stringify(this.location.slice(1)))
    },
    deleteLoction(index) {
      this.location.splice(index, 1)
      localStorage.setItem('weatherPlaces', JSON.stringify(this.location.slice(1)))
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/pages/home.scss';
</style>
