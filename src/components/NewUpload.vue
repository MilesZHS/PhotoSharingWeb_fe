<template>
  <div id="new-upload">
    <div class="card-content" v-for="(item, id) in newUpload" :key="id">
      <el-card :body-style="{ padding: '0px' }">
        <div class="image-wrapper">
          <img v-lazy="item.imgUrl" class="image" />
        </div>
        <div style="padding: 14px;">
          <span>{{ item.name }}</span>
          <time class="time" style="float:right">{{ item.create_time }}</time>
          <div class="bottom clearfix">
            <div class="new-upload-btn-group">
              <div
                id="collect-btn"
                :class="{ newUploadBtnActive: item.isCollect }"
                @click="newUploadCollect(item)"
              >
                <span class="iconfont icon-tubiao_shoucang"></span>
              </div>
              <span>{{ item.collect }}</span>
              <div
                id="like-btn"
                :class="{ newUploadBtnActive: item.isLike }"
                @click="newUploadLike(item)"
              >
                <span class="iconfont icon-tubiao_dianzan"></span>
              </div>
              <span>{{ item.like }}</span>
              <div
                id="download-btn"
                :class="{ newUploadBtnActive: item.isDownload }"
                @click="newUploadDownload(item)"
              >
                <a
                  :href="downloadUrl"
                  :class="{ newUploadBtnActive: item.isDownload }"
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
</template>

<script>
import common from "../common/common.js"
import axios from "axios"
import global from "../common/global.js"
export default {
  data() {
    return {
      newUpload: [],
      downloadUrl: ""
    }
  },
  methods: {
    newUploadCollect(item) {
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
    newUploadLike(item) {
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
        let res = common.addLike(item.id)
        res.then(result => {
          item.like = result
          // console.log(item.like)
        })
        // item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    newUploadDownload(item) {
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
      console.log(this.downloadUrl)
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
    const getNewUpload = axios.create()
    const id = common.getUserID()
    getNewUpload
      .get(global.host + "newupload", {
        params: {
          id
        },
        headers: {
          token: token
        }
      })
      .then(res => {
        let result = res.data.data
        for (let i = 0; i < result.length; i++) {
          this.newUpload.push(result[i])
        }
      })
      .catch(err => {
        this.$message.error(err.response.data.message)
      })
  }
}
</script>

<style scoped>
#new-upload {
  width: 90%;
  margin: 0% auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
#new-upload::after {
  content: "";
  flex-grow: 9999;
}
.card-content {
  height: 260px;
  padding: 10px 8px;
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
.new-upload-btn-group {
  width: 100%;
  float: right;
  text-align: right;
  padding-top: 10px;
  padding-bottom: 10px;
}
.new-upload-btn-group div {
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
.new-upload-btn-group > span {
  margin-right: 18px;
}
.newUploadBtnActive {
  color: white;
  background-color: #ff1b89;
}
</style>