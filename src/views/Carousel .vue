<template>
  <div class="travel-recommend">
    <!-- 轮播图 -->
    <el-carousel height="500px" arrow="always" class="carousel">
      <el-carousel-item v-for="item in item" :key="item">
        <img :src="require(`@/assets/images/${item}.jpg`)" alt="carousel image" />
      </el-carousel-item>
    </el-carousel>

    <!-- 热点推荐资讯 -->
    <div class="hotspots-info">
      <h2>探索热门旅游目的地</h2>
      <div class="card-container">
        <el-card
          v-for="(spot, index) in hotspots"
          :key="index"
          class="card"
          :body-style="{ padding: '20px' }"
          shadow="hover"
        >
          <div slot="header" class="card-header">
            <span>{{ spot.name }}</span>
          </div>
          <p class="description">{{ spot.description }}</p>
        </el-card>
      </div>
    </div>

    <!-- 跳转智能搜索按钮 -->
    <div class="search-btn">
      <el-button type="primary" size="large" @click="goToSearchPage">
        智能搜索推荐
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [1, 2, 3, 4], // 图片编号
      hotspots: [
        {
          name: '三亚海滩',
          description: '三亚海滩，碧海蓝天，完美放松度假地。',
        },
        {
          name: '九寨沟风景区',
          description: '九寨沟，拥有如诗如画的自然风光，五彩斑斓的湖泊。',
        },
        {
          name: '黄山',
          description: '黄山，以奇松、怪石、云海和温泉著名，是中国的世界文化与自然双重遗产。',
        },
        {
          name: '北京故宫',
          description: '故宫是中国古代文化和艺术的瑰宝，历代帝王的宫殿遗址。',
        },
      ], // 热点推荐数据
    };
  },
  methods: {
    goToSearchPage() {
      // 跳转到智能搜索页面
      this.$router.push('/travel/search');
    },
  },
};
</script>

<style scoped lang="scss">
.travel-recommend {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
}

.carousel {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.el-carousel__item:hover img {
  transform: scale(1.05);
}

.hotspots-info {
  margin-top: 40px;
  text-align: center;
}

.hotspots-info h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
}

.card-header {
  font-size: 22px;
  color: #16a085;
  font-weight: bold;
}

.description {
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.search-btn {
  margin-top: 30px;
  text-align: center;
}

.search-btn .el-button {
  width: 250px;
  background-color: #16a085;
  border-color: #16a085;
  font-size: 18px;
}

.search-btn .el-button:hover {
  background-color: #1abc9c;
  border-color: #1abc9c;
}
</style>
