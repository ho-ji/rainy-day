<template>
  <h1>여기에 비가 오나요?</h1>
  <main>
    <CurrentLocationWeather
      v-for="item in location"
      :key="item"
      :title="item.title"
      :latitude="item.latitude"
      :longitude="item.longitude" />
    <button
      type="button"
      @click="handleShowModal">
      장소 추가
    </button>
  </main>
  <AddLocationModal
    v-if="isShowModal"
    @closeModal="handleShowModal" />
</template>
<script>
import CurrentLocationWeather from '@/components/CurrentLocationWeather.vue'
import AddLocationModal from '@/components/AddLocationModal.vue'
export default {
  name: 'Home',
  components: {
    CurrentLocationWeather,
    AddLocationModal,
  },
  data() {
    return {
      location: [],
      isShowModal: false,
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
        this.location.push({title: '현위치', latitude, longitude})
      },
      () => {
        this.location.push({title: '기본위치', latitude: 37.552987017, longitude: 126.972591728})
      }
    )
  },
  methods: {
    handleShowModal() {
      this.isShowModal = !this.isShowModal
    },
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
