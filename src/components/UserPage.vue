<template>
  <div class="user-page">
    <h2>用户管理</h2>
    <form @submit.prevent="addUser">
      <input v-model="newUser" placeholder="输入用户名" required />
      <button type="submit">添加用户</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user">
        {{ user }}
        <button @click="removeUser(user)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      newUser: '',
      users: JSON.parse(localStorage.getItem('huntUsers') || '[]')
    };
  },
  methods: {
    addUser() {
      if (this.newUser && !this.users.includes(this.newUser)) {
        this.users.push(this.newUser);
        this.save();
        this.newUser = '';
      }
    },
    removeUser(user) {
      this.users = this.users.filter(u => u !== user);
      this.save();
    },
    save() {
      localStorage.setItem('huntUsers', JSON.stringify(this.users));
    }
  }
};
</script>

<style scoped>
.user-page {
  background: rgba(0,0,0,0.7);
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  margin: 40px auto;
  color: #ffd700;
}
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: none;
}
button {
  background: #ffd700;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
