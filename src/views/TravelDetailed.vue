<template>
  <div class="spot-detail">
    <!-- 返回按钮 -->
    <el-button style="margin-bottom: 30px;" @click="goBack" type="primary" icon="el-icon-arrow-left">返回</el-button>

    <!-- 景点主信息 -->
    <div class="spot-info">
      <div class="spot-images">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(image, index) in spot.image" :key="index">
            <img :src="image.image_url" alt="景点图片" class="spot-image" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="spot-details">
        <h2>{{spot.detail.name}}</h2>
        <div class="spot-description">
          <p>{{ spot.detail.introduction }}</p>
        </div>

        <div class="spot-meta">
          <span>评分：{{ spot.detail.rate }} 星</span>
          <span>价格：{{ spot.detail.ticket_price }} {{ spot.detail.ticket_price_unit  }}</span>
          <span>地址：{{ spot.detail.addr }}</span>
        </div>
      </div>
    </div>

    <!-- 文创产品 -->
    <div class="cultural-products">
      <h3>文创产品</h3>
      <div class="product-list">
        <div v-for="(product, index) in spot.product" :key="index" class="product-item">
          <img :src="product.image_url" alt="文创产品" class="product-image" />
          <p class="product-name">{{ product.introduction }}</p>
        </div>
      </div>
    </div>

    <!-- 特色美食 -->
    <div class="local-foods">
      <h3>特色美食</h3>
      <div class="food-list">
        <div v-for="(food, index) in spot.featured" :key="index" class="food-item">
          <img :src="food.image_url" alt="特色美食" class="food-image" />
          <p class="food-name">{{ food.introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElButton, ElCarousel, ElCarouselItem } from 'element-plus';
import request from '@/util/request';

export default {
  components: {
    ElButton, ElCarousel, ElCarouselItem
  },
  data() {
    return {
      spot: {
       detail:{},//详情
       featured:{},//特色美食
       image:{},//走马灯
       product:{}//文创产品
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);  // 返回上一页
    },
     
    async fetchSpotDetails() {
      // 获取路径参数
      const id = this.$route.params.id;
      const result = await request.get(`menu/travelItem/detail?id=${id}`);
      if (result.data.code === 200) {
        this.spot = result.data.data;
        console.log(result)
      } else {
        this.$message.error('获取景点详情失败');
      }
    }
  },
  mounted() {
    this.fetchSpotDetails();
  }
};
</script>

<style scoped>
.spot-detail {
  padding: 20px;
}

.spot-info {
  display: flex;
  margin-bottom: 20px;
}

.spot-images {
  width: 50%;
}

.spot-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.spot-details {
  width: 50%;
  padding-left: 20px;
}

.spot-details h2 {
  font-size: 28px;
  font-weight: bold;
}

.spot-description {
  margin-top: 10px;
  font-size: 16px;
}

.spot-meta span {
  display: block;
  margin-top: 8px;
  font-size: 14px;
}

.cultural-products, .local-foods {
  margin-top: 40px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.product-list, .food-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-item, .food-item {
  width: 45%;
  text-align: center;
  margin-bottom: 20px;
}

.product-image, .food-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-name, .food-name {
  margin-top: 10px;
  font-size: 16px;
}
</style>
