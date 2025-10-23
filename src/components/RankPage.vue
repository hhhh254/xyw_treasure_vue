<template>
  <div class="rank-page">
    <h2>排行榜</h2>
    <div v-if="rankings.length > 0" class="rankings-container">
      <div class="rank-header">
        <span>排名</span>
        <span>用户名</span>
        <span>分数</span>
      </div>
      <div 
        v-for="user in rankings" 
        :key="user.username" 
        class="rank-item"
        :class="{ 'current-user': user.username === currentUser }"
      >
        <span class="rank-num">{{ user.rank }}</span>
        <span class="rank-name">{{ user.username }}</span>
        <span class="rank-score">{{ user.score }}</span>
      </div>
    </div>
    <div v-else class="no-data">
      <p>暂无排行榜数据</p>
      <p>开始游戏来创建你的排名吧！</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'RankPage',
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['getRankings']),
    rankings() {
      return this.getRankings;
    }
  }
};
</script>

<style scoped>
.rank-page {
  background: rgba(0,0,0,0.7);
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  margin: 40px auto;
  color: #ffd700;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rankings-container {
  text-align: left;
}

.rank-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.1rem;
}

.rank-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  gap: 15px;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 10px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.rank-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.rank-item.current-user {
  background: rgba(255, 215, 0, 0.2);
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.rank-num {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}

.rank-item:nth-child(1) .rank-num {
  color: #ffd700;
  text-shadow: 0 0 10px #ffd700;
}

.rank-item:nth-child(2) .rank-num {
  color: #c0c0c0;
  text-shadow: 0 0 8px #c0c0c0;
}

.rank-item:nth-child(3) .rank-num {
  color: #cd7f32;
  text-shadow: 0 0 6px #cd7f32;
}

.rank-name {
  font-size: 1.1rem;
  font-weight: bold;
}

.rank-score {
  font-size: 1.1rem;
  color: #fff;
  font-weight: bold;
  text-align: right;
}

.no-data {
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 1.1rem;
}

.no-data p {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .rank-page {
    margin: 20px;
    padding: 20px;
  }
  
  .rank-header,
  .rank-item {
    grid-template-columns: 60px 1fr 80px;
    gap: 10px;
    padding: 12px 15px;
  }
  
  .rank-num {
    font-size: 1.1rem;
  }
  
  .rank-name {
    font-size: 1rem;
  }
  
  .rank-score {
    font-size: 1rem;
  }
}
</style>
