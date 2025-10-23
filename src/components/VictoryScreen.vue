<template>
  <div class="victory-screen" v-if="show">
    <div class="victory-content">
      <h2 class="victory-title">🎉 恭喜！ 🎉</h2>
      <div class="treasure-image">💎</div>
      <p class="victory-message">
        你成功找到了传说中的失落宝藏！<br>
        经过艰苦的探索和智慧的考验，<br>
        你证明了自己是真正的冒险家！
      </p>
      <button class="continue-btn" @click="$emit('close')">继续冒险</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VictoryScreen',
  props: ['show']
};
</script>

<style scoped>
.victory-screen {
  display: flex;
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.victory-content {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  padding: 40px;
  border-radius: 20px;
  max-width: 600px;
  box-shadow: 0 0 50px rgba(255,204,0,0.5);
  animation: pulse 2s infinite;
}
.victory-title {
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255,204,0,0.7);
}
.victory-message {
  font-size: 1.3rem;
  margin-bottom: 30px;
  line-height: 1.6;
}
.treasure-image {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  box-shadow: 0 0 30px rgba(255,204,0,0.7);
  animation: rotate 10s linear infinite;
}
.continue-btn {
  background: linear-gradient(135deg, #ff9900, #ffd700);
  color: #000;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(255,204,0,0.4);
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
