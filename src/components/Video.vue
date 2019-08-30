<template>
  <div class="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{ mvName }}</span>
      <span class="artist">{{ mvArtist }}</span>
    </div>
    <video :src="mvUrl" autoplay controls=""></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvName: '',
      mvUrl: '',
      mvArtist: ''
    }
  },
  created() {
    this.$axios.get(`/mv/detail?mvid=${this.$route.params.mvid}`).then(res => {
      this.mvName = res.data.data.name
      this.mvUrl = res.data.data.brs['240']
      this.mvArtist = res.data.artistName
    })
  }
}
</script>

<style>
</style>