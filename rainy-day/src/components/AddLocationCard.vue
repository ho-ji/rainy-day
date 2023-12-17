<template>
  <section class="card">
    <h3>장소 추가하기</h3>
    <div class="input-container">
      <label for="name"> 장소이름 </label>
      <input
        type="text"
        v-model="name"
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
    deleteName() {
      this.name = ''
    },
    closeCard() {
      this.$emit('show')
    },
    handleSearch() {
      const wrapper = this.$refs.wrapper
      this.address = ''
      this.zipcode = ''
      new window.daum.Postcode({
        width: 600,
        oncomplete: (data) => {
          this.address = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress
          this.zipcode = data.zonecode
        },
      }).embed(wrapper)
    },
    handleAddClick() {
      window.naver.maps.Service.geocode(
        {
          query: this.address,
        },
        (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) return
          const position = response.v2.addresses[0]
          this.$emit('addLocation', this.name, Number(position.y), Number(position.x))
        }
      )
    },
  },
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .input-container {
    display: flex;
    align-items: center;
    position: relative;
    > label {
      width: 6rem;
      margin-right: 1rem;
      flex-shrink: 0;
    }
  }
  #name {
    width: 100%;
    border: 1px solid #d4d4d4;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem;
    border-radius: 3px;
  }
  .address {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    border: 1px solid #d4d4d4;
    background-color: #f4f4f4;
  }
  .delete {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.8rem;
    height: 1.8rem;
    background: url('/src/assets/images/delete.svg') center/ 1.8rem 1.8rem no-repeat;
  }
  #zipcode {
    width: 10rem;
    margin-left: 1rem;
  }
  > section {
    margin: 0 auto;
  }
  .button-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 2rem;
  }
}
</style>
