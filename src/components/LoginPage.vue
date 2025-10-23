<template>
  <div class="login-page">
    <div class="login-container">
      <h1>欢迎来到寻宝游戏</h1>
      <div class="login-form">
        <!-- 已有用户登录 -->
        <div v-if="!currentUser && existingUsers.length > 0" class="existing-users">
          <h2>选择已有用户</h2>
          <div class="user-list">
            <div 
              v-for="user in existingUsers" 
              :key="user.username" 
              class="user-item"
              @click="login(user.username)"
            >
              <span class="username">{{ user.username }}</span>
              <span class="score">最高分: {{ user.score }} 分</span>
            </div>
          </div>
          <div class="divider">
            <span>或</span>
          </div>
        </div>
        
        <!-- 新用户注册 -->
        <h2 v-if="!currentUser">{{ existingUsers.length > 0 ? '注册新用户' : '注册新用户开始游戏' }}</h2>
        <h2 v-else>欢迎回来，{{ currentUser }}！</h2>
        
        <div v-if="!currentUser" class="input-group">
          <input 
            v-model="username" 
            type="text" 
            placeholder="请输入用户名"
            @input="checkUsername"
            maxlength="20"
          />
          <div class="username-status">
            <span v-if="username && !usernameAvailable" class="error">❌ 用户名已存在</span>
            <span v-if="username && usernameAvailable" class="success">✅ 用户名可用</span>
          </div>
          <button 
            @click="register" 
            :disabled="!username || !usernameAvailable"
            class="register-btn"
          >
            注册并开始游戏
          </button>
        </div>
        
        <!-- 已登录用户信息 -->
        <div v-else class="user-info">
          <p>当前用户: <strong>{{ currentUser }}</strong></p>
          <p>当前分数: <strong>{{ currentScore }}</strong> 分</p>
          <div class="button-group">
            <button @click="startGame" class="start-btn">开始游戏</button>
            <button @click="logout" class="logout-btn">切换用户</button>
          </div>
        </div>
        
        <div class="game-rules">
          <h3>游戏规则</h3>
          <ul>
            <li>每个找到的物品获得100分</li>
            <li>完成所有地点获得额外奖励</li>
            <li>排行榜按分数从高到低排序</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: ''
    };
  },
  computed: {
    ...mapState(['currentUser', 'userScores', 'users']),
    ...mapGetters(['isUsernameAvailable', 'getRankings']),
    usernameAvailable() {
      return this.username && this.isUsernameAvailable(this.username);
    },
    currentScore() {
      return this.currentUser ? (this.userScores[this.currentUser] || 0) : 0;
    },
    existingUsers() {
      return this.users.map(username => ({
        username,
        score: this.userScores[username] || 0
      })).sort((a, b) => b.score - a.score);
    }
  },
  methods: {
    ...mapMutations(['registerUser', 'logoutUser']),
    checkUsername() {
      // 用户名验证逻辑
      if (this.username) {
        this.username = this.username.replace(/[^\w\u4e00-\u9fa5]/g, '');
      }
    },
    login(username) {
      this.$store.state.currentUser = username;
      localStorage.setItem('currentUser', JSON.stringify(username));
      this.$router.push('/');
    },
    register() {
      if (this.username && this.isUsernameAvailable(this.username)) {
        const success = this.registerUser(this.username);
        if (success) {
          this.$router.push('/');
        }
      }
    },
    startGame() {
      this.$router.push('/');
    },
    logout() {
      this.logoutUser();
      this.username = '';
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h1 {
  color: #1a2a6c;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

h2 {
  color: #b21f1f;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.1rem;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #1a2a6c;
}

.username-status {
  height: 20px;
  margin-bottom: 15px;
}

.error {
  color: #e74c3c;
  font-weight: bold;
}

.success {
  color: #27ae60;
  font-weight: bold;
}

button {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin: 5px;
}

.register-btn {
  background: #1a2a6c;
  color: white;
  width: 100%;
}

.register-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.register-btn:hover:not(:disabled) {
  background: #0d1a4d;
  transform: translateY(-2px);
}

.start-btn {
  background: #27ae60;
  color: white;
}

.start-btn:hover {
  background: #219653;
  transform: translateY(-2px);
}

.logout-btn {
  background: #e74c3c;
  color: white;
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.user-info {
  margin-bottom: 30px;
}

.user-info p {
  margin: 10px 0;
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.existing-users {
  margin-bottom: 30px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.user-item:hover {
  background: #e9ecef;
  border-color: #1a2a6c;
  transform: translateY(-2px);
}

.user-item .username {
  font-weight: bold;
  color: #1a2a6c;
}

.user-item .score {
  color: #666;
  font-size: 0.9rem;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider span {
  background: white;
  padding: 0 15px;
  color: #666;
  font-weight: bold;
}

.game-rules {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.game-rules h3 {
  color: #1a2a6c;
  margin-bottom: 15px;
}

.game-rules ul {
  text-align: left;
  padding-left: 20px;
}

.game-rules li {
  margin-bottom: 8px;
  color: #555;
}
</style>