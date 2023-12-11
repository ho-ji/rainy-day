<template>
  <dialog
    open
    @click.self="handleOutSideClick">
    <div class="modal">
      <h3>장소 추가하기</h3>
      <label>
        장소 이름
        <input
          type="text"
          v-model="name" />
        <button
          v-if="name"
          id="close"
          @click="handleDeleteClick"></button>
      </label>
    </div>
  </dialog>
</template>
<script>
export default {
  name: 'AddLocationModal',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    handleOutSideClick() {
      this.$emit('closeModal')
    },
    handleDeleteClick() {
      this.name = ''
    },
  },
}
</script>
<style lang="scss" scoped>
dialog {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal {
  width: 40rem;
  margin: 0 auto;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  background-color: white;
  h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  label {
    position: relative;
    > input {
      width: 28rem;
      margin-left: 2rem;
      border-bottom: 1px solid #bcbcbc;
      padding-right: 2rem;
    }
    > button {
      position: absolute;
      right: 0;
      top: 0.3rem;
      width: 1.8rem;
      height: 1.8rem;
      background: url('/src/assets/images/icon-close.svg') center/ 1.8rem 1.8rem no-repeat;
    }
  }
}
</style>
