<template>
  <el-container>
    <el-header>
        <!-- 头部 -->
      <Top />
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Top from "@/layout/top.vue";
export default {
  components: {
    Top
  }
};
</script>

<style>
</style>
