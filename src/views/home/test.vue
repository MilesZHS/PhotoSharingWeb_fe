<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="battery_min" label="最小值" width="180" />
      <el-table-column prop="battery_max" label="最大值" width="180" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="
              handleEdit(scope.$index, scope.row)
              dialogFormVisible = true
            "
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="阈值详情">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="阈值最小值">
          <el-input v-model="form.battery_min" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="阈值最大值">
          <el-input v-model="form.battery_max" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false
            updateBattery(form.battery_min, form.battery_max)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          battery_min: "10",
          battery_max: "20"
        }
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {}
    }
  },
  created() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      //row是该行tableData对应的一行
      this.form = row
    },
  }
}
</script>