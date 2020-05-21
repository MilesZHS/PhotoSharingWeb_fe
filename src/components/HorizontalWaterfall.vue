<template>
  <div class="container">
    <div class="img-wrapper" v-for="(item, id) in imgList" :key="id">
      <img
        v-lazy="item.imgUrl"
        @click="showIntact(item)"
        height="180px"
        class="image"
        alt=""
      />
    </div>
    <show-intact v-if="isShowIntact" :imgItem="imgItem"></show-intact>
  </div>
</template>

<script>
import ShowIntact from "../components/home/ShowIntact.vue"
export default {
  props: ["imgList"],
  components: {
    ShowIntact
  },
  data() {
    return {
      isShowIntact: false,
      imgItem: {}
    }
  },
  methods: {
    showIntact(item) {
      // console.log(item)
      this.imgItem = item
      this.isShowIntact = true
    },
    closeIntact() {
      this.isShowIntact = false
    },
    mounted() {
      event.$on("closeIntact", this.closeIntact)
    },
    beforeDestroy() {
      event.$off("closeIntact", this.closeIntact)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.container::after {
  content: "";
  flex-grow: 999;
}
.img-wrapper {
  flex-grow: 1;
  overflow: hidden;
  margin: 4px;
  margin-left: 6px;
  margin-right: 6px;
}
.img-wrapper .image {
  height: 180px;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
}
</style>