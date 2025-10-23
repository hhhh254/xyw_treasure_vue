<template>
  <div class="music-player">
    <audio ref="audio" :src="musicSrc" loop></audio>
    <button @click="toggleMusic">{{ playing ? '🔊' : '🔇' }}</button>
    <button @click="restartMusic">🔄</button>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      playing: true,
      musicSrc: require('../../杨子熙 - 化凡.mp3')
    };
  },
  mounted() {
    this.$refs.audio.play();
  },
  methods: {
    toggleMusic() {
      this.playing = !this.playing;
      if (this.playing) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    restartMusic() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.playing = true;
    }
  }
};
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  background: rgba(0,0,0,0.7);
  padding: 10px;
  border-radius: 50px;
  z-index: 9999;
}
button {
  background: #ffd700;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
