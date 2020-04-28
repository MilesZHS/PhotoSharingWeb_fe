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
    <div class="dialog-container" v-if="dialogFormVisible">
      <el-dialog title="图片上传" :visible.sync="dialogFormVisible">
        <el-form :model="uploadForm">
          <el-form-item :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              drag
              :data="qn"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              action="http://upload-z1.qiniup.com"
              multiple
              v-if="!uploadForm.imgUrl"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                图片大小不超过20M
              </div>
            </el-upload>
            <!-- <el-dialog :visible.sync="uploadForm.imgUrl !== ''">
                
              </el-dialog> -->
            <img
              width="360px"
              v-if="uploadForm.imgUrl"
              :src="uploadForm.imgUrl"
              alt=""
            />
          </el-form-item>
          <el-form-item label="图片名称" :label-width="formLabelWidth">
            <el-input
              v-model="uploadForm.name"
              autocomplete="off"
              style="width:360px"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片标签" :label-width="formLabelWidth">
            <el-tag
              :key="tag"
              v-for="tag in uploadForm.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="首页展示" :label-width="formLabelWidth">
            <el-switch
              v-model="uploadForm.homeShow"
              active-text="展示"
              inactive-text="不展示"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadImg('pc')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-container" v-if="dialogFormVisibleMobile">
      <div class="dialog-wrapper">
        <el-form :model="uploadForm">
          <el-form-item :label-width="uploadLabelWidth">
            <div class="upload-el-wrapper">
              <el-upload
                :data="qn"
                v-if="!uploadForm.imgUrl"
                class="upload-demo"
                drag
                action="http://upload-z1.qiniup.com"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <img
                v-if="uploadForm.imgUrl"
                :src="uploadForm.imgUrl"
                width="360px"
              />
            </div>
          </el-form-item>
          <el-form-item label="图片名称" :label-width="formLabelWidthMobile">
            <el-input
              v-model="uploadForm.name"
              style="width:300px"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片标签" :label-width="formLabelWidthMobile">
            <el-tag
              :key="tag"
              v-for="tag in uploadForm.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="首页展示" :label-width="formLabelWidthMobile">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleMobile = false">取 消</el-button>
          <el-button type="primary" @click="uploadImg('mobile')"
            >确 定</el-button
          >
        </div>
      </div>
    </div>
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
import PageFooter from "../../components/PageFooter.vue"
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
    PageFooter
  },
  data() {
    return {
      tabName: "classify",
      dialogFormVisible: false,
      dialogFormVisibleMobile: false,
      imgUrl: "",
      isLogin: false,
      userName: "",
      userId: "",
      avatar: "",
      uploadForm: {
        imgUrl: "",
        name: "",
        tags: [],
        user_id: "",
        homeShow: true,
        width: "",
        height: ""
      },
      inputVisible: false,
      inputValue: "",
      formLabelWidth: "220px",
      formLabelWidthMobile: "80px",
      uploadLabelWidth: "20px",
      screenWidth: "",
      qn: {
        token: "",
        key: ""
      }
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
    handleClose(tag) {
      this.uploadForm.tags.splice(this.uploadForm.tags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.uploadForm.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ""
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw) + '?imageslim'
      this.uploadForm.imgUrl = global.qiniuUrl + res.key
      this.uploadForm.name = file.name
      const getImgInfo = axios.create()
      getImgInfo
        .get(global.qiniuUrl + res.key + "?imageInfo")
        .then(res => {
          // console.log(res)
          this.uploadForm.width = res.data.width
          this.uploadForm.height = res.data.height
          // console.log(this.uploadForm)
        })
        .catch(err => {
          console.log(err)
        })
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg"
      const isLt20M = file.size / 1024 / 1024 < 20
      this.qn.key = new Date().getTime() + "___" + file.name
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!")
      // }
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 20MB!")
      }
      // return isJPG && isLt20M
      return isLt20M
    },
    showDialog() {
      if (this.userId != null) {
        this.uploadForm.user_id = this.userId
        const token = JSON.parse(localStorage.getItem("user"))["token"]
        const getUploadToken = axios.create()
        getUploadToken
          .post(
            global.host + "uploadtoken",
            {},
            {
              headers: {
                token: token
              }
            }
          )
          .then(res => {
            this.qn.token = res["data"]
            this.screenWidth >= 768
              ? (this.dialogFormVisible = true)
              : (this.dialogFormVisibleMobile = true)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    logout() {
      localStorage.removeItem("user")
      this.$router.push("/identity")
    },
    uploadImg(type) {
      const uploadReq = axios.create()
      const uploadForm1 = common.deepCopy(this.uploadForm)
      const token = JSON.parse(localStorage.getItem("user"))["token"]
      uploadReq
        .post(global.host + "upload", uploadForm1, {
          headers: {
            token: token
          }
        })
        .then(res => {
          console.log(res)
          if (type === "pc") {
            this.dialogFormVisible = false
          } else {
            this.dialogFormVisibleMobile = false
          }
        })
        .catch(err => {
          console.log(err.response)
        })
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
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
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
  z-index: 999999;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/* .dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(97, 96, 96, 0.3);
  z-index: 999999;
}
.dialog-wrapper {
  width: 500px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -350px;
  margin-left: -300px;
  background-color: white;
  padding: 50px 50px 50px 50px;
} */
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
  .dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(97, 96, 96, 0.3);
    z-index: 999999;
  }
  .dialog-wrapper {
    width: 100%;
    height: 500px;
    position: absolute;
    top: 50%;
    margin-top: -300px;
    background-color: white;
    padding: 20px 20px 20px 20px;
  }
  /* .upload-el-wrapper {
    width: 260px !important;
    overflow: hidden;
  } */
}
</style>
