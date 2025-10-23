<template>
  <div class="location-view">
    <div class="location-header">
      <h2 class="location-title">{{ location.name }}</h2>
      <button class="back-btn" @click="$emit('back')">返回全景地图</button>
    </div>
    <div class="location-content">
      <div class="location-scene">
        <img :src="location.sceneImage" :alt="location.name" />
      </div>
      <div class="location-actions">
        <div class="message-box">
          <p class="message">{{ message }}</p>
          <div v-if="showScoreUpdate" class="score-update">
            <span class="score-text">+100分！</span>
            <span class="current-score">当前分数：{{ currentScore }}</span>
          </div>
        </div>
        <button v-for="(action, idx) in location.actions" :key="idx" class="action-btn" @click="doAction(action)">
          {{ action.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LocationView',
  props: ['location'],
  data() {
    return {
      message: `欢迎来到${this.location.name}！选择一项行动开始探索。`,
      showScoreUpdate: false,
      currentScore: 0
    };
  },
  computed: {
    ...mapState(['currentUser', 'userScores']),
  },
  watch: {
    userScores: {
      handler(newScores) {
        if (this.currentUser) {
          this.currentScore = newScores[this.currentUser] || 0;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    doAction(action) {
      this.message = `正在${action.name}...`;
      this.showScoreUpdate = false;
      
      setTimeout(() => {
        this.message = action.result;
        if (action.foundItem) {
          this.$emit('found', action.foundItem);
          // 显示分数更新动画
          this.showScoreUpdate = true;
          // 3秒后隐藏分数更新显示
          setTimeout(() => {
            this.showScoreUpdate = false;
          }, 3000);
        }
      }, 1500);
    }
  }
};
</script>

<style scoped>
.location-view {
  background: rgba(0,0,0,0.8);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ffd700;
}
.location-title {
  font-size: 2rem;
  color: #ffd700;
}
.back-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
}
.location-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.location-scene {
  flex: 1;
  min-width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.location-scene img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.location-actions {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.action-btn {
  background: linear-gradient(135deg, #ff9900, #ffd700);
  color: #000;
  border: none;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(255,204,0,0.3);
}
.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255,204,0,0.5);
}
.action-btn:active {
  transform: translateY(1px);
}
.action-btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.message-box {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  min-height: 60px;
  border-left: 5px solid #ffd700;
}
.message {
  font-size: 1.1rem;
  line-height: 1.5;
}

.score-update {
  margin-top: 15px;
  padding: 10px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-radius: 8px;
  animation: scorePulse 1s ease-in-out;
  text-align: center;
}

.score-text {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.current-score {
  display: block;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

@keyframes scorePulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
