<template>
  <div>
    <div id="top-ten">
      <div class="card-content" v-for="(item, index) in topTen" :key="index">
        <div class="medal">
          <img width="48px" :src="medal.goldImg" alt="" v-if="index === 0" />
          <img width="36px" :src="medal.silverImg" alt="" v-if="index === 1" />
          <img width="24px" :src="medal.copperImg" alt="" v-if="index === 2" />
        </div>
        <el-card :body-style="{ padding: '0px' }">
          <div class="image-wrapper">
            <img v-lazy="item.imgUrl" class="image" />
          </div>
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
            <time class="time" style="float:right">{{ item.create_time }}</time>
            <div class="bottom clearfix">
              <div class="top-ten-btn-group">
                <div
                  id="collect-btn"
                  :class="{ topTenBtnActive: item.isCollect }"
                  @click="topTenCollect(item)"
                >
                  <span class="iconfont icon-tubiao_shoucang"></span>
                </div>
                <span>{{ item.collect }}</span>
                <div
                  id="like-btn"
                  :class="{ topTenBtnActive: item.isLike }"
                  @click="topTenLike(item)"
                >
                  <span class="iconfont icon-tubiao_dianzan"></span>
                </div>
                <span>{{ item.like }}</span>
                <div
                  id="download-btn"
                  :class="{ topTenBtnActive: item.isDownload }"
                  @click="topTenDownload(item)"
                >
                  <a
                    :href="downloadUrl"
                    :class="{ topTenBtnActive: item.isDownload }"
                  >
                    <span class="iconfont icon-tubiao_xiazai"></span>
                  </a>
                </div>
                <span>{{ item.download }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import global from "../common/global.js"
import common from "../common/common.js"
export default {
  data() {
    return {
      medal: {
        goldImg: require("../assets/web/gold.png"),
        silverImg: require("../assets/web/silver.png"),
        copperImg: require("../assets/web/copper.png")
      },
      topTen: [],
      downloadUrl: ""
    }
  },
  methods: {
    topTenLike(item) {
      if (item.isLike === true) {
        item.isLike = false
        let res = common.cancelLike(item.id)
        res.then(result => {
          item.like = result
          // console.log(item.like)
        })
        // item.like = (parseInt(item.like) - parseInt(1)).toString()
      } else {
        item.isLike = true
        let res = common.addLike(item.id,item.user_id)
        res.then(result => {
          item.like = result
          // console.log(item.like)
        })
        // item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    topTenDownload(item) {
      // const name = item.imgUrl.split('/').pop()
      // this.downloadUrl = item.imgUrl + '?attname=' + encodeURI(name)
      // console.log(this.downloadUrl)
      // if (item.isDownload === true) {
      //   item.isDownload = false
      //   item.download = (parseInt(item.download) - parseInt(1)).toString()
      // } else {
      //   item.isDownload = true
      //   item.download = (parseInt(item.download) + parseInt(1)).toString()
      // }
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
    topTenCollect(item) {
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
    }
  },
  created() {
    const token = common.getToken()
    const topTenReq = axios.create()
    const id = common.getUserID()
    topTenReq
      .get(global.host + "topten", {
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
          this.topTen.push(result[i])
        }
      })
  }
}
</script>

<style scoped>
#top-ten {
  width: 90%;
  margin: 0% auto;
  display: flex;
  flex-wrap: wrap;
}
.medal {
  position: absolute;
  width: 48px;
  /* top: 4px;
  left: 4px; */
  z-index: 999;
}
.medal img {
  /* width: 100%; */
  margin-top: 10px;
  margin-left: 10px;
}
#top-ten::after {
  content: "";
  flex-grow: 9999;
}
.card-content {
  height: 280px;
  padding: 8px 8px;
  flex-grow: 1;
  overflow: hidden;
}
.image-wrapper {
  height: 180px;
  overflow: hidden;
}
.card-content .image {
  height: 180px;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 500ms;
}
.card-content .image:hover {
  transform: scale(1.5);
}
.top-ten-btn-group {
  width: 100%;
  text-align: right;
  padding-top: 10px;
}
.top-ten-btn-group div {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  line-height: 28px;
  text-align: center;
  box-shadow: 0 0 4px #848484;
  margin-right: 4px;
  cursor: pointer;
}
.top-ten-btn-group > span {
  margin-right: 16px;
}
.topTenBtnActive {
  color: white;
  background-color: #ff1b89;
}
</style>