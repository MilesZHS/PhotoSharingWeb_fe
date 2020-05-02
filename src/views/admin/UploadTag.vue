<template>
  <div>
    <el-form ref="form" :model="tag" label-width="80px">
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          :data="qn"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          action="http://upload-z1.qiniup.com"
          multiple
          v-if="!tag.front_cover"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            图片大小不超过20M
          </div>
        </el-upload>
        <img
          width="360px"
          v-if="tag.front_cover"
          :src="tag.front_cover"
          alt=""
          height="180px"
          class="img-uploaded"
        />
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="tag.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
		<div>
			<ul>
				<li v-for="(item,id) in tags" :key="id">{{item.name}}</li>
			</ul>
		</div>
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../common/global.js'
export default {
  data() {
    return {
      tag: {
        name: "",
        front_cover: "",
        user_id: '',
        homeShow: true,
        width: '',
        height: '',
      },
      qn: {
        token: "",
        key: ""
			},
			imageUrl:'',
			tags: [{
				id: '',
				name: '',
				front_cover: '',
				create_time: '',
				imgNum: ''
			}]
    }
  },
  methods: {
    onSubmit() {
      const token = JSON.parse(localStorage.getItem("user"))["token"]
      const uid = JSON.parse(localStorage.getItem("user"))["id"]
      this.tag.user_id = uid
			const addReq = axios.create()
			addReq.post(global.host + 'addclassify',this.tag,{
				headers: {
					token: token
				}
			}).then(res => {
				// this.tags.push(res.data.data[0])
				this.tags.push(res.data.data)
				this.$message({
					message: res.data.message,
					type: 'success'
				})
				// console.log(res.data.data)
				// console.log(this.tags)
				this.tag = {}
			}).catch(err => {
				this.$message.error(err.response.data.message)
			})
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw) + "?imageslim"
      this.tag.front_cover = global.qiniuUrl + res.key
      this.tag.name = file.name
      const getImgInfo = axios.create()
      getImgInfo
        .get(global.qiniuUrl + res.key + "?imageInfo")
        .then(res => {
          // console.log(res)
          this.tag.width = res.data.width
          this.tag.height = res.data.height
          // console.log(this.uploadForm)
        })
        .catch(err => {
          console.log(err)
        })
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2
      this.qn.key = new Date().getTime() + "___" + file.name
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!")
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      // return isJPG && isLt20M
      return isLt2M
    }
	},
	created(){
		const token = JSON.parse(localStorage.getItem("user"))["token"]
		const getUploadToken = axios.create()
		getUploadToken.post(global.host + 'uploadtoken',{},{
			headers: {
				token: token
			}
		}).then(res => {
			this.qn.token = res.data
		}).catch(err => {
			console.log(err)
			this.$message.error('上传凭证获取失败')
		})
	}
}
</script>

<style>
</style>