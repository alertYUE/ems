<template>
  <el-card>
    <!-- 面包屑 -->
    <Mybread firstnav="权限管理" lastnav="权限列表"/>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
</style>
