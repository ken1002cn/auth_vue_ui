<template>
  <div class="tour-spot-list">
    <!-- 搜索框 -->
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="请输入旅游景点名称进行搜索"
        suffix-icon="el-icon-search"
        @input="handleSearch"
      />
    </div>

    <!-- 景点列表 -->
    <div class="tour-spot-grid">
      <!-- 遍历景点数据，显示每个景点的卡片 -->
      <tour-spot-card
        v-for="(spot, index) in spots"
        :key="index"
        :spot="spot"
        @click="goToSpotDetail(spot.id)"
      />
    </div>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import TourSpotCard from '@/components/TourSpotCard.vue';
import request from '@/util/request';
import { ElMessage } from 'element-plus'

export default {
  components: {
    TourSpotCard
  },
  data() {
    return {
      spots: [], // 存储景点数据
      searchQuery: '', // 搜索框内容
      currentPage: 1, // 当前页码
      pageSize: 12, // 每页显示的景点数量
      total: 0, // 总景点数量
    };
  },
  methods: {
    // 处理页码变化
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页码
      this.fetchTourSpots(page); // 获取当前页的景点数据
    },
    // 跳转到景点详情页
    goToSpotDetail(id) {
      this.$router.push({ name: 'travelDetail', params: { id } }); // 路由跳转
    },
    // 处理搜索输入
    handleSearch() {
      this.currentPage = 1; // 重置为第一页
      this.fetchTourSpots(); // 重新获取搜索结果
    },
    // 获取景点数据
    async fetchTourSpots(page = 1) {
      let result = await request.get("menu/travelItem/page", {
        page: page,
        page_size: this.pageSize,
        search: this.searchQuery // 传递搜索内容
      });

      if (result.data.code === 200) {
        this.spots = result.data.data; // 更新景点列表
        this.total = result.data.total; // 更新总景点数
        console.log("获取到的分页数据", result.data.data);
      } else {
        ElMessage({
          message: '获取分页数据异常',
          type: 'warning',
        });
      }
    }
  },
  mounted() {
    this.fetchTourSpots(); // 初次加载数据
  }
};
</script>

<style scoped>
.tour-spot-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.el-input {
  width: 100%;
}

.tour-spot-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.el-pagination {
  margin-top: 20px;
}

.tour-spot-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 平滑过渡效果 */
}

.tour-spot-card:hover {
  transform: translateY(-5px); /* 鼠标悬停时卡片上浮 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 加上阴影 */
}
</style>
