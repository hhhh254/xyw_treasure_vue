<template>
  <div id="app">
    <HeaderBar />
    <router-view />
    <MusicPlayer />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { HeaderBar, MusicPlayer },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    // 检查用户是否已登录，如果未登录则跳转到登录页面
    if (!this.currentUser && this.$route.path !== '/login') {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  min-height: 100vh;
}
</style>
