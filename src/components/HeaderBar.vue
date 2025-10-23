<template>
  <header class="header-bar">
    <div class="header-content">
      <div class="header-left">
        <h1>神秘寻宝之旅</h1>
      </div>
      <div class="header-center">
        <nav>
          <router-link to="/">首页</router-link>
          <router-link to="/user">用户管理</router-link>
          <router-link to="/rank">排行榜</router-link>
        </nav>
      </div>
      <div class="header-right">
        <div v-if="currentUser" class="user-info">
          <span class="username">欢迎，{{ currentUser }}</span>
          <span class="score">分数：{{ currentScore }}</span>
          <button @click="logout" class="logout-btn">退出</button>
        </div>
        <div v-else class="login-prompt">
          <router-link to="/login" class="login-link">登录/注册</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HeaderBar',
  computed: {
    ...mapState(['currentUser', 'userScores', 'foundItems']),
    ...mapGetters(['getRankings']),
    currentScore() {
      // 实时计算当前分数，基于找到的物品数量
      if (this.currentUser) {
        // 从Vuex状态获取最新分数
        return this.userScores[this.currentUser] || 0;
      }
      return 0;
    }
  },
  methods: {
    ...mapMutations(['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header-bar {
  background: rgba(0,0,0,0.6);
  color: #ffd700;
  padding: 15px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-left h1 {
  margin: 0;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.header-center nav {
  display: flex;
  gap: 20px;
}

.header-center nav a {
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s;
}

.header-center nav a:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateY(-2px);
}

.header-center nav a.router-link-exact-active {
  color: #fff;
  background: rgba(255, 215, 0, 0.3);
  text-shadow: 0 0 8px #ffd700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
}

.username {
  font-weight: bold;
  color: #fff;
}

.score {
  background: rgba(255, 215, 0, 0.2);
  padding: 4px 12px;
  border-radius: 15px;
  font-weight: bold;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-1px);
}

.login-link {
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border: 2px solid #ffd700;
  border-radius: 20px;
  transition: all 0.3s;
}

.login-link:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .header-center nav {
    gap: 10px;
  }
  
  .user-info {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
