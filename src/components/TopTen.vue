<template>
  <div>
    <div id="top-ten">
      <div class="card-content" v-for="(item, id) in topTen" :key="id">
        <div class="medal">
          <img
            width="48px"
            :src="medal.goldImg"
            alt=""
            v-if="item.sort === 1"
          />
          <img
            width="36px"
            :src="medal.silverImg"
            alt=""
            v-if="item.sort === 2"
          />
          <img
            width="24px"
            :src="medal.copperImg"
            alt=""
            v-if="item.sort === 3"
          />
        </div>
        <el-card :body-style="{ padding: '0px' }">
          <div class="image-wrapper">
            <img v-lazy="item.imgUrl" class="image" />
          </div>
          <div style="padding: 14px;">
            <span>{{ item.imgName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.create_time }}</time>
              <div class="top-ten-btn-group">
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
                  <span class="iconfont icon-tubiao_xiazai"></span>
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
export default {
  data() {
    return {
      medal: {
        goldImg: require("../assets/web/gold.png"),
        silverImg: require("../assets/web/silver.png"),
        copperImg: require("../assets/web/copper.png")
      },
      topTen: [
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
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
          isLike: false
        }
      ]
    }
  },
  methods: {
    topTenLike(item) {
      if (item.isLike === true) {
        item.isLike = false
        item.like = (parseInt(item.like) - parseInt(1)).toString()
      } else {
        item.isLike = true
        item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    topTenDownload(item) {
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
  padding: 16px 8px;
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
  width: 60%;
  float: right;
  text-align: right;
  padding-bottom: 10px;
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
  margin-right: 10px;
}
.topTenBtnActive {
  color: white;
  background-color: #ff1b89;
}
</style>