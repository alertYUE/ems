<template>
  <el-container>
    <el-header>
        <!-- 头部 -->
      <Top />
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <Sidebar />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Top from "@/layout/top.vue";
import Sidebar from "@/layout/sidebar.vue";
export default {
  components: {
    Top,
    Sidebar
  }
};
</script>

<style>
</style>
