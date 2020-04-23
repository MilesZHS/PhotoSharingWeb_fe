<template>
  <div>
    <section id="carousel">
      <div class="block">
        <el-carousel :height="carouselHeight + 'px'" :interval="5000">
          <el-carousel-item v-for="(item, id) in bannerList" :key="id">
            <img
              :src="item.imgUrl"
              alt=""
              :height="carouselHeight"
              class="carousel-img"
            />
            <div class="mask">
              <div class="icon-content">
                <div
                  id="liulan"
                  :class="{ active: item.isBrowse }"
                  @click="addBrowse(item)"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.browse"
                    placement="bottom"
                  >
                    <span class="iconfont icon-tubiao_liulan"></span>
                  </el-tooltip>
                </div>
                <div
                  id="download"
                  :class="{ active: item.isDownload }"
                  @click="addDownload(item)"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.download"
                    placement="bottom"
                  >
                    <span class="iconfont icon-tubiao_xiazai"></span>
                  </el-tooltip>
                </div>
                <div
                  id="dianzan"
                  :class="{ active: item.isLike }"
                  @click="addLike(item)"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.like"
                    placement="bottom"
                  >
                    <span class="iconfont icon-tubiao_dianzan"></span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: "",
      bannerList: [
        {
          id: "1",
          imgUrl: require("../assets/image/DSC02318.jpg"),
          browse: "20",
          like: "20",
          download: "30",
          isBrowse: false,
          isLike: false,
          isDownload: false
        },
        {
          id: "2",
          imgUrl: require("../assets/image/DSC02318.jpg"),
          browse: "20",
          like: "20",
          download: "30",
          isBrowse: false,
          isLike: false,
          isDownload: false
        },
        {
          id: "3",
          imgUrl: require("../assets/image/DSC02318.jpg"),
          browse: "20",
          like: "20",
          download: "30",
          isBrowse: false,
          isLike: false,
          isDownload: false
        }
      ]
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    carouselHeight: function() {
      console.log(this.screenWidth)
      return this.screenWidth > 768 ? "600" : "300"
    }
  },
  methods: {
    addBrowse(item) {
      if (item.isBrowse === true) {
        item.browse = (parseInt(item.browse) - parseInt(1)).toString()
        item.isBrowse = false
      } else {
        item.browse = (parseInt(item.browse) + parseInt(1)).toString()
        item.isBrowse = true
      }
    },
    addDownload(item) {
      if (item.isDownload === true) {
        item.download = (parseInt(item.download) - parseInt(1)).toString()
        item.isDownload = false
      } else {
        item.download = (parseInt(item.download) + parseInt(1)).toString()
        item.isDownload = true
      }
    },
    addLike(item) {
      if (item.isLike === true) {
        item.like = (parseInt(item.like) - parseInt(1)).toString()
        item.isLike = false
      } else {
        item.like = (parseInt(item.like) + parseInt(1)).toString()
        item.isLike = true
      }
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
.mask {
  width: 140px;
  height: 40px;
  line-height: 40px;
  position: fixed;
  top: 560px;
  right: 4%;
  z-index: 999;
}
.mask .icon-content {
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-around;
}
.mask .icon-content div {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
.active {
  background-color: rgb(255, 27, 137) !important;
  color: white;
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
  .mask {
    width: 120px;
    height: 36px;
    position: fixed;
    z-index: 999;
    top: 264px;
    right: 2%;
  }
}
</style>