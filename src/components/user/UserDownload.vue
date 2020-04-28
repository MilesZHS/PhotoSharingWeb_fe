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
        <el-table-column prop="name" label="图片名称" width="100">
        </el-table-column>
        <el-table-column prop="download_time" label="下载日期" width="100">
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
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleDownloadTableClick(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
            <el-button type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div id="pagination-pc" v-if="screenWidth > 768">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 10, 50, 100]"
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
export default {
  data() {
    return {
      currentPage: 1, //当前页码
      pageSize: 1, //一页展示几条数据
      downloadTableData: [
        {
          name: "vuex",
          download_time: "2020-04-24",
          zipUrl: require("../../assets/logo.png"),
          tags: ["抗疫", "风光", "建筑", "人像"]
        },
        {
          name: "vuex",
          download_time: "2020-04-24",
          zipUrl: require("../../assets/logo.png"),
          tags: ["抗疫", "风光", "建筑", "人像"]
        },
        {
          name: "vuex",
          download_time: "2020-04-24",
          zipUrl: require("../../assets/logo.png"),
          tags: ["抗疫", "风光", "建筑", "人像"]
        }
      ],
      fit: "cover", //el-avatar适应容器选项,
      screenWidth: ""
    }
  },
  methods: {
    handleDownloadTableClick(row) {
      console.log(row)
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
      return parseInt(
        this.downloadTableData.length % this.pageSize === 0
          ? this.downloadTableData.length / this.pageSize
          : this.downloadTableData.length / this.pageSize + 1
      )
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
.download {
  width: 38%;
  margin: 20px auto;
}
.block {
  text-align: center;
  margin-top: 20px;
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