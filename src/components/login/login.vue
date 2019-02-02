<template>
  <div>
    <el-form
      class="login"
      status-icon
      label-position="top"
      :rules="rules"
      ref="loginRule"
      label-width="80px"
      :model="loginObj"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginObj.username" style="width:500px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginObj.password" style="width:500px" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:500px" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginObj: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginRule.validate(async valid => {
        if (valid) {
          // 成功
          var res = await this.$http.post("login", this.loginObj);
          var { meta, data } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
            // 保存数据到token
            window.localStorage.setItem("token", data.token);
            // 跳转
            this.$router.push("home");
          } else {
            this.$message.error(meta.msg);
          }
        } else {
          // 失败
          this.$message.error('参数不合法');
        }
      });

      // ----------------------
      // 错错错
      /* this.$refs.loginRule.validate(async valid => {
        if (valid) {
          var res = await this.$http.request({
            url: "login",
            method: "post",
            data: {...this.loginObj}
          });
          console.log(res)
          var { meta, data } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
            // 保存登录信息到token
            window.localStorage.setItem("token", data.token);
            // 登陆成功跳转到home页
            this.$router.push("home");
          } else {
            this.$message.error(meta.msg);
          }
        } else {
          this.$message.error("参数不合法");
        }
      }); */
    }
  }
};
</script>

<style>
body {
  position: relative;
  background-color: #324152;
}
.login {
  padding: 40px;
  position: absolute;
  left: 50%;
  /* top:50%; */
  transform: translateX(-50%);
  background-color: #fff;
}
</style>