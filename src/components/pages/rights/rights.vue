<template>
  <el-card>
    <!-- 面包屑 -->
    <Mybread firstnav="权限管理" lastnav="权限列表"/>
    <!-- 表格 -->
    <el-table :data="rightsData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope='scope'>
          <span v-if="scope.row.level=='0'">一级</span>
          <span v-else-if="scope.row.level=='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightsData: []
    }
  },
  methods: {
    async getRightsList() {
      var res = await this.$http.request({
        url: 'rights/list',
        method: 'get',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
      // console.log(res)
      var {data, meta} = res.data
      if (meta.status === 200) {
        this.rightsData = data
      } else {
        this.$message.error(mete.msg)
      }
    }
  },
  mounted() {
    this.getRightsList()
  }
};
</script>

<style>
</style>
