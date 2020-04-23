<template>
  <div>
    <header-nav>
      <div id="identity-wrapper" v-if="isLogin">
        <div id="avatar-wrapper">
          <img :src="avatar" id="avatar" alt="" />
        </div>
        <div id="username">
          {{ userName }}
        </div>
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
          <div id="classify" v-if="tabName === 'classify'">
            <div id="classify-left"></div>
            <div id="classify-right">
              <waterfall
                :line-gap="190"
                :watch="items"
                :line="line"
                :fix-height="true"
                :align="align"
              >
                <waterfall-slot
                  v-for="(item, index) in items"
                  :key="item.id"
                  :width="item.width"
                  :height="item.height"
                  :order="index"
                >
                  <img :src="item.imgUrl" alt="" height="180px" />
                </waterfall-slot>
              </waterfall>
            </div>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div id="top-ten" v-if="tabName === 'top-ten'">前十</div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div id="new-upload" v-if="tabName === 'new-upload'">最新</div>
        </transition>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
import HomeCarousel from "../../components/HomeCarousel.vue"
import Waterfall from "vue-waterfall/lib/waterfall"
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot"
import "../../assets/css/animate.min.css"
export default {
  components: {
    HeaderNav,
    HomeCarousel,
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      line: "h",
      align: "center",
      items: [
        {
          id: 1,
          width: "640",
          height: "373",
          imgUrl: require("../../assets/web/1.jpg")
        },
        {
          id: 2,
          width: "640",
          height: "427",
          imgUrl: require("../../assets/web/2.jpg")
        },
        {
          id: 4,
          width: "640",
          height: "456",
          imgUrl: require("../../assets/web/4.jpg")
        },
        {
          id: 5,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/5.jpg")
        },
        {
          id: 6,
          width: "640",
          height: "360",
          imgUrl: require("../../assets/web/6.jpg")
        },
        {
          id: 7,
          width: "640",
          height: "319",
          imgUrl: require("../../assets/web/7.jpg")
        },
        {
          id: 8,
          width: "640",
          height: "480",
          imgUrl: require("../../assets/web/8.jpg")
        },
        {
          id: 9,
          width: "640",
          height: "338",
          imgUrl: require("../../assets/web/9.jpg")
        },
        {
          id: 10,
          width: "640",
          height: "320",
          imgUrl: require("../../assets/web/10.jpg")
        },
        {
          id: 11,
          width: "640",
          height: "640",
          imgUrl: require("../../assets/web/11.jpg")
        },
        {
          id: 13,
          width: "640",
          height: "265",
          imgUrl: require("../../assets/web/13.jpg")
        },
        {
          id: 15,
          width: "640",
          height: "452",
          imgUrl: require("../../assets/web/15.jpg")
        },
        {
          id: 16,
          width: "640",
          height: "384",
          imgUrl: require("../../assets/web/16.jpg")
        },
        {
          id: 17,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/17.jpg")
        },
        {
          id: 18,
          width: "640",
          height: "445",
          imgUrl: require("../../assets/web/18.jpg")
        },
        {
          id: 19,
          width: "640",
          height: "395",
          imgUrl: require("../../assets/web/19.jpg")
        },
        {
          id: 20,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/20.jpg")
        }
      ],
      tabName: "classify",
      isLogin: false,
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
.tab-container ul li:active {
  animation: scaleLi 3s;
}
@keyframes scaleLi {
  0% {
    font-size: 20px;
  }
  50% {
    font-size: 128px;
  }
  100% {
    font-size: 24px;
  }
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
}
</style>
