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
    <page-footer></page-footer>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
import HomeCarousel from "../../components/HomeCarousel.vue"
import "../../assets/css/animate.min.css"
import HomeClassify from "../../components/HomeClassify.vue"
import TopTen from "../../components/TopTen.vue"
import NewUpload from "../../components/NewUpload.vue"
import PageFooter from '../../components/PageFooter.vue'
export default {
  components: {
    HeaderNav,
    HomeCarousel,
    HomeClassify,
    TopTen,
    NewUpload,
    PageFooter
  },
  data() {
    return {
      tabName: "classify",
      isLogin: true,
      userName: "18560677018",
      avatar: require("../../assets/logo.png")
    }
  }
}
</script>

<style scoped>
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
    font-size: 16px;
  }
  .liActive {
    color: black !important;
    font-size: 20px !important;
    font-weight: 600;
  }
  .liSpanActive {
    border-bottom: 4px solid #ff1b89;
  }
}
</style>
