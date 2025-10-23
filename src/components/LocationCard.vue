<template>
  <div class="location-card" :class="{ locked: !location.unlocked }" @click="handleClick">
    <img :src="location.image" class="location-image" :alt="location.name" />
    <div class="location-info">
      <h3 class="location-name">{{ location.name }}</h3>
      <p class="location-desc">{{ location.description }}</p>
    </div>
    <div class="location-status" :class="statusClass">{{ statusText }}</div>
  </div>
</template>

<script>
export default {
  name: 'LocationCard',
  props: ['location'],
  computed: {
    statusClass() {
      if (!this.location.unlocked) return 'locked';
      if (this.location.completed) return 'completed';
      if (this.location.visited) return 'in-progress';
      return 'not-started';
    },
    statusText() {
      if (!this.location.unlocked) return '已锁定';
      if (this.location.completed) return '已完成';
      if (this.location.visited) return '进行中';
      return '未探索';
    }
  },
  methods: {
    handleClick() {
      if (this.location.unlocked) {
        this.$emit('enter', this.location.id);
      } else {
        alert('该地点已锁定！');
      }
    }
  }
};
</script>

<style scoped>
.location-card {
  background: rgba(0,0,0,0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;
  width: 300px;
}
.location-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}
.location-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 3px solid #ffd700;
}
.location-info {
  padding: 20px;
}
.location-name {
  font-size: 1.3rem;
  color: #ffd700;
}
.location-desc {
  font-size: 1rem;
  color: #ddd;
}
.location-status {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.7);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}
.location-status.completed {
  background: #27ae60;
}
.location-status.in-progress {
  background: #e67e22;
}
.location-status.not-started {
  background: #7f8c8d;
}
.location-status.locked {
  background: #c0392b;
}
</style>
