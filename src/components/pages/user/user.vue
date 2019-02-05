<template>
  <el-card>
    <!-- 面包屑 -->
    <!-- 父传子（父传） -->
    <Mybread firstnav="用户管理" lastnav="用户列表"/>
    <el-row>
      <el-col :span="6">
        <!-- 搜索框 -->
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="search">
            <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 按钮 -->
        <el-button class="btn" type="success" plain @click="addDialog=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- 开关的状态和数据双向绑定 -->
          <!-- 编辑功能要传参（change事件） -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="openEdit(scope.row.id)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" size="mini" plain @click="del(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="warning" size="mini" plain @click="getRole(scope.row.id)">
            <i class="el-icon-check"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹出的内容 -->
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="addObj">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="addObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="addObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="addObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <!-- <el-form>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="editObj.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>-->
      <!-- ================================== 表单验证 =================================== -->
      <el-form :model="editObj" status-icon :rules="rules" ref="editObj">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="editObj.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form :model="roleObj">
        <el-form-item label="当前用户" label-width="100px">
          <!-- ============================== 怎么做成例子那样？？？ ==============================  -->
          <!-- <template slot-scope="scope">{{scope.row.username}}</template> -->
          <el-input v-model="roleObj.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select placeholder="请选择角色" v-model="roleObj.rid">
            <el-option label="请选择角色" :value="-1" disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>   <!-- 要写冒号，因为引号内是变量，不是字符串 -->
            <!-- <el-option v-for="item in roleList" :key="item.id" label={{item.roleName}} value={{item.id}}></el-option> -->   <!-- 不能这么写，插值表达式是直接输出到页面的 -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="role">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 搜索信息
      search: "",
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 数据源
      userList: [],
      // 数据的总条数
      total: 0,
      value: true,
      // 添加用户对话框
      addDialog: false,
      // 添加列表
      addObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 修改用户对话框
      editDialog: false,
      // 修改列表
      editObj: {},
      // ---------- 表单验证 ----------
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, message: "长度大于 3 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ]
      },
      // 分配角色对话框
      roleDialog: false,
      // 分配角色对话框
      roleObj: {},
      // 下拉框中的数据
      roleList: []
    };
  },
  methods: {
    // ---------- 渲染列表 ----------
    async getUserList() {
      var res = await this.$http.request({
        url: "users",
        method: "get",
        params: {
          query: this.search, // 搜索的内容
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      /* var res = await this.$http.get(
        `users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }
      ); */
      // console.log(res);
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.userList = data.users;
        // 数据的总条数
        this.total = data.total;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 改变页码   val：每页数据的条数
    sizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    // 改变当前页   val：当前页码
    currentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索
    searchList() {
      this.getUserList();
    },
    // ---------- 添加 ----------
    async add() {
      this.addDialog = false;
      var res = await this.$http.request({
        url: "users",
        method: "post",
        data: {
          ...this.addObj
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 201) {
        // 重新渲染列表
        this.getUserList();
        this.$message({
          type: "success",
          message: meta.msg
        });
      } else {
        this.$message.error(meta.msg);
      }
      this.clearData(this.addObj);
    },
    // 清除对象中的属性
    clearData(obj) {
      for (var key in obj) {
        obj[key] = "";
      }
    },
    // 添加对话框的取消功能
    addCancel() {
      // 关闭对话框
      this.addDialog = false;
      // 清空对话框
      // this.addObj = {}     //  不能这么写   data中添加列表的对象中写了属性，不能清空属性
      this.clearData(this.addObj);
    },
    // ---------- 编辑 ----------
    // 修改对话框的取消功能
    editCancel() {
      // 关闭对话框
      this.editDialog = false;
      // 清空对话框
      this.editObj = {};
    },
    // 修改用户状态
    async change(id, mg_state) {
      var res = await this.$http.request({
        url: `users/${id}/state/${mg_state}`,
        method: "put",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      // console.log(res)
      var { data, meta } = res.data;
      if (meta.status === 200) {
        mg_state = !mg_state;
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 打开修改对话框（把数据渲染到表格中）
    async openEdit(id) {
      this.editDialog = true;
      var res = await this.$http.request({
        url: `users/${id}`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.editObj = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 提交修改 【 表单验证 】
    async edit(id) {
      this.$refs.editObj.validate(async valid => {
        if (valid) {
          var res = await this.$http.request({
            url: `users/${this.editObj.id}`,
            method: "put",
            data: {
              email: this.editObj.email,
              mobile: this.editObj.mobile
            },
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          });
          // console.log(res)
          var { data, meta } = res.data;
          if (meta.status === 200) {
            // 重新渲染页面
            this.getUserList();
            this.$message({
              type: "success",
              message: meta.msg
            });
          } else {
            this.$message.error(meta.msg);
          }
        } else {
          this.$message.error("参数不合法");
        }
      });
      // 关闭对话框
      this.editDialog = false;
      // 清空对话框（数据）
      this.editObj = {};
    },
    // ---------- 删除 ----------
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.request({
            url: `users/${id}`,
            method: "delete",
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          });
          var { data, meta } = res.data;
          if (meta.status === 200) {
            this.getUserList();
            this.$message({
              type: "success",
              message: meta.msg
            });
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // ---------- 分配角色 ----------
    // 渲染角色对话框
    async getRole(id) {
      // 渲染下拉框
      this.getRoleList();
      this.roleDialog = true;
      var res = await this.$http.request({
        url: `users/${id}`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      // console.log(data)    // data 里面有 rid
      if (meta.status === 200) {
        this.roleObj = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 动态得到下拉框中的数据
    async getRoleList() {
      var res = await this.$http.request({
        url: "roles",
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      // console.log(res);
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.roleList = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    role() {
      // 关闭分配角色对话框
      this.roleDialog = false
      // 重新渲染
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style>
.btn {
  margin-top: 15px;
  margin-left: 5px;
}
</style>
