<template>
  <div class="collect">
    <waterfall
      :line-gap="290"
      :watch="imgArr"
      :align="waterfallAlign"
      :fixed-height="false"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in imgArr"
        :width="item.width"
        :height="parseInt(item.height) + 200"
        :order="index"
        :key="index"
      >
        <div class="img-wrapper">
          <img :src="item.imgUrl" width="280px" alt="" />
          <div class="content">
            <div class="img-name">
              <ul>
                <li>
                  <h4>{{ item.name }}</h4>
                </li>
                <li>
                  <span>{{ item.create_time }}</span>
                </li>
              </ul>
            </div>
            <div class="img-btn">
              <div
                class="collect-btn"
                @click="collectClick(item, index)"
                :class="{ btnActive: item.isCollect }"
              >
                <span class="iconfont icon-tubiao_shoucang"></span>
              </div>
              <span>{{ item.collect }}</span>
              <div
                class="like-btn"
                @click="likeClick(item)"
                :class="{ btnActive: item.isLike }"
              >
                <span class="iconfont icon-tubiao_dianzan"></span>
              </div>
              <span>{{ item.like }}</span>
              <div
                class="download-btn"
                @click="downloadClick(item)"
                :class="{ btnActive: item.isDownload }"
              >
                <a
                  :href="downloadUrl"
                  :class="{ btnActive: item.isDownload }"
                >
                  <span class="iconfont icon-tubiao_xiazai"></span>
                </a>
              </div>
              <span>{{ item.download }}</span>
            </div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>
import Waterfall from "vue-waterfall/lib/waterfall"
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot"
import common from "../../common/common.js"
import global from "../../common/global.js"
import axios from "axios"
export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      waterfallAlign: "center",
      imgArr: [],
      downloadUrl: ''
    }
  },
  methods: {
    collectClick(item,index) {
      if (item.isCollect === true) {
        let res = common.cancelCollect(item.id)
        res.then(result => {
          item.collect = result
        })
        item.isCollect = false
        this.imgArr.splice(index,1)
      } else {
        let res = common.addCollect(item.id)
        res.then(result => {
          item.collect = result
        })
        item.isCollect = true
      }

    },
    likeClick(item) {
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
        let res = common.addLike(item.id, item.user_id)
        res.then(result => {
          item.like = result
          // console.log(item.like)
        })
        // item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    downloadClick(item) {
      const name = item.imgUrl.split("/").pop()
      const name1 = name.split("?").shift()
      const a = item.imgUrl.split("?")
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
    }
  },
  created() {
    const token = common.getToken()
    const id = common.getUserID()
    const req = axios.create()
    req
      .get(global.host + "collectrecord", {
        params: {
          id
        },
        headers: {
          token
        }
      })
      .then(res => {
        this.imgArr = res.data.data
        for (let i = 0; i < this.imgArr.length; i++) {
          this.imgArr[i].create_time = this.imgArr[i].create_time.split(" ")[0]
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.collect {
  width: 90%;
  margin: 20px auto;
}
.img-wrapper {
  box-shadow: 0 0 4px #c4c4c4;
  width: 280px;
}
.img-name ul {
  list-style: none;
  width: 90%;
  margin: 0% auto;
}
.img-name ul li {
  display: inline-block;
  vertical-align: baseline;
  width: 50%;
}
.img-name ul li:first-child {
  font-size: 20px;
}
.img-name ul li:last-child {
  text-align: right;
  vertical-align: baseline;
}
.img-btn {
  display: block;
  text-align: right;
  margin-right: 20px;
  padding-bottom: 8px;
}
.img-btn div {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 4px #848484;
  margin-top: 8px;
  margin-right: 2px;
  margin-left: 8px;
  cursor: pointer;
}
.btnActive {
  background-color: #ff1b89;
  color: white;
}
</style>