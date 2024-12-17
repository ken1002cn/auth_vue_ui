<template>
  <div class="tour-spot-card">
    <img :src="spot.image_url" alt="景点图片" class="spot-image" />
    <h3 class="spot-title">{{ spot.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    // 从父组件传递来的景点数据
    spot: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.tour-spot-card {
  width: 200px;
  margin: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}

.spot-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.spot-title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
