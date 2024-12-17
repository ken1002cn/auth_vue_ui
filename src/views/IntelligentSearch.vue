<template>
    <div class="travel-recommend">
      <h2>智能推荐</h2>
  
      <div class="input-section">
        <el-input
          v-model="userInput"
          placeholder="请输入您的旅行想法或要求，如‘我想去海边放松几天’"
          :rows="3"
          type="textarea"
        ></el-input>
        <el-button type="primary" @click="fetchRecommendations" :loading="loading">
          获取推荐
        </el-button>
      </div>
  
      <div v-if="loading" class="loading">
        <el-icon><Loading /></el-icon> 正在获取推荐，请稍候...
      </div>
  
      <div v-if="error" class="error">
        <el-alert title="获取推荐失败，请重试！" type="error" show-icon></el-alert>
      </div>
  
      <div v-if="recommendation" class="results">
        <h3>推荐的旅行想法：</h3>
        <el-alert :title="recommendation" type="success" show-icon></el-alert>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Loading } from '@element-plus/icons-vue';
  import request from '@/util/request';
  export default {
    name: "TravelRecommend",
    data() {
      return {
        userInput: "",
        loading: false,
        error: false,
        recommendation: null,
      };
    },
    methods: {
      async fetchRecommendations() {
        if (!this.userInput) {
          this.$message.warning("请输入您的旅行需求！");
          return;
        }
  
        this.loading = true;
        this.error = false;
        this.recommendation = null;
  
        try {
            let response = await request.get(`/ai/recommend_travel?message=${this.userInput}`)
          if (response.data) {
            this.recommendation = response.data.data;
            this.$message.success("推荐获取成功！");
          } else {
            this.$message.info("没有找到合适的推荐，请尝试修改需求！");
          }
        } catch (error) {
          console.error("获取推荐失败：", error);
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .travel-recommend {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  .input-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .input-section .el-input {
    margin-bottom: 10px;
  }
  
  .loading {
    text-align: center;
    margin: 20px 0;
    font-size: 16px;
  }
  
  .results {
    margin-top: 20px;
  }
  
  .error {
    margin: 20px 0;
  }
  </style>
  