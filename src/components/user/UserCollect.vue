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
        :key="item.id"
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
                <span class="iconfont icon-tubiao_xiazai"></span>
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
export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      waterfallAlign: "center",
      imgArr: [
        {
          id: 1,
          width: "640",
          height: "373",
          imgUrl: require("../../assets/web/1.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx",
          create_time: "2020-04-24"
        },
        {
          id: 2,
          width: "640",
          height: "427",
          imgUrl: require("../../assets/web/2.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 4,
          width: "640",
          height: "456",
          imgUrl: require("../../assets/web/4.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 5,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/5.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 6,
          width: "640",
          height: "360",
          imgUrl: require("../../assets/web/6.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 7,
          width: "640",
          height: "319",
          imgUrl: require("../../assets/web/7.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 8,
          width: "640",
          height: "480",
          imgUrl: require("../../assets/web/8.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 9,
          width: "640",
          height: "338",
          imgUrl: require("../../assets/web/9.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 10,
          width: "640",
          height: "320",
          imgUrl: require("../../assets/web/10.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 11,
          width: "640",
          height: "640",
          imgUrl: require("../../assets/web/11.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 13,
          width: "640",
          height: "265",
          imgUrl: require("../../assets/web/13.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 15,
          width: "640",
          height: "452",
          imgUrl: require("../../assets/web/15.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 16,
          width: "640",
          height: "384",
          imgUrl: require("../../assets/web/16.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 17,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/17.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 18,
          width: "640",
          height: "445",
          imgUrl: require("../../assets/web/18.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 19,
          width: "640",
          height: "395",
          imgUrl: require("../../assets/web/19.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 20,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/20.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 21,
          width: "640",
          height: "320",
          imgUrl: require("../../assets/web/10.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 22,
          width: "640",
          height: "640",
          imgUrl: require("../../assets/web/11.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 23,
          width: "640",
          height: "265",
          imgUrl: require("../../assets/web/13.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 24,
          width: "640",
          height: "452",
          imgUrl: require("../../assets/web/15.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 25,
          width: "640",
          height: "384",
          imgUrl: require("../../assets/web/16.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 26,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/17.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 27,
          width: "640",
          height: "445",
          imgUrl: require("../../assets/web/18.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 28,
          width: "640",
          height: "395",
          imgUrl: require("../../assets/web/19.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        },
        {
          id: 29,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/20.jpg"),
          collect: "111",
          like: "111",
          download: "111",
          isCollect: true,
          isLike: false,
          isDownload: false,
          name: "xxx"
        }
      ]
    }
  },
  methods: {
    collectClick(item, index) {
      if (item.isCollect === false) {
        item.isCollect = true
        item.collect = parseInt(parseInt(item.collect) + 1).toString()
      } else {
        item.isCollect = false
        item.collect = parseInt(parseInt(item.collect) - 1).toString()
        this.imgArr.splice(index, 1)
      }
    },
    likeClick(item) {
      if (item.isLike === false) {
        item.isLike = true
        item.like = parseInt(parseInt(item.like) + 1).toString()
      } else {
        item.isLike = false
        item.like = parseInt(parseInt(item.like) - 1).toString()
      }
    },
    downloadClick(item) {
      if (item.isDownload === false) {
        item.isDownload = true
        item.download = parseInt(parseInt(item.download) + 1).toString()
      } else {
        item.isDownload = false
        item.download = parseInt(parseInt(item.download) - 1).toString()
      }
    }
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