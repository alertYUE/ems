<template>
  <el-card>
    <!-- 面包屑 -->
    <Mybread firstnav="权限管理" lastnav="角色列表"/>
    <!-- 按钮 -->
    <el-button>添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="rolesData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 遍历数据源生成一级权限 -->
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="5">
              <el-tag
                closable
                @close="deleteRights(scope.row.id, item1.id, scope.row)"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="19">
              <!-- 遍历数据源生成二级权限 -->
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="deleteRights(scope.row.id, item2.id, scope.row)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <!-- 遍历数据源生成三级权限（不能在row上遍历，会产生多行） -->
                  <el-tag
                    @close="deleteRights(scope.row.id, item3.id, scope.row)"
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length == 0">没有分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain>
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" size="mini" plain>
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="warning" size="mini" plain @click="setRole(scope.row.children)">
            <i class="el-icon-check"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="rightsDialog" width="30%">
      <!-- default-checked-keys：默认选中节点的 key 集合 -->
      <el-tree
        :data="rightsTree"
        show-checkbox
        node-key="id"
        :props="roleProps"
        default-expand-all
        :default-checked-keys="defaultCheck"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRights">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesData: [],
      // 权限分配对话框
      rightsDialog: false,
      // 权限分配树
      rightsTree: [],
      roleProps: {
        children: "children",
        authName: "authName"
      },
      defaultCheck: []
    };
  },
  methods: {
    // ----- 渲染角色数据 -----
    async getRolesList() {
      var res = await this.$http.request({
        url: "roles",
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { data, meta } = res.data;
      // console.log(data);
      if (meta.status === 200) {
        this.rolesData = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // ----- 删除功能 -----
    async deleteRights(roleId, rightId, dataList) {
      var res = await this.$http.request({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "delete",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      // console.log(res)
      var { data, meta } = res.data;
      if (meta.status === 200) {
        // 重新渲染表格会刷新页面，但这里不想刷新页面，所以动态给数据源重新赋值
        // this.getRolesList()
        // console.log(data)
        dataList.children = data; // 为什么要 .children？？？   传入的scope.row是渲染时的数据，这里的data是删除时的数据
        this.$message({
          type: "success",
          message: meta.msg
        });
      } else {
        this.$message.error(meta.msg);
      }
    },
    // ----- 权限分配 -----
    // 打开对话框
    setRole(rights) {
      // 清空数组
      this.defaultCheck = []
      // 打开对话框
      this.rightsDialog = true;
      // 获取权限数据
      this.getAllRights();
      // console.log(rights)
      rights.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            this.defaultCheck.push(item3.id)
          })
        })
      })
    },
    // 获取权限数据
    async getAllRights() {
      var res = await this.$http.request({
        url: `rights/tree`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      // console.log(data);
      if (meta.status === 200) {
        this.rightsTree = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 设置权限
    async setRights() {
      var res = await this.$http.request({
        url: `roles/${roleId}/rights`,
        method: "post",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      console.log(res);
    }
  },
  mounted() {
    this.getRolesList();
  }
};
</script>

<style>
.el-button {
  margin-top: 15px;
}
</style>
