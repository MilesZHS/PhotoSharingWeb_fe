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
    </header-nav>
    <section>
      <div class="user">
        <div class="userinfo-container">
          <h3>我的信息 &nbsp;&nbsp;<span @click="updateUserInfo()">修改</span></h3>
          <div class="user-avatar">
            <div id="avatar-component">
              <avatar-upload :avatar="userInfo.avatar"></avatar-upload>
              <!-- <img :src="userInfo.avatar" alt=""> -->
            </div>
            <!-- <span>头像上传</span> -->
          </div>
          <div class="user-info">
            <table>
              <tr>
                <td>用户名:</td>
                <td>{{ userInfo.username }}</td>
              </tr>
              <tr>
                <td>性别:</td>
                <td>{{ userInfo.gender }}</td>
              </tr>
              <tr>
                <td>生日:</td>
                <td>{{ userInfo.birthday }}</td>
              </tr>
              <tr>
                <td>收到的赞:</td>
                <td>{{ userInfo.likedNum }}</td>
              </tr>
              <tr>
                <td>上传数量:</td>
                <td>{{ userInfo.uploadNum }}</td>
              </tr>
              <tr>
                <td>下载数量:</td>
                <td>{{ userInfo.downloadNum }}</td>
              </tr>
              <tr>
                <td>收藏数量:</td>
                <td>{{ userInfo.collectNum }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="question">
          <h3>常见问题 &nbsp;&nbsp;<span>更多</span></h3>
          <ul>
            <li><router-link to="/">如何上传/下载图片</router-link></li>
            <li><router-link to="/">如何查看已上传的照片</router-link></li>
            <li><router-link to="/">如何查看下载记录</router-link></li>
            <li><router-link to="/">如何把图片放到首页展示</router-link></li>
            <li><router-link to="/">如何修改用户信息</router-link></li>
          </ul>
        </div>
      </div>
      <div class="user-mobile">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <h3 style="padding-left:16px">
                我的信息 &nbsp;&nbsp;<span
                  style="font-size:12px;font-weight:normal"
                  >修改</span
                >
              </h3>
            </template>
            <div class="userinfo-container-mobile">
              <div class="avatar-wrapper-mobile">
                <img :src="userInfo.avatarUrl" alt="" />
              </div>
              <div class="avatar-aside-mobile">
                <div>
                  <span>{{ userInfo.username }}&nbsp;</span
                  ><span>{{ userInfo.gender }}</span>
                </div>
                <div>
                  <span>生日:</span><span>{{ userInfo.birthday }}</span>
                </div>
              </div>
              <div class="user-info-mobile">
                <ul>
                  <li>
                    <div><span>我的上传</span></div>
                    <div>
                      <span>{{ userInfo.uploadNum }}</span>
                    </div>
                  </li>
                  <li>
                    <div><span>我的下载</span></div>
                    <div>
                      <span>{{ userInfo.downloadNum }}</span>
                    </div>
                  </li>
                  <li>
                    <div><span>收到的赞</span></div>
                    <div>
                      <span>{{ userInfo.likeNum }}</span>
                    </div>
                  </li>
                  <li>
                    <div><span>我的收藏</span></div>
                    <div>
                      <span>{{ userInfo.collectNum }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <template slot="title">
              <h3 style="padding-left:16px">
                常见问题 &nbsp;&nbsp;<span
                  style="font-size:12px;font-weight:normal"
                  >更多</span
                >
              </h3>
            </template>
            <div class="question-mobile">
              <ul>
                <li><router-link to="/">如何上传/下载图片</router-link></li>
                <li><router-link to="/">如何查看已上传的照片</router-link></li>
                <li><router-link to="/">如何查看下载记录</router-link></li>
                <li>
                  <router-link to="/">如何把图片放到首页展示</router-link>
                </li>
                <li><router-link to="/">如何修改用户信息</router-link></li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>
    <section>
      <div class="tab-container">
        <ul>
          <li
            @click="changeTabName(item)"
            :class="{ tabActive: isTabName === item }"
            v-for="(item, index) in tabList"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
        <div id="hr"></div>
      </div>
    </section>
    <section>
      <user-upload v-if="isTabName === '上传记录'"></user-upload>
      <user-download v-if="isTabName === '下载历史'"></user-download>
      <user-like v-if="isTabName === '点赞记录'"></user-like>
      <user-liked v-if="isTabName === '收到的赞'"></user-liked>
      <user-collect v-if="isTabName === '收藏夹'"></user-collect>
    </section>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
import AvatarUpload from "../../components/avatar/AvatarUpload.vue"
import UserUpload from "../../components/user/UserUpload.vue"
import UserDownload from "../../components/user/UserDownload.vue"
import UserLike from "../../components/user/UserLike.vue"
import UserCollect from '../../components/user/UserCollect.vue'
import UserLiked from '../../components/user/UserLiked.vue'
import axios from 'axios'
import global from '../../common/global.js'
import common from '../../common/common.js'
import event from '../../common/Event.js'
export default {
  components: {
    HeaderNav,
    AvatarUpload,
    UserUpload,
    UserDownload,
    UserLike,
    UserCollect,
    UserLiked
  },
  data() {
    return {
      tabList: ["上传记录", "下载历史", "点赞记录", "收到的赞", "收藏夹"],
      isTabName: "上传记录",
      activeNames: [], //elementui折叠面板
      headerColorWhite: true,
      hideSearch: true,
      isLogin: true,
      userName: "18560677018",
      avatar: require("../../assets/logo.png"),
      userInfo: {},
      showUpdateForm: false
      // {
      //   username: "张珅",
      //   gender: "男",
      //   birthday: "1999-06-08",
      //   uploadNum: "100",
      //   downloadNum: "200",
      //   likeNum: "20",
      //   collectNum: "80",
      //   avatarUrl: require("../../assets/logo.png")
      // }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    changeTabName(item) {
      this.isTabName = item
    },
    updateUserInfo(){
    },
    changedAvatar(url){
      this.userInfo.avatar = url
      console.log('url--'+ url)
    }
  },
  created(){
    const token = common.getToken()
    const id = common.getUserID()
    const getInfoReq = axios.create()
    getInfoReq.get(global.host + 'userinfo',{
      params: {
        id
      },
      headers: {
        token
      }
    }).then(res => {
      this.userInfo = res.data.data
    })
  },
  mounted(){
    event.$on('changedAvatar',this.changedAvatar)
  },
  beforeDestroy(){
    event.$off('changedAvatar',this.changedAvatar)
  }
}
</script>

<style scoped>
section {
  width: 100%;
}
.user {
  width: 60%;
  margin: 20px auto;
  text-align: center;
}
.userinfo-container {
  width: 68%;
  display: inline-block;
  box-shadow: 0 0 4px #c4c4c4;
  border-radius: 8px;
  border: 1px solid #c4c4c4;
  height: 300px;
}
.userinfo-container h3 {
  padding: 10px 16px;
  text-align: left;
}
.userinfo-container h3 span {
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
}
.user-avatar {
  width: 50%;
  display: inline-block;
  text-align: center;
}
.user-info {
  width: 50%;
  display: inline-block;
  text-align: right;
}
.user-info table {
  width: 80%;
  margin: 0 auto;
}
.user-info table tr {
  height: 30px;
  line-height: 30px;
}
.user-info table tr td:first-child {
  text-align: right;
}
.user-info table tr td:last-child {
  padding-left: 20px;
  text-align: left;
}
.question {
  width: 30%;
  display: inline-block;
  border: 1px solid #c4c4c4;
  margin-left: 10px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 0 4px #c4c4c4;
  vertical-align: bottom;
}
.question h3 {
  padding-top: 16px;
}
.question h3 span {
  font-size: 12px;
  font-weight: normal;
}
.question ul {
  list-style: none;
  padding-top: 10px;
}
.question ul li {
  width: 80%;
  margin: 0% auto;
  height: 36px;
  line-height: 36px;
}
.question ul li a {
  color: #848484;
  text-decoration: none;
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
.user-mobile {
  display: none;
}
.tab-container {
  width: 40%;
  margin: 0 auto;
}
.tab-container ul {
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.tab-container ul li {
  text-align: center;
  /* width: 20%; */
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-bottom: 2px solid #c4c4c4;
}
.tabActive {
  color: #ff1b89;
  border-bottom: 2px solid #ff1b89 !important;
}
#hr {
  border-top: 2px solid #c4c4c4;
  margin-top: -2px;
}
@media screen and (max-width: 1200px) {
  #username {
    color: #848484;
  }
  .user {
    width: 94%;
    margin: 20px auto;
  }
}
@media screen and (max-width: 768px) {
  #username {
    color: #848484;
  }
  .user {
    /* width: 90%;
    margin: 0 auto; */
    display: none;
  }
  .user-mobile {
    display: block;
  }
  .avatar-wrapper-mobile {
    width: 50px;
    height: 50px;
    overflow: hidden;
    padding-left: 16px;
    display: inline-block;
  }
  .avatar-wrapper-mobile img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  .avatar-aside-mobile {
    width: 60%;
    margin: 0px 8px;
    display: inline-block;
    vertical-align: text-bottom;
    padding-bottom: 6px;
  }
  .avatar-aside-mobile div span {
    margin-left: 8px;
  }
  .user-info-mobile {
    width: 96%;
    margin: 0 auto;
  }
  .user-info-mobile ul {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .user-info-mobile ul li {
    width: 25%;
    text-align: center;
  }
  .question-mobile {
    width: 100%;
  }
  .question-mobile ul {
    list-style: none;
    margin-left: 16px;
  }
  .question-mobile ul li {
    height: 24px;
    line-height: 24px;
  }
  .question-mobile ul li a {
    text-decoration: none;
    color: #848484;
  }
  .tab-container {
    width: 100%;
    margin: 0 auto;
  }
}
</style>