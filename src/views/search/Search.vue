<template>
  <div>
    <header-nav :bgColor="headerColorWhite" :hideSearch="hideSearch">
      <div id="identity-wrapper" v-if="isLogin">
        <router-link to="/user">
          <div id="avatar-wrapper">
            <img :src="userInfo.avatar" id="avatar" alt="" />
          </div>
          <div id="username">
            {{ userInfo.username }}
          </div>
        </router-link>
      </div>
      <div slot="input">
        <input
          type="text"
          id="search-input"
          placeholder="搜索图片关键词"
          class="inputWhiteBg"
          v-model="inputVal"
        />
        <button id="search-btn" class="buttonWhiteBg" @click="searchClick()">
          <i class="el-icon-search"></i> 搜索
        </button>
      </div>
    </header-nav>
    <section class="result-container">
      <div class="result">
        <h3>{{ searchVal }}</h3>
        <h4>&nbsp;&nbsp;的搜索结果:</h4>
        <br />
        <span>搜索到&nbsp;{{ resNum }}&nbsp;张照片</span>
      </div>
      <div class="empty-message" v-if="showMessage">
        <span>没有搜到哦~换个关键词试试</span>
      </div>
      <div class="waterfall-container">
        <horizontal-waterfall :imgList="imgList"></horizontal-waterfall>
      </div>
    </section>
    <page-footer></page-footer>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
import common from "../../common/common.js"
import global from "../../common/global.js"
import axios from "axios"
import PageFooter from "../../components/PageFooter"
import HorizontalWaterfall from "../../components/HorizontalWaterfall.vue"
export default {
  components: {
    HeaderNav,
    PageFooter,
    HorizontalWaterfall
  },
  data() {
    return {
      userInfo: {},
      isLogin: true,
      headerColorWhite: true,
      hideSearch: true,
      searchVal: "",
      resNum: 123456,
      imgList: [],
      showMessage: false,
      inputVal: ""
    }
  },
  methods: {
    searchInfo(val) {
      // alert(val)
      this.searchVal = val
      console.log(val)
    },
    searchClick() {
      this.searchVal = this.inputVal
      this.imgList = {}
      const id = common.getUserID()
      const token = common.getToken()
      const getImgList = axios.create()
      getImgList
        .get(global.host + "getclassifyitem", {
          params: {
            id,
            name: this.inputVal
          },
          headers: {
            token
          }
        })
        .then(res => {
          let result = res.data.data
          if (result.length === 0) {
            this.resNum = 0
            this.showMessage = true
            console.log(0)
          } else {
            this.showMessage = false
            this.imgList = result
            this.resNum = this.imgList.length
          }
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
    }
  },
  created() {
    const token = common.getToken()
    const id = common.getUserID()
    const getInfoReq = axios.create()
    getInfoReq
      .get(global.host + "userinfo", {
        params: {
          id
        },
        headers: {
          token
        }
      })
      .then(res => {
        this.userInfo = res.data.data
      })
      .catch(err => {
        if (!common.checkIdentity(err.response.data.message)) {
          this.$router.push("/identity")
        }
      })
    this.searchVal = this.$route.query.searchInfo
    // console.log(this.searchVal)
    const getImgList = axios.create()
    getImgList
      .get(global.host + "getclassifyitem", {
        params: {
          id,
          name: this.searchVal
        },
        headers: {
          token
        }
      })
      .then(res => {
        let result = res.data.data
        if (result.length === 0) {
          this.resNum = 0
          this.showMessage = true
          console.log(0)
        } else {
          this.imgList = result
          this.resNum = this.imgList.length
        }
      })
      .catch(err => {
        this.$message.error(err.response.data.message)
      })
  }
}
</script>

<style scoped>
.result-container {
  width: 80%;
  margin: 0% auto;
}
.result {
  margin: 20px;
}
.result h3,
h4 {
  display: inline-block;
}
.result h4 {
  margin-left: 10px;
}
#identity-wrapper {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
#avatar-wrapper {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
#avatar {
  width: 36px;
  height: 36px;
  object-fit: cover;
  vertical-align: baseline;
}
#username {
  height: 60px;
  line-height: 60px;
  display: inline-block;
  padding-left: 10px;
  color: #ff1b89;
  font-size: 14px;
}
.empty-message {
  text-align: center;
  margin-bottom: 30px;
}
#search-input {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 340px;
  height: 30px;
  padding-left: 16px;
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  margin-right: 1px;
  color: #999999;
  vertical-align: middle;
}
#search-btn {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 80px;
  height: 30px;
  background: white;
  border: none;
  outline: none;
  overflow: hidden;
  vertical-align: middle;
  background-color: rgba(255, 254, 254, 0.8);
  color: #848484;
}
#search-btn:hover {
  background-image: linear-gradient(to right, #ff1b89, #f58166);
  color: white;
  cursor: pointer;
}
.inputWhiteBg {
  background-color: #f1f1f1 !important;
}
@media screen and (max-width: 768px) {
  .result-container {
    width: 100%;
  }
}
</style>