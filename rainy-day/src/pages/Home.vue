<template>
  <h1>여기에 비가 오나요?</h1>
  <main>
    <LocationWeatherCard
      v-for="item in location"
      :key="item"
      :name="item.name"
      :latitude="item.latitude"
      :longitude="item.longitude" />
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
      },
      () => {
        this.location.push({name: '기본위치', latitude: 37.552987017, longitude: 126.972591728})
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
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  margin: 5rem 0;
  text-align: center;
  font-size: 3.2rem;
}
main {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  .add {
    color: var(--main-color);
    padding-left: 2.2rem;
    background: url('/src/assets/images/add.svg') no-repeat left/2rem 2rem;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
