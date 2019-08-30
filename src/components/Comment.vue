<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in commentList" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{ item.user.nickname }}:</span>
            <span class="content">{{ item.content }}</span>
          </div>
          <div class="bottom">
            <div class="time">{{ item.time | formatTime }}</div>
            <div class="like-wrapper">
              <span>👍</span>({{ item.likedCount }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: []
    }
  },
  created() {
    this.$axios
      .get(`/comment/hot?id=${this.$route.params.id}&type=0`)
      .then(res => {
        // eslint-disable-next-line
        console.log(res)
        this.commentList = res.data.hotComments
      })
  },
  //过滤器
  filters: {
    formatTime(time) {
      // 处理数据
      let d = new Date(time)
      // 返回数据
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
  }
}
</script>

<style>
</style>