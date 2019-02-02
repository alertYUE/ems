<template>
  <el-row>
    <el-col :span="8">
      <img src="@/assets/images/logo.png" alt>
    </el-col>
    <el-col :span="8">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col :span="8">
      <a href="#" @click="logout">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$http.request({
        url: ''
      })
    }
  }
};
</script>

<style>
.el-header {
  height: 60px;
  line-height: 60px;
  background-color: #b3c0d1;
  color: #fff;
  padding: 0;
}
h2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.el-header a {
  position: absolute;
  right: 0;
  color: #fff;
}
</style>
