<template>
  <div>
    <div class="download">
      <h4 style="text-align: center">滑动查看更多信息</h4>
      <el-table
        :data="
          downloadTableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="图片名称" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="下载日期" width="100">
        </el-table-column>
        <el-table-column prop="zipUrl" label="缩略图" width="80">
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="50"
              :fit="fit"
              :src="scope.row.zipUrl"
            ></el-avatar>
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
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">删除</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="handleDownloadTableClick(scope.row)"
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
      downloadTableData: [],
      fit: "cover", //el-avatar适应容器选项,
      screenWidth: "",
      downloadUrl: ""
    }
  },
  methods: {
    handleDownloadTableClick(item) {
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
      //   console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  },
  computed: {
    totalPages() {
      return this.downloadTableData.length
    }
  },
  created() {
    const token = common.getToken()
    const id = common.getUserID()
    const downReq = axios.create()
    downReq
      .get(global.host + "downloadrecord", {
        params: {
          id
        },
        headers: {
          token
        }
      })
      .then(res => {
        this.downloadTableData = res.data.data
        // console.log(this.downloadTableData)
      })
      .catch(err => {
        console.log(err.response)
      })
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
.download {
  width: 38%;
  margin: 20px auto;
}
.block {
  text-align: center;
  margin-top: 20px;
}
.download-btn {
  color: #46a1ff;
}
@media screen and (min-width: 1900px) {
  .download {
    width: 30%;
    margin: 20px auto;
  }
}
@media screen and (max-width: 1200px) {
  .download {
    width: 60%;
    margin: 20px auto;
  }
}
@media screen and (max-width: 768px) {
  .download {
    width: 100%;
  }
}
</style>