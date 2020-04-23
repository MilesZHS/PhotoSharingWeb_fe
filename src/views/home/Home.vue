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
            <div id="classify-left">
              <ul>
                <li
                  v-for="(item, index) in classifyList"
                  :key="index"
                  @click="chooseClassifyItem(item)"
                  :class="{ classifyActive: classifyItemChoosed === item }"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div id="classify-right">
              <ul
                id="classify-waterfall"
                v-show="
                  classifyItemChoosed === '' || classifyItemChoosed === '全部'
                "
              >
                <li v-for="(item, id) in imgList" :key="id">
                  <img v-lazy="item.imgUrl" alt="" />
                </li>
              </ul>
              <div
                v-for="(item, tagName) in classifyItemImgList"
                :key="tagName"
              >
                <ul
                  id="classify-waterfall"
                  v-if="item.tagName === classifyItemChoosed"
                >
                  <li v-for="(imgItem, id) in item.imgList" :key="id">
                    <img v-lazy="imgItem.imgUrl" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div id="top-ten" v-if="tabName === 'top-ten'">
            <div class="card-content" v-for="(item, id) in topTen" :key="id">
              <div class="medal">
                <img width="48px" :src="medal.goldImg" alt="" v-if="item.sort === 1">
                <img width="36px" :src="medal.silverImg" alt="" v-if="item.sort === 2">
                <img width="24px" :src="medal.copperImg" alt="" v-if="item.sort === 3">
              </div>
              <el-card :body-style="{ padding: '0px' }">
                <div class="image-wrapper">
                  <img v-lazy="item.imgUrl" class="image" />
                </div>                
                <div style="padding: 14px;">
                  <span>{{item.imgName}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.create_time }}</time>
                    <div class="top-ten-btn-group">
                      <div id="like-btn" :class="{topTenBtnActive:item.isLike}" @click="topTenLike(item)">
                        <span class="iconfont icon-tubiao_dianzan"></span>
                      </div>
                      <span>{{item.like}}</span>
                      <div id="download-btn" :class="{topTenBtnActive:item.isDownload}" @click="topTenDownload(item)"><span class="iconfont icon-tubiao_xiazai"></span></div>
                      <span>{{item.download}}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
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
import "../../assets/css/animate.min.css"
export default {
  components: {
    HeaderNav,
    HomeCarousel
  },
  data() {
    return {
      medal: {
        goldImg: require('../../assets/web/gold.png'),
        silverImg: require('../../assets/web/silver.png'),
        copperImg: require('../../assets/web/copper.png')
      },
      topTen: [
        {
          id: 1,
          imgUrl: require("../../assets/web/1.jpg"),
          create_time: '2020-4-23',
          imgName: 'xxx',
          username: 'xxxxx',
          download: '48',
          like: '10972',
          sort: 1,
          isDownload: false,
          isLike:false
        },{
          id: 2,
          imgUrl: require("../../assets/web/2.jpg"),
          create_time: '2020-4-20',
          imgName: 'xxx2',
          username: 'xxxxx',
          download: '47',
          like: '1088',
          sort: 2,
          isDownload: false,
          isLike:false
        },{
          id: 3,
          imgUrl: require("../../assets/web/3.jpg"),
          create_time: '2020-4-11',
          imgName: 'xxx3',
          username: 'xxxxx',
          download: '12',
          like: '888',
          sort: 3,
          isDownload: false,
          isLike:false
        },{
          id: 4,
          imgUrl: require("../../assets/web/4.jpg"),
          create_time: '2020-4-21',
          imgName: 'xxx4',
          username: 'xxxxx4',
          download: '10',
          like: '800',
          sort: 4,
          isDownload: false,
          isLike:false
        },{
          id: 5,
          imgUrl: require("../../assets/web/5.jpg"),
          create_time: '2020-4-6',
          imgName: 'xxx5',
          username: 'xxxxx5',
          download: '8',
          like: '666',
          sort: 5,
          isDownload: false,
          isLike:false
        },{
          id: 6,
          imgUrl: require("../../assets/web/6.jpg"),
          create_time: '2020-4-23',
          imgName: 'xxx',
          username: 'xxxxx',
          download: '48',
          like: '10972',
          sort: 6,
          isDownload: false,
          isLike:false
        },{
          id: 7,
          imgUrl: require("../../assets/web/7.jpg"),
          create_time: '2020-4-20',
          imgName: 'xxx2',
          username: 'xxxxx',
          download: '47',
          like: '1088',
          sort: 7,
          isDownload: false,
          isLike:false
        },{
          id: 8,
          imgUrl: require("../../assets/web/8.jpg"),
          create_time: '2020-4-11',
          imgName: 'xxx3',
          username: 'xxxxx',
          download: '12',
          like: '888',
          sort: 8,
          isDownload: false,
          isLike:false
        },{
          id: 9,
          imgUrl: require("../../assets/web/9.jpg"),
          create_time: '2020-4-21',
          imgName: 'xxx4',
          username: 'xxxxx4',
          download: '10',
          like: '800',
          sort: 9,
          isDownload: false,
          isLike:false
        },{
          id: 10,
          imgUrl: require("../../assets/web/10.jpg"),
          create_time: '2020-4-6',
          imgName: 'xxx5',
          username: 'xxxxx5',
          download: '8',
          like: '666',
          sort: 10,
          isDownload: false,
          isLike:false
        }
      ],
      classifyItemChoosed: "",
      classifyList: [
        "抗疫",
        "风光",
        "建筑",
        "人像",
        "卡通",
        "艺术",
        "设计",
        "商务",
        "节日",
        "美食",
        "动物",
        "植物",
        "全部"
      ],
      classifyItemImgList: [
        {
          tagName: "抗疫",
          imgList: [
            {
              id: 1,
              imgUrl: require("../../assets/web/1.jpg")
            }
          ]
        },
        {
          tagName: "风光",
          imgList: [
            {
              id: 2,
              imgUrl: require("../../assets/web/2.jpg")
            }
          ]
        }
      ],
      imgList: [
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
        },
        {
          id: 21,
          width: "640",
          height: "320",
          imgUrl: require("../../assets/web/10.jpg")
        },
        {
          id: 22,
          width: "640",
          height: "640",
          imgUrl: require("../../assets/web/11.jpg")
        },
        {
          id: 23,
          width: "640",
          height: "265",
          imgUrl: require("../../assets/web/13.jpg")
        },
        {
          id: 24,
          width: "640",
          height: "452",
          imgUrl: require("../../assets/web/15.jpg")
        },
        {
          id: 25,
          width: "640",
          height: "384",
          imgUrl: require("../../assets/web/16.jpg")
        },
        {
          id: 26,
          width: "640",
          height: "426",
          imgUrl: require("../../assets/web/17.jpg")
        },
        {
          id: 27,
          width: "640",
          height: "445",
          imgUrl: require("../../assets/web/18.jpg")
        },
        {
          id: 28,
          width: "640",
          height: "395",
          imgUrl: require("../../assets/web/19.jpg")
        },
        {
          id: 29,
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
  },
  methods: {
    chooseClassifyItem(item) {
      this.classifyItemChoosed = item
    },
    topTenLike(item){
      if(item.isLike === true){
        item.isLike = false
        item.like = (parseInt(item.like) - parseInt(1)).toString()
      }else{
        item.isLike = true
        item.like = (parseInt(item.like) + parseInt(1)).toString()
      }
    },
    topTenDownload(item){
      if(item.isDownload === true){
        item.isDownload = false
        item.download = (parseInt(item.download) - parseInt(1)).toString()
      }else{
        item.isDownload = true
        item.download = (parseInt(item.download) + parseInt(1)).toString()
      }
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
#classify-waterfall li img:hover{
  transform: scale(1.5);
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
#top-ten{
  width: 90%;
  margin: 0% auto;
  display: flex;
  flex-wrap: wrap;
}
.medal{
  position: absolute;
  width: 48px;
  /* top: 4px;
  left: 4px; */
  z-index: 999;
}
.medal img{
  /* width: 100%; */
  margin-top: 10px;
  margin-left: 10px;
}
#top-ten::after{
  content: '';
  flex-grow: 9999;
}
.card-content{
  height: 280px;
  padding: 16px 8px;
  flex-grow: 1;
  overflow: hidden;
}
.image-wrapper{
  height: 180px;
  overflow: hidden;
}
.card-content .image{
  height: 180px;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 500ms;
}
.card-content .image:hover{
  transform: scale(1.5);
}
.top-ten-btn-group{
  width: 60%;
  float: right;
  text-align: right;
  padding-bottom: 10px;
}
.top-ten-btn-group div{
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
.top-ten-btn-group>span{
  margin-right: 10px;
}
.topTenBtnActive{
  color: white;
  background-color: #ff1b89;
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
