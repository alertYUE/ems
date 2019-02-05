<template>
  <el-row>
    <el-col :span="8">
      <img src="@/assets/images/logo.png" alt>
    </el-col>
    <el-col :span="8">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col :span="8">
      <a href="#" @click.prevent="logout">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除token
          window.localStorage.removeItem('token')
          // 跳转回登录页
          this.$router.push('/login')
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
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
