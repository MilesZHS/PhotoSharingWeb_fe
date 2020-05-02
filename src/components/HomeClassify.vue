<template>
  <div>
    <div id="classify">
      <!-- 左侧分类导航 -->
      <div id="classify-left">
        <ul>
          <li
            v-for="(item, id) in classifyList.slice(0, 10)"
            :key="id"
            @click="chooseClassifyItem(item)"
            :class="{ classifyActive: classifyItemChoosed === item.name }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 右侧图片展示 -->
      <div id="classify-right">
        <ul
          id="classify-waterfall"
          v-show="classifyItemChoosed === '' || classifyItemChoosed === '全部'"
        >
          <li v-for="(item, id) in classifyList.slice(1)" :key="id">
            <img v-lazy="item.front_cover" alt="" />
          </li>
        </ul>
        <!-- <div v-for="(item, id) in classifyItemImgList" :key="id"
            v-if="item.tagName === classifyItemChoosed"> -->
        <div v-if="classifyItemChoosed !== '全部'">
          <ul id="classify-waterfall">
            <li v-for="(item, id) in classifyItemImgList" :key="id">
              <img v-lazy="item.imgUrl" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/animate.min.css"
import common from "../common/common.js"
import axios from "axios"
import global from "../common/global.js"
export default {
  data() {
    return {
      classifyItemChoosed: "",
      classifyList: [
        {
          id: "0",
          name: "全部",
          front_cover: "0",
          create_time: "0",
          imgNum: "9999"
        }
      ],
      //分类图片列表
      classifyItemImgList: [
      ],
      //全部分类图片列表
      imgList: [
        {
          id: 1,
          width: "640",
          height: "373",
          imgUrl: require("../assets/web/1.jpg")
        },
        {
          id: 2,
          width: "640",
          height: "427",
          imgUrl: require("../assets/web/2.jpg")
        },
        {
          id: 4,
          width: "640",
          height: "456",
          imgUrl: require("../assets/web/4.jpg")
        },
        {
          id: 5,
          width: "640",
          height: "426",
          imgUrl: require("../assets/web/5.jpg")
        },
        {
          id: 6,
          width: "640",
          height: "360",
          imgUrl: require("../assets/web/6.jpg")
        },
        {
          id: 7,
          width: "640",
          height: "319",
          imgUrl: require("../assets/web/7.jpg")
        },
        {
          id: 8,
          width: "640",
          height: "480",
          imgUrl: require("../assets/web/8.jpg")
        },
        {
          id: 9,
          width: "640",
          height: "338",
          imgUrl: require("../assets/web/9.jpg")
        },
        {
          id: 10,
          width: "640",
          height: "320",
          imgUrl: require("../assets/web/10.jpg")
        },
        {
          id: 11,
          width: "640",
          height: "640",
          imgUrl: require("../assets/web/11.jpg")
        },
        {
          id: 13,
          width: "640",
          height: "265",
          imgUrl: require("../assets/web/13.jpg")
        },
        {
          id: 15,
          width: "640",
          height: "452",
          imgUrl: require("../assets/web/15.jpg")
        },
        {
          id: 16,
          width: "640",
          height: "384",
          imgUrl: require("../assets/web/16.jpg")
        },
        {
          id: 17,
          width: "640",
          height: "426",
          imgUrl: require("../assets/web/17.jpg")
        },
        {
          id: 18,
          width: "640",
          height: "445",
          imgUrl: require("../assets/web/18.jpg")
        },
        {
          id: 19,
          width: "640",
          height: "395",
          imgUrl: require("../assets/web/19.jpg")
        },
        {
          id: 20,
          width: "640",
          height: "426",
          imgUrl: require("../assets/web/20.jpg")
        },
        {
          id: 21,
          width: "640",
          height: "320",
          imgUrl: require("../assets/web/10.jpg")
        },
        {
          id: 22,
          width: "640",
          height: "640",
          imgUrl: require("../assets/web/11.jpg")
        },
        {
          id: 23,
          width: "640",
          height: "265",
          imgUrl: require("../assets/web/13.jpg")
        },
        {
          id: 24,
          width: "640",
          height: "452",
          imgUrl: require("../assets/web/15.jpg")
        },
        {
          id: 25,
          width: "640",
          height: "384",
          imgUrl: require("../assets/web/16.jpg")
        },
        {
          id: 26,
          width: "640",
          height: "426",
          imgUrl: require("../assets/web/17.jpg")
        },
        {
          id: 27,
          width: "640",
          height: "445",
          imgUrl: require("../assets/web/18.jpg")
        },
        {
          id: 28,
          width: "640",
          height: "395",
          imgUrl: require("../assets/web/19.jpg")
        },
        {
          id: 29,
          width: "640",
          height: "426",
          imgUrl: require("../assets/web/20.jpg")
        }
      ],
      tabName: "classify"
    }
  },
  methods: {
    chooseClassifyItem(item) {
      this.classifyItemChoosed = item.name
      const token = common.getToken()
      const getItemList = axios.create()
      getItemList
        .get(global.host + "getclassifyitem", {
          params: {
            name: item.name
          },
          headers: {
            token: token
          }
        })
        .then(res => {
          this.classifyItemImgList = []
          let result = res["data"]["data"]
          for (let i = 0; i < result.length; i++) {
            this.classifyItemImgList.push(result[i])
          }
          // console.log(this.classifyItemImgList)
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
    }
  },
  created() {
    const token = common.getToken()
    const getTagListReq = axios.create()
    getTagListReq
      .get(global.host + "classifylist", {
        params: {},
        headers: {
          token: token
        }
      })
      .then(res => {
        // this.classifyList.push(res.data.data)
        let result = res.data.data
        for (let i = 0; i < result.length; i++) {
          if (result[i].name != "") {
            this.classifyList.push(result[i])
          }
        }
        //对分类数组按图片数量降序排序
        this.classifyList.sort((a, b) => {
          return b.imgNum - a.imgNum
        })
      })
      .catch(err => {
        this.$message({
          message: err.response,
          type: "error"
        })
        console.log(err)
      })
  }
}
</script>

<style scoped>
#classify {
  width: 90%;
  margin: 0% auto;
}
.classifyActive {
  background-color: #ff1b89;
  color: white;
}
#classify div {
  display: inline-block;
}
#classify-left {
  width: 8%;
  float: left;
  margin-top: 18px;
}
#classify-left ul {
  list-style: none;
}
#classify-left ul li {
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
}
#classify-left ul li:hover {
  background-color: #ff1b89;
  color: white;
}
#classify-right {
  width: 92%;
}
#classify-waterfall {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 5px;
}
#classify-waterfall::after {
  content: "";
  flex-grow: 9999;
}
#classify-waterfall li {
  flex-grow: 1;
  overflow: hidden;
  margin: 5px;
  border-radius: 8px;
}
#classify-waterfall li img {
  height: 180px;
  min-width: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 500ms;
}
#classify-waterfall li img:hover {
  transform: scale(1.5);
}
@media screen and (max-width: 768px) {
  #classify-left {
    display: block;
    width: 100%;
    margin-top: -16px;
  }
  #classify-left ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  #classify-left ul::after {
    content: "";
    flex: auto;
  }
  #classify-left ul li {
    width: 20%;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  #classify-right {
    width: 100%;
  }
}
</style>