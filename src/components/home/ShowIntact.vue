<template>
  <div class="container" :style="{ height: screenHeight + 'px' }">
    <div class="content">
      <div class="close-btn" v-if="showClose && screenWidth >= 768">
        <span class="iconfont icon-tubiao_guanbi" @click="closeIntact()"></span>
      </div>
      <div class="close-btn-mobile" v-if="showCloseMobile">
        <span class="iconfont icon-tubiao_guanbi" @click="closeIntact()"></span>
      </div>
      <div class="img-wrapper">
        <img @mouseenter="showCloseBtn()" :src="imgItem.imgUrl" alt="" />
      </div>
      <div class="btn-group">
        <div
          id="collect-btn"
          :class="{ btnActive: imgItem.isCollect }"
          @click="collectBtn()"
        >
          <span class="iconfont icon-tubiao_shoucang"></span>
        </div>
        <span>{{ imgItem.collect }}</span>
        <div
          id="like-btn"
          :class="{ btnActive: imgItem.isLike }"
          @click="likeBtn()"
        >
          <span class="iconfont icon-tubiao_dianzan"></span>
        </div>
        <span style="margin-right: 30px">{{ imgItem.like }}</span>
        <div
          id="download-btn"
          :class="{ btnActive: imgItem.isDownload }"
          @click="downloadBtn()"
        >
          <a :class="{ btnActive: imgItem.isDownload }" :href="downloadUrl">
            <span class="iconfont icon-tubiao_xiazai"></span>
          </a>
        </div>
        <span>{{ imgItem.download }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import event from "../../common/Event.js"
import common from "../../common/common.js"
export default {
  props: ["imgItem"],
  data() {
    return {
      screenHeight: "",
      screenWidth: "",
      downloadUrl: "",
      showClose: false
    }
  },
  computed: {
    showCloseMobile() {
      return this.screenWidth >= 768 ? false : true
    }
	},
  methods: {
    closeIntact() {
      event.$emit("closeIntact", false)
    },
    likeBtn() {
				// console.log(this.imgItem.isLike)
      if (this.imgItem.isLike === true) {
        this.imgItem.isLike = false
        let res = common.cancelLike(this.imgItem.id)
        res.then(result => {
          this.imgItem.like = result
        })
      } else {
				this.imgItem.isLike = true
        let res = common.addLike(this.imgItem.id, this.imgItem.user_id)
        res.then(result => {
          this.imgItem.like = result
        })
      }
    },
    collectBtn() {
      if (this.imgItem.isCollect === true) {
        let res = common.cancelCollect(this.imgItem.id)
        res.then(result => {
          this.imgItem.collect = result
        })
        this.imgItem.isCollect = false
      } else {
        let res = common.addCollect(this.imgItem.id)
        res.then(result => {
          this.imgItem.collect = result
        })
        this.imgItem.isCollect = true
      }
    },
    downloadBtn() {
      const name = this.imgItem.imgUrl.split("/").pop()
      const name1 = name.split("?").shift()
      const a = this.imgItem.imgUrl.split("?")
      const newUrl = a[0]
      this.downloadUrl = newUrl + "?attname=" + encodeURI(name1)
      console.log(this.downloadUrl)
      if (this.imgItem.isDownload === false) {
        let res = common.addDownload(this.imgItem.id)
        res.then(result => {
          this.imgItem.download = result
        })
        this.imgItem.isDownload = true
      } else {
        let res = common.addDownload(this.imgItem.id)
        res.then(result => {
          this.imgItem.download = result
        })
      }
    },
    showCloseBtn() {
      this.showClose = true
      setTimeout(() => {
        this.showClose = false
      }, 3000)
    }
  },
  mounted() {
		this.screenHeight = window.innerHeight
		this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.close-btn {
  position: absolute;
  left: 50%;
  margin-left: -24px;
  margin-top: 10px;
  width: 48px;
  height: 48px;
  background-color: #ff1b89;
  color: white;
  border-radius: 50%;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
}
.content {
  width: 92%;
  margin: 20px auto;
  text-align: center;
}
.img-wrapper {
  text-align: center;
}
.img-wrapper img {
  width: 100%;
  max-width: 1200px;
  max-height: 560px;
  object-fit: contain;
}
.btn-group {
  width: 50%;
  margin: 20px auto;
  color: white;
}
.btn-group div {
  display: inline-block;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background-color: white;
  border-radius: 50%;
  color: #ff1b89;
  cursor: pointer;
}
.btn-group > span {
  margin-left: 8px;
}
.btn-group div a {
  color: #ff1b89;
}
#like-btn {
  margin-left: 30px;
}
.btnActive {
  background-color: #ff1b89 !important;
  color: white !important;
}
@media screen and (max-width: 768px) {
  .close-btn-mobile {
    position: absolute;
    left: 90%;
    margin-left: -12px;
    margin-top: 10px;
    width: 24px;
    height: 24px;
    color: #ff1b89;
    border-radius: 50%;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  }
  .btn-group {
  width: 90%;
  margin: 20px auto;
  color: white;
}
}
</style>