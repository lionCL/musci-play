<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img
        class="cover"
        :src="coverUrl ? coverUrl : '../assets/img/cover.png'"
        alt
      />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{ songName }}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{ arName }}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{ alName }}</span>
      </div>
      <audio class="audio" autoplay controls :src="musicUrl"></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lyric" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 歌曲地址
      musicUrl: '',
      // 歌手名
      arName: '',
      // 封面
      coverUrl: '',
      // 专辑名
      alName: '',
      // 歌名
      songName: '',
      // 歌词
      lyric: []
    }
  },
  // 生命周期钩子
  created() {
    this.queryMusic()
  },

  methods: {
    //歌曲相关信息
    queryMusic() {
      //播放地址
      this.$axios
        .get(`/song/url?id=${this.$route.params.id}`)
        .then(backData => {
          this.musicUrl = backData.data.data[0].url
        })

      // 封面
      this.$axios
        .get(`/song/detail?ids=${this.$route.params.id}`)
        .then(backData => {
          // 封面
          this.coverUrl = backData.data.songs[0].al.picUrl
          // 歌名
          this.songName = backData.data.songs[0].name
          // 歌手名
          this.arName = backData.data.songs[0].ar[0].name
          // 专辑名
          this.alName = backData.data.songs[0].al.name
        })
      // 歌词
      this.$axios.get(`/lyric?id=${this.$route.params.id}`).then(backData => {
        this.lyric = backData.data.lrc.lyric.split('\n').map(v => {
          return v.replace(/\[\d{2}\:\d{2}\.\d{2,3}\]/, '')
        })
      })
    }
  }
}
</script>

<style>
</style>