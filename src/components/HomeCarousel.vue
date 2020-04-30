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
                  id="shoucang"
                  :class="{ active: item.isCollect }"
                  @click="addCollect(item)"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.collect.toString()"
                    placement="bottom"
                  >
                    <span class="iconfont icon-tubiao_shoucang"></span>
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
                    :content="item.download.toString()"
                    placement="bottom"
                  >
                    <a :href="downloadUrl" :class="{ active: item.isDownload }">
                      <span class="iconfont icon-tubiao_xiazai"></span>
                    </a>
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
                    :content="item.like.toString()"
                    placement="bottom"
                  >
                    <span
                      class="iconfont icon-tubiao_dianzan span-outline"
                    ></span>
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
import common from "../common/common.js"
import global from "../common/global.js"
import axios from "axios"
export default {
  data() {
    return {
      screenWidth: "",
      bannerList: [],
      downloadUrl: ""
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    carouselHeight: function() {
      // console.log(this.screenWidth)
      return this.screenWidth > 768 ? "600" : "200"
    }
  },
  methods: {
    addCollect(item) {
      if (item.isCollect === true) {
        let res = common.cancelCollect(item.id)
        res.then(result => {
          item.collect = result
        })
        item.isCollect = false
      } else {
        let res = common.addCollect(item.id)
        res.then(result => {
          item.collect = result
        })
        item.isCollect = true
      }
    },
    addDownload(item) {
      const name = item.imgUrl.split("/").pop()
      const name1 = name.split("?").shift();
      const a = item.imgUrl.split('?')
      const newUrl = a[0]
      this.downloadUrl = newUrl + "?attname=" + encodeURI(name1)
      if (item.isDownload === false) {
        let res = common.addDownload(item.id)
        res.then(result => {
          item.download = result
        })
        item.isDownload = true
      } else {
        let res = common.addDownload(item.id)
        res.then(result => {
          item.download = result
        })
      }
    },
    addLike(item) {
      if (item.isLike === true) {
        let res = common.cancelLike(item.id)
        res.then(result => {
          item.like = result
        })
        item.isLike = false
      } else {
        let res = common.addLike(item.id)
        res.then(result => {
          item.like = result
        })
        item.isLike = true
      }
    }
  },
  created() {
    const token = common.getToken()
    const id = common.getUserID()
    const getBanner = axios.create()
    getBanner
      .get(global.host + "banner", {
        params: {
          id
        },
        headers: {
          token
        }
      })
      .then(res => {
        let result = res.data.data
        for (let i = 0; i < result.length; i++) {
          this.bannerList.push(result[i])
        }
      })
      .catch(err => {
        console.log(err.response)
      })
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
.span-outline::before {
  outline: none !important;
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
    top: 164px;
    right: 2%;
  }
}
</style>