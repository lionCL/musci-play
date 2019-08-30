<template>
  <div class="result-wrapper">
    <div class="song" v-for="item in songList" :key="item.id">
      <div class="name">
        <span class="iconfont icon-play" @click="toPlay(item.id)"></span>
        <span @click="toComment(item.id)">{{ item.name }}</span>
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid != 0"
          @click="toMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{ item.artists | formatSinger }}</div>
      <div class="album">《{{ item.album.name }}》</div>
      <div class="time">{{ item.duration }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: []
    }
  },
  created() {
    //axios有设置基本域 :https://autumnfish.cn
    // this.$axios
    //   .get(`/search?keywords=${this.$route.params.keywords}`)
    //   .then(res => {
    //     this.songList = res.data.result.songs
    //   })
    this.searchMusic()
  },
  methods: {
    //搜索歌曲
    searchMusic() {
      this.$axios
        .get(`/search?keywords=${this.$route.params.keywords}`)
        .then(res => {
          this.songList = res.data.result.songs
        })
    },
    //歌曲播放
    toPlay(id) {
      //变成式导航,跳转路由
      this.$router.push(`/player/${id}`)
    },
    toMv(id) {
      this.$router.push(`/video/${id}`)
    },
    toComment(id) {
      this.$router.push(`/comment/${id}`)
    }
  },
  //侦听器,检测keywords数据的变化时触发
  //解决输入框第二次输入时候搜索歌曲请求不会再次触发
  watch: {
    // '$route.params.keywords':function(){}
    '$route.params.keywords'() {
      this.searchMusic()
    }
  },
  //过滤器
  filters: {
    formatSinger(singers) {
      let temStr = ''
      for (let i = 0; i < singers.length; i++) {
        temStr += singers[i].name
        temStr += '/'
      }
      //移除最后一个/
      temStr = temStr.slice(0, -1)
      return temStr
    },
    formatTime(time) {
      const totalSec = time / 1000
      // 秒->分 小数部分舍去
      const min = Math.floor(totalSec / 60)
      // 剩余的部分是 秒 不满足分的部分 全部到秒
      let sec = Math.floor(totalSec % 60)
      // 秒不够2位 补足2位
      sec = sec < 10 ? '0' + sec : sec
      return min + ':' + sec
    }
  }
}
</script>

<style>
</style>