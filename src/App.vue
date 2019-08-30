<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" @keyup.enter="queryMusic" v-model="keywords" />
      <button @click="queryMusic">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <!-- 内容区 组件展示区 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ''
    }
  },
  methods: {
    queryMusic() {
      this.keywords = this.keywords.trim()

      //编程式导航 传参
      this.$router.push(`/search/${this.keywords}`)
    }
  }
}
</script>
<style>
</style>