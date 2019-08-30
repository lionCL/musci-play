<template>
  <div class="slider-wrapper">
    <span class="demonstration"></span>
    <el-carousel :loop="true" height="400px">
      <el-carousel-item v-for="(item, index) in sliderPic" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderPic: []
    }
  },
  //生命周期钩子函数------可以尽早获取数据
  created() {
    this.$axios
      .get('https://autumnfish.cn/banner?t=' + Date.now())
      .then(res => {
        this.sliderPic = res.data.banners
      })
  }
}
</script>

<style>
.slider-wrapper {
  margin-top: 30px;
}
</style>