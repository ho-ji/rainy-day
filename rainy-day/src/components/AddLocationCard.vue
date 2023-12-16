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
        @click="deleteName"></button>
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
    <div class="button-container">
      <button
        type="button"
        class="button-main-color">
        추가하기
      </button>
      <button
        type="button"
        class="button-sub-color">
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
    }
  },
  methods: {
    deleteName() {
      this.name = ''
    },
    handleSearch() {},
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
    padding: 0.5rem 2rem;
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
  .button-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 2rem;
  }
}
</style>
