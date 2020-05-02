<template>
  <div>
    <div class="dialog-container" v-if="dialogFormVisible">
      <el-dialog
        title="图片上传"
        :visible.sync="dialogFormVisible"
        :show-close="false"
      >
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
              height="180px"
              class="img-uploaded"
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
            <el-select
              v-model="uploadForm.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择分类标签"
            >
              <el-option
                v-for="(item, id) in classifyList.slice(0, 10)"
                :key="id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
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
          <el-button @click="shutdownDialog('pc')">取 消</el-button>
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
                height="180px"
                width="360px"
                class="img-uploaded"
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
            <el-select
              v-model="uploadForm.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择分类标签"
            >
              <el-option
                v-for="(item, id) in classifyList.slice(0, 10)"
                :key="id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首页展示" :label-width="formLabelWidthMobile">
            <el-switch
              v-model="uploadForm.homeShow"
              active-text="展示"
              inactive-text="不展示"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shutdownDialog('mobile')">取 消</el-button>
          <el-button type="primary" @click="uploadImg('mobile')"
            >确 定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import global from "../common/global.js"
import common from "../common/common.js"
import event from "../common/Event.js"
export default {
  props: ["userId", "classifyList"],
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisibleMobile: false,
      showDialog: false, //父子组件通讯
      imgUrl: "",
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
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw) + "?imageslim"
      this.uploadForm.imgUrl = global.qiniuUrl + res.key + "?imageslim"
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
    shutdownDialog(type) {
      if (type === "pc") {
        this.dialogFormVisible = false
      } else {
        this.dialogFormVisibleMobile = false
      }
      event.$emit("closeDialog", (this.showDialog = false))
    },
    uploadImg(type) {
      const uploadReq = axios.create()
      let uploadForm1 = common.deepCopy(this.uploadForm)
      uploadForm1.tags = this.uploadForm.tags.toString()
      const token = JSON.parse(localStorage.getItem("user"))["token"]
      uploadReq
        .post(global.host + "upload", uploadForm1, {
          headers: {
            token: token
          }
        })
        .then(res => {
          console.log(res.data)
          this.$message({
            message: res.data.message,
            type: "success"
          })
          if (type === "pc") {
            this.dialogFormVisible = false
          } else {
            this.dialogFormVisibleMobile = false
          }
          event.$emit("closeDialog", (this.showDialog = false))
        })
        .catch(err => {
          this.$message({
            message: err.response.data.message,
            type: "error"
          })
        })
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
    if (this.userId != null) {
      this.uploadForm.user_id = this.userId
      const token = JSON.parse(localStorage.getItem("user"))["token"]
      const id = common.getUserID()
      const getUploadToken = axios.create()
      getUploadToken
        .post(
          global.host + "uploadtoken",
          {id},
          {
            headers: {
              token: token
            }
          }
        )
        .then(res => {
          // console.log(res)
          this.qn.token = res["data"]
          this.showDialog = true
          this.screenWidth >= 768
            ? (this.dialogFormVisible = true)
            : (this.dialogFormVisibleMobile = true)
        })
        .catch(err => {
          console.log(err.response)
          this.$message.error(err.response.data.message)
        })
    }
  }
}
</script>

<style>
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
.img-uploaded {
  object-fit: contain;
}
@media screen and (max-width: 768px) {
  .dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(97, 96, 96, 0.3);
    z-index: 999;
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
}
</style>