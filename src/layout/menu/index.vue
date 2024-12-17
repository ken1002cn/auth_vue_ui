<template>
 <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="1" disabled>
          <el-icon><document /></el-icon>
          <span>名称占位</span>
        </el-menu-item>

        <el-menu-item index="2" @click="toMainPage">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="3" @click="toTravelPage">
          <el-icon><icon-menu /></el-icon>
          <span>风景名胜</span>
        </el-menu-item>
      
        <el-menu-item index="4" @click="toUserPage">
          <el-icon><setting /></el-icon>
          <span>个人中心</span>
        </el-menu-item>

        <el-menu-item index="4" @click="toSerch">
          <el-icon><setting /></el-icon>
          <span>智能搜索</span>
        </el-menu-item>
      </el-menu>
</template>
 
<script>
import router from '@/router';

export default {
  name: "Header",
  data() {
    return {
      username: ""
    };
  },
  created() {
   
  },
  methods: {
    toMainPage() {
      router.replace("/");
    },
    toTravelPage(){
      router.replace("/travel");
    },
    toUserPage(){
      router.replace("/user");
    },
    toSerch(){
      router.replace("/travel/search");
    }
  }
};
</script>
 
<style lang="scss" scoped>
 
</style>
 