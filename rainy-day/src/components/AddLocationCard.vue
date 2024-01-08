<template>
  <section
    class="card location"
    ref="add">
    <h3>장소 추가하기</h3>
    <div class="input-container">
      <label for="name"> 장소이름 </label>
      <input
        type="text"
        :value="name"
        @input="name = $event.target.value"
        id="name" />
      <button
        class="delete"
        v-if="name"
        @click="deleteName">
        <span class="a11y-hidden">쓴내용 삭제</span>
      </button>
    </div>
    <div class="input-container">
      <label for="zipcode">주소</label>
      <button
        @click="handleSearch"
        class="button-main-color">
        검색
      </button>
      <input
        type="text"
        v-model="zipcode"
        id="zipcode"
        class="address"
        disabled />
    </div>
    <label
      class="a11y-hidden"
      for="address"
      >주소</label
    >
    <input
      type="text"
      v-model="address"
      id="address"
      class="address"
      disabled />
    <section ref="wrapper"></section>
    <div class="button-container">
      <button
        type="button"
        class="button-main-color"
        @click="handleAddClick">
        추가하기
      </button>
      <button
        type="button"
        class="button-sub-color"
        @click="closeCard">
        닫기
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'AddLocationModal',
  data() {
    return {
      name: '',
      zipcode: '',
      address: '',
    }
  },
  methods: {
    moveScroll() {
      const add = this.$refs.add
      window.scrollTo({
        top: add.offsetTop - 20,
        behavior: 'smooth',
      })
    },
    deleteName() {
      this.name = ''
    },
    closeCard() {
      this.$emit('close')
    },
    handleSearch() {
      const wrapper = this.$refs.wrapper
      this.address = ''
      this.zipcode = ''
      new window.daum.Postcode({
        width: 400,
        oncomplete: (data) => {
          this.address = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress
          this.zipcode = data.zonecode
        },
      }).embed(wrapper)
      this.moveScroll()
    },
    handleAddClick() {
      if (this.address === '') {
        alert('주소를 추가해주세요')
        return
      }
      window.naver.maps.Service.geocode(
        {
          query: this.address,
        },
        (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) return
          if (response.v2.meta.totalCount === 0) {
            alert('잘못된 주소입니다. 다른 주소로 검색해주세요.')
            return
          }
          const position = response.v2.addresses[0]
          this.$emit('addLocation', this.name, Number(position.y), Number(position.x))
        }
      )
    },
  },
  mounted() {
    this.moveScroll()
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/components/addLocationCard.scss';
</style>
