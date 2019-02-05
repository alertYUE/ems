<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 点击首页可跳转 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{firstnav}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{lastnav}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    name: 'Mybread',   // 定义一个组件名属性，组件名不固定写死，在把面包屑注册为全局组件时，组件名写bread.name
    props: ['firstnav', 'lastnav']   // 组件传参：父传子（子接）
};
</script>

<style>
</style>
