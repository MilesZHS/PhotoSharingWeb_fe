<template>
  <div id="new-upload">
    <div class="card-content" v-for="(item, id) in newUpload" :key="id">
      <el-card :body-style="{ padding: '0px' }">
        <div class="image-wrapper">
          <img v-lazy="item.imgUrl" class="image" />
        </div>
        <div style="padding: 14px;">
          <span>{{ item.imgName }}</span>
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
                <span class="iconfont icon-tubiao_xiazai"></span>
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
export default {
  data() {
    return {
      newUpload: [
        {
          id: 1,
          imgUrl: require("../assets/web/1.jpg"),
          create_time: "2020-4-23",
          imgName: "xxx",
          username: "xxxxx",
          download: "48",
          like: "10972",
          sort: 1,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 2,
          imgUrl: require("../assets/web/2.jpg"),
          create_time: "2020-4-20",
          imgName: "xxx2",
          username: "xxxxx",
          download: "47",
          like: "1088",
          sort: 2,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 3,
          imgUrl: require("../assets/web/3.jpg"),
          create_time: "2020-4-11",
          imgName: "xxx3",
          username: "xxxxx",
          download: "12",
          like: "888",
          sort: 3,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 4,
          imgUrl: require("../assets/web/4.jpg"),
          create_time: "2020-4-21",
          imgName: "xxx4",
          username: "xxxxx4",
          download: "10",
          like: "800",
          sort: 4,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 5,
          imgUrl: require("../assets/web/5.jpg"),
          create_time: "2020-4-6",
          imgName: "xxx5",
          username: "xxxxx5",
          download: "8",
          like: "666",
          sort: 5,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 6,
          imgUrl: require("../assets/web/6.jpg"),
          create_time: "2020-4-23",
          imgName: "xxx",
          username: "xxxxx",
          download: "48",
          like: "10972",
          sort: 6,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 7,
          imgUrl: require("../assets/web/7.jpg"),
          create_time: "2020-4-20",
          imgName: "xxx2",
          username: "xxxxx",
          download: "47",
          like: "1088",
          sort: 7,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 8,
          imgUrl: require("../assets/web/8.jpg"),
          create_time: "2020-4-11",
          imgName: "xxx3",
          username: "xxxxx",
          download: "12",
          like: "888",
          sort: 8,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 9,
          imgUrl: require("../assets/web/9.jpg"),
          create_time: "2020-4-21",
          imgName: "xxx4",
          username: "xxxxx4",
          download: "10",
          like: "800",
          sort: 9,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        },
        {
          id: 10,
          imgUrl: require("../assets/web/10.jpg"),
          create_time: "2020-4-6",
          imgName: "xxx5",
          username: "xxxxx5",
          download: "8",
          like: "666",
          sort: 10,
          isDownload: false,
          isLike: false,
          collect: 0,
          isCollect: false
        }
      ]
    }
  },
  methods: {
    newUploadCollect(item) {
      if (item.isCollect === true) {
        item.isCollect = false
        item.collect = (parseInt(item.collect) - parseInt(1)).toString()
      } else {
        item.isCollect = true
        item.collect = (parseInt(item.collect) + parseInt(1)).toString()
      }
    },
    newUploadLike(item) {
      if (item.isLike === true) {
        item.isLike = false
        item.like = (parseInt(item.like) - parseInt(1)).toString()
      } else {
        item.isLike = true
        item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    newUploadDownload(item) {
      if (item.isDownload === true) {
        item.isDownload = false
        item.download = (parseInt(item.download) - parseInt(1)).toString()
      } else {
        item.isDownload = true
        item.download = (parseInt(item.download) + parseInt(1)).toString()
      }
    }
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