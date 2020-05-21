<template>
  <div>
    <header-nav>
      <div id="identity-wrapper" v-if="isLogin">
        <router-link to="/user">
          <div id="avatar-wrapper">
            <img :src="avatar" id="avatar" alt="" />
          </div>
          <div id="username">
            {{ userName }}
          </div>
        </router-link>
      </div>
    </header-nav>
    <home-carousel></home-carousel>
    <section class="main">
      <div class="tab-container">
        <ul>
          <li
            :class="{ liActive: tabName === 'classify' }"
            @click="tabName = 'classify'"
          >
            <span :class="{ liSpanActive: tabName === 'classify' }"
              >专题分类</span
            >
          </li>
          <li
            :class="{ liActive: tabName === 'top-ten' }"
            @click="tabName = 'top-ten'"
          >
            <span :class="{ liSpanActive: tabName === 'top-ten' }"
              >点赞&nbsp;top&nbsp;10</span
            >
          </li>
          <li
            :class="{ liActive: tabName === 'new-upload' }"
            @click="tabName = 'new-upload'"
          >
            <span :class="{ liSpanActive: tabName === 'new-upload' }"
              >最新上传</span
            >
          </li>
        </ul>
      </div>
      <div class="content">
        <transition enter-active-class="animated fadeIn">
          <home-classify v-if="tabName === 'classify'"></home-classify>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <top-ten v-if="tabName === 'top-ten'"></top-ten>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <new-upload v-if="tabName === 'new-upload'"></new-upload>
        </transition>
      </div>
    </section>
    <section class="clear"></section>
    <div id="aside-btn">
      <div id="goto-top-btn" @click="gotoTop()">
        <span class="iconfont icon-shangla"></span>
      </div>
      <div id="upload-btn" @click="showDialog()">
        <span class="iconfont icon-shangchuan"></span>
      </div>
      <div id="logout-btn" @click="logout()">
        <span class="iconfont icon-tuichu"></span>
      </div>
    </div>
    <image-uploader
      :userId="userId"
      :classifyList="classifyList"
      v-if="showUploadForm"
    ></image-uploader>
    <page-footer></page-footer>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
import HomeCarousel from "../../components/home/HomeCarousel.vue"
import "../../assets/css/animate.min.css"
import HomeClassify from "../../components/home/HomeClassify.vue"
import TopTen from "../../components/home/TopTen.vue"
import NewUpload from "../../components/home/NewUpload.vue"
import PageFooter from "../../components/PageFooter.vue"
import ImageUploader from "../../components/home/ImageUploader"
import event from "../../common/Event.js"
import axios from "axios"
import global from "../../common/global.js"
import common from "../../common/common.js"
export default {
  components: {
    HeaderNav,
    HomeCarousel,
    HomeClassify,
    TopTen,
    NewUpload,
    PageFooter,
    ImageUploader
  },
  data() {
    return {
      tabName: "classify",
      imgUrl: "",
      isLogin: false,
      userName: "",
      userId: "",
      avatar: "",
      showUploadForm: false,
      classifyList: []
    }
  },
  methods: {
    gotoTop() {
      window.scrollTo(0, 0)
    },
    changeLoginStatus(id) {
      this.isLogin = true
      this.userId = id
      let userInfo = localStorage.getItem(id)
      userInfo = JSON.parse(userInfo)
      this.userName = userInfo.username
      this.avatar = userInfo.avatar
    },
    logout() {
      localStorage.removeItem("user")
      this.$router.push("/identity")
    },
    showDialog() {
      const token = JSON.parse(localStorage.getItem("user"))["token"]
      const id = common.getUserID()
      const getUploadToken = axios.create()
      getUploadToken
        .post(
          global.host + "uploadtoken",
          { id },
          {
            headers: {
              token: token
            }
          }
        )
        .then(() => {
          this.showUploadForm = true
        })
        .catch(err => {
          console.log(err.response)
          this.$message.error(err.response.data.message)
        })
    },
    closeDialog(flag) {
      this.showUploadForm = flag
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user == null) {
      this.$router.push("/identity")
    } else {
      this.isLogin = true
      this.userId = user.id
      this.userName = user.username
      this.avatar = user.avatar
    }
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const getTags = axios.create()
    getTags
      .get(global.host + "classifylist", {
        params: {},
        headers: {
          token: token
        }
      })
      .then(res => {
        this.classifyList = res.data.data
      })
      .catch(err => {
        console.log(err.response)
        if(!common.checkIdentity(err.response.data.message)){
          this.$router.push('/identity')
        }
      })
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
    event.$on("closeDialog", this.closeDialog)
  },
  beforeDestroy() {
    event.$off("closeDialog", this.closeDialog)
  }
}
</script>

<style scoped>
.clear {
  clear: both;
}
.main {
  width: 100%;
}
.tab-container {
  width: 44%;
  margin: 30px auto;
  display: block;
  text-align: center;
}
.tab-container ul {
  display: flex;
  justify-content: space-around;
}
.tab-container ul li {
  width: 25%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  display: inline-block;
  color: #b9b1be;
  cursor: pointer;
  font-size: 20px;
}
.liActive {
  color: black !important;
  font-size: 24px !important;
  font-weight: 600;
}
.liSpanActive {
  border-bottom: 4px solid #ff1b89;
}
.content {
  width: 100%;
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
  color: white;
}
#aside-btn {
  width: 48px;
  height: 172px;
  position: fixed;
  top: 60%;
  right: 1%;
  z-index: 990;
}
#goto-top-btn {
  border-radius: 50%;
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
  color: white;
  background-color: #ff1b89;
  cursor: pointer;
}
#upload-btn {
  border-radius: 50%;
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
  color: white;
  background-color: #ff1b89;
  cursor: pointer;
  margin-top: 14px;
}
#logout-btn {
  border-radius: 50%;
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
  color: white;
  background-color: #ff1b89;
  cursor: pointer;
  margin-top: 14px;
}
@media screen and (max-width: 1200px) {
  .tab-container {
    width: 60%;
  }
}
@media screen and (max-width: 768px) {
  #username {
    color: #848484;
  }
  .tab-container {
    width: 90%;
  }
  .tab-container ul li {
    width: 30%;
    font-size: 14px;
  }
  .liActive {
    color: black !important;
    font-size: 16px !important;
    font-weight: 600;
  }
  .liSpanActive {
    border-bottom: 4px solid #ff1b89;
  }
}
</style>
