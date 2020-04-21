<template>
  <div>
    <header-nav>
      <div id="identity-wrapper" v-if="isLogin">
        <div id="avatar-wrapper">
          <img :src="avatar" id="avatar" alt="">
        </div>
        <div id="username">
          {{userName}}
        </div>
      </div>
    </header-nav>
    <section id="carousel">
      <div class="block">
        <el-carousel :height="carouselHeight">
          <el-carousel-item v-for="(item, id) in bannerList" :key="id">
            <img
              :src="item.imgUrl"
              alt=""
              :height="carouselHeight"
              class="carousel-img"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      isLogin: false,
      userName: '18560677018',
      avatar: require('../../assets/logo.png'),
      screenWidth: "",
      bannerList: [
        {
          id: "1",
          imgUrl: require("../../assets/image/DSC02318.jpg")
        },
        {
          id: "2",
          imgUrl: require("../../assets/image/DSC02318.jpg")
        },
        {
          id: "3",
          imgUrl: require("../../assets/image/DSC02318.jpg")
        }
      ]
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    carouselHeight: function() {
      console.log(this.screenWidth)
      return this.screenWidth > 768 ? "800px" : "300px"
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
    }
  }
}
</script>

<style scoped>
#identity-wrapper{
  width: 100%;
  height: 60px;
  line-height: 60px;
}
#avatar-wrapper{
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
#avatar{
  width: 36px;
  height: 36px;
  object-fit: cover;
  vertical-align: baseline;
}
#username{
  height: 60px;
  line-height: 60px;
  display: inline-block;
  padding-left: 10px;
  color: white;
}
.carousel-img {
  width: 100%;
  object-fit: cover;
}
.swiper-container {
  --swiper-theme-color: white; /* 设置Swiper风格 */
  --swiper-navigation-color: white; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
}

#carousel {
  margin-top: -80px;
}
@media screen and (max-width: 768px) {
  #carousel {
    margin-top: 0;
  }
  .swiper-container {
    --swiper-theme-color: #ff1b89; /* 设置Swiper风格 */
    --swiper-navigation-color: #ff1b89; /* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px; /* 设置按钮大小 */
  }
  #username{
    color: #848484;
  }
}
</style>
