<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="qn"
      action="http://upload-z1.qiniup.com"
    >
      <img v-if="url" :src="url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import common from "../../common/common.js"
import global from "../../common/global.js"
import axios from "axios"
import event from '../../common/Event.js'
export default {
  props: ["avatar"],
  data() {
    return {
      imageUrl: require("../../assets/logo.png"),
      qn: {
        token: "",
        key: ""
      },
      url: ''
      // avatarUrl: this.avatar
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw) + "?imageslim"
      this.url = global.qiniuUrl + res.key + "?imageslim"
      const id = common.getUserID()
      const updateReq = axios.create()
      updateReq
        .post(
          global.host + "updateavatar",
          {
            id,
            avatar: this.url
          },
          {
            headers: {
              token: common.getToken()
            }
          }
        )
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          })
        })
        .catch(err => {
          console.log(err)
        })
      event.$emit("changedAvatar", this.url)
      console.log(this.url)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      this.qn.key = new Date().getTime() + "___" + file.name

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isLt2M
    }
  },
  watch: {
    avatar: function(val){
      this.url = val
    }
  },
  mounted() {
    const token = common.getToken()
    const getUploadToken = axios.create()
    getUploadToken
      .post(
        global.host + "avatartoken",
        {},
        {
          headers: {
            token
          }
        }
      )
      .then(res => {
        // console.log(res)
        this.qn.token = res["data"]
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>

<style>
/* 头像上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>