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
          <li
            v-for="(item, id) in classifyList.slice(1)"
            class="image-wrapper"
            :key="id"
          >
            <img v-lazy="item.front_cover" class="image" alt="" />
          </li>
        </ul>
        <!-- <div v-for="(item, id) in classifyItemImgList" :key="id"
            v-if="item.tagName === classifyItemChoosed"> -->
        <div v-if="classifyItemChoosed !== '全部'">
          <ul id="classify-waterfall">
            <li v-for="(item, id) in classifyItemImgList" :key="id">
              <img v-lazy="item.imgUrl" @click="showIntact(item)" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <show-intact v-if="isShowIntact" :imgItem="imgItem"></show-intact>
  </div>
</template>

<script>
import "../../assets/css/animate.min.css"
import common from "../../common/common.js" 
import axios from "axios"
import global from "../../common/global.js"
import ShowIntact from '../home/ShowIntact.vue'
import event from '../../common/Event.js'
export default {
  components: {
    ShowIntact
  },
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
      classifyItemImgList: [],
      //全部分类图片列表
      imgList: [],
      tabName: "classify",
      isShowIntact:false,
      imgItem: {}
    }
  },
  methods: {
    chooseClassifyItem(item) {
      this.classifyItemChoosed = item.name
      const token = common.getToken()
      const id = common.getUserID()
      const getItemList = axios.create()
      getItemList
        .get(global.host + "getclassifyitem", {
          params: {
            name: item.name,
            id
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
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
    },
    showIntact(item){
      // console.log(item)
      this.imgItem = item
      this.isShowIntact = true
    },
    closeIntact(){
      this.isShowIntact = false
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
  },
  mounted(){
    event.$on("closeIntact",this.closeIntact)
  },
  beforeDestroy(){
    event.$off('closeIntact',this.closeIntact)
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
  /* overflow: hidden; */
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
#classify-waterfall li img{
  height: 180px;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 500ms;
  border-radius: 8px;
}
#classify-waterfall li img:hover {
  transform: scale(1.5);
}
@media screen and (max-width: 768px) {
  #classify {
    width: 90%;
  }
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
  #classify-waterfall li img{
    width: 100%;
  }
}
</style>