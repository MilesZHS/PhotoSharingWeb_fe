<template>
  <div class="liked">
    <el-table :data="tableData" :show-header="false" style="width: 100%">
      <el-table-column label="日期" width="80" fixed="left">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="50"
            :fit="fit"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column width="350">
        <template slot-scope="scope">
          <ul style="list-style: none">
            <li>{{ scope.row.username }}</li>
            <li>{{ scope.row.create_time }}</li>
          </ul>
        </template>
      </el-table-column>
			<el-table-column align="center">
        <template slot-scope="">
          <div class="like-btn">
						<span class="iconfont icon-tubiao_dianzan"></span>
					</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="80" align="right">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="60"
            :fit="fit"
            :src="scope.row.zipUrl"
          ></el-avatar>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import common from '../../common/common.js'
import global from '../../common/global.js'
import axios from 'axios'
export default {
  data() {
    return {
      fit: "cover",
      tableData: [
        // {
        //   username: "zhangsan",
        //   avatar: require("../../assets/logo.png"),
        //   create_time: "2014-04-20",
				// 	zipUrl: require("../../assets/logo.png"),
				// 	empty: ''
        // }
      ]
    }
  },
  created(){
    const token = common.getToken()
    const id = common.getUserID()
    const req = axios.create()
    req.get(global.host + 'likedrecord',{
      params: {
        id
      },
      headers: {
        token
      }
    }).then(res => {
      this.tableData = res.data.data
    }).catch(err => {
      console.log(err.response)
    })
  }
}
</script>

<style scoped>
.liked {
  width: 40%;
  margin: 20px auto;
  /* border: 1px solid red; */
}
.like-btn{
	width: 36px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	border-radius: 50%;
	background-color: #ff1b89;
	color: white;
}
@media screen and (max-width: 1200px) {
	.liked{
		width: 60%;
	}
}
@media screen and (max-width: 768px) {
	.liked{
		width: 100%;
	}
}
</style>