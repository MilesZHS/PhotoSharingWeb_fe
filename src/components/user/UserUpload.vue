<template>
  <div>
    <div class="upload">
      <h4 style="text-align: center">滑动查看更多信息</h4>
      <el-table
        :data="
          uploadTableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        ref="multipleTable"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="图片名称" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="上传日期" width="100">
        </el-table-column>
        <el-table-column prop="zipUrl" label="缩略图" width="120">
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="50"
              :fit="fit"
              :src="scope.row.zipUrl"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="download" label="下载次数" width="100">
        </el-table-column>
        <el-table-column prop="like" label="点赞次数" width="100">
        </el-table-column>
        <el-table-column prop="collect" label="收藏次数" width="100">
        </el-table-column>
        <el-table-column prop="homeShow" label="首页展示" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.homeShow" disabled> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="300">
          <template slot-scope="scope">
            <el-tag
              v-for="(item, index) in scope.row.tags"
              :key="index"
              style="margin-right:10px"
              >{{ item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="dialogFormShow(scope.row,scope.$index)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleUploadTableClick(scope.row)"
            >
              <a :href="downloadUrl" class="download-btn">
                下载
              </a>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div id="pagination-pc" v-if="screenWidth > 768">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPages"
          >
          </el-pagination>
        </div>
        <div id="pagination-mobile" v-if="screenWidth <= 768">
          <el-pagination
            background
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="totalPages"
          >
          </el-pagination>
        </div>
      </div>
      <div class="editform-container" v-if="dialogFormVisible" :style="{height: this.screenHeight + 'px'}">
        <div class="editform-wrapper">
          <el-form :model="editForm">
            <el-form-item>
              <img :src="editForm.imgUrl" alt="" class="edit-img"/>
            </el-form-item>
            <el-form-item label="图片名称" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="上传时间" :label-width="formLabelWidth">
              <el-input v-model="editForm.create_time" disabled style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="首页显示" :label-width="formLabelWidth">
              <el-switch v-model="editForm.homeShow" style="width:200px"> </el-switch>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth">
              <el-tag
                :key="tag"
                v-for="tag in editForm.tags"
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
                 style="width:200px"
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
            <el-form-item>
              <el-button @click="cancelChange()">取 消</el-button>
              <el-button type="primary" @click="submitChange()"
                >确 定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../common/common.js"
import global from "../../common/global.js"
import axios from "axios"
export default {
  data() {
    return {
      currentPage: 1, //当前页码
      pageSize: 5, //一页展示几条数据
      uploadTableData: [],
      fit: "cover", //el-avatar适应容器选项,
      screenWidth: "",
      screenHeight: '',
      dialogFormVisible: false,
      editForm: {},
      editFormCopy: {},
      editFormCopy1: {},
      editIndex: 0,
      index: 0,
      formLabelWidth: "80px",
      inputVisible: false,
      inputValue: "",
      downloadUrl: ""
    }
  },
  methods: {
    handleUploadTableClick(item) {
      // console.log(row)
      const name = item.imgUrl.split("/").pop()
      const name1 = name.split("?").shift()
      const a = item.imgUrl.split("?")
      const newUrl = a[0]
      this.downloadUrl = newUrl + "?attname=" + encodeURI(name1)
      console.log(this.downloadUrl)
      let res = common.addDownload(item.id)
      res.then(result => {
        item.download = result
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    dialogFormShow(item,index) {
      this.dialogFormVisible = true
      this.editForm = common.deepCopy(item)
      this.editForm.tags = Object.values(this.editForm.tags)
      this.editIndex = index
    },
    handleClose(tag) {
      console.log(this.editForm['tags'])
      this.editForm.tags.splice(this.editForm.tags.indexOf(tag), 1)
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
        this.editForm.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ""
    },
    cancelChange() {
      this.dialogFormVisible = false
    },
    submitChange() {
      const token = common.getToken()
      const req = axios.create()
      req.post(global.host + 'updateimginfo',{
        id: this.editForm.id,
        name: this.editForm.name,
        tags: this.editForm.tags.join(','),
        homeShow: this.editForm.homeShow
      },{
        headers: {
          token
        }
      }).then(res => {
        res.data.data[0].homeShow = res.data.data[0].homeShow === 1 ? true : false
        this.uploadTableData[this.editIndex] = res.data.data[0]
        // console.log(this.uploadTableData[this.editIndex])
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err.response)
      })
      
    },
    deepCopy(obj = {}) {
      if (typeof obj !== "object" || obj == null) {
        return obj
      }
      let res
      if (obj instanceof Array) {
        res = []
      }
      if (obj instanceof Object) {
        res = {}
      }
      for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          res[key] = this.deepCopy(obj[key])
        }
      }
      return res
    }
  },
  computed: {
    totalPages() {
      return this.uploadTableData.length
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight
    }
  },
  created() {
    const token = common.getToken()
    const id = common.getUserID()
    const getUploadRecord = axios.create()
    getUploadRecord
      .get(global.host + "uploadrecord", {
        params: {
          id
        },
        headers: {
          token
        }
      })
      .then(res => {
        // let result = res.data.data
        this.uploadTableData = res.data.data
        for (let i = 0; i < this.uploadTableData.length; i++) {
          this.uploadTableData[i].homeShow =
            this.uploadTableData[i].homeShow === 1 ? true : false
        }
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>

<style scoped>
.upload {
  width: 60%;
  margin: 20px auto;
}
.block {
  text-align: center;
  margin-top: 20px;
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
.download-btn {
  color: #46a1ff;
}
.editform-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(54, 54, 54, 0.8);
  z-index: 99999;
}
.editform-wrapper{
  position: fixed;
  width: 320px;
  height: 640px;
  top: 50%;
  left: 50%;
  margin-top: -320px;
  margin-left: -160px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
}
.edit-img{
  width: 80%;
  margin: 0 10%;
}
@media screen and (min-width: 1900px) {
  .upload {
    width: 46%;
    margin: 20px auto;
  }
}
@media screen and (max-width: 1200px) {
  .upload {
    width: 80%;
    margin: 20px auto;
  }
}
@media screen and (max-width: 768px) {
  .upload {
    width: 100%;
  }
}
</style>