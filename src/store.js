import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultLocations = [
  {
    id: 'ancient-library',
    name: '古老图书馆',
    description: '藏有无数古籍和神秘卷轴的地方，据说这里隐藏着寻宝的第一个线索。',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sceneImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    unlocked: true,
    visited: false,
    completed: false,
    actions: [
      {
        name: '搜索书架',
        description: '仔细搜索古老的书架，寻找隐藏的线索。',
        result: '你找到了一张泛黄的地图碎片，上面标记着一个神秘符号。这张地图指向了一个古老神庙的位置。',
        foundItem: 'mapFragment'
      },
      {
        name: '研究古籍',
        description: '翻阅古老的书籍，寻找关于宝藏的记载。',
        result: '你发现了一本记载着古老传说的书籍，提到了神庙和月光瀑布的关联。',
        foundItem: null
      }
    ]
  },
  {
    id: 'mysterious-temple',
    name: '神秘神庙',
    description: '隐藏在深山中的古老神庙，据说这里守护着珍贵的宝藏。',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sceneImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    unlocked: false,
    visited: false,
    completed: false,
    actions: [
      {
        name: '探索主殿',
        description: '进入神庙的主殿，寻找可能的宝藏线索。',
        result: '你在主殿的祭坛上发现了一个神秘的盒子，但需要特殊的钥匙才能打开。',
        foundItem: null
      },
      {
        name: '检查壁画',
        description: '仔细研究墙上的古老壁画，解读其中的秘密。',
        result: '壁画描绘了古代祭司在月光瀑布举行仪式的场景，你发现壁画中隐藏着一个暗格，里面有一把古老的神庙钥匙！',
        foundItem: 'templeKey'
      }
    ]
  },
  {
    id: 'moonlight-waterfall',
    name: '月光瀑布',
    description: '传说在满月之夜，瀑布后面会显现出神秘的入口。',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sceneImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    unlocked: false,
    visited: false,
    completed: false,
    actions: [
      {
        name: '寻找入口',
        description: '在瀑布周围寻找可能的隐藏入口。',
        result: '你发现瀑布后面有一个隐蔽的洞穴入口，里面似乎有东西在发光。',
        foundItem: null
      },
      {
        name: '调查水池',
        description: '检查瀑布下的水池，看看是否有异常。',
        result: '你在水池底部发现了一块发光的水晶碎片！这块碎片散发着神秘的能量。',
        foundItem: 'crystalShard'
      }
    ]
  },
  {
    id: 'enchanted-forest',
    name: '魔法森林',
    description: '充满神秘生物和奇异植物的古老森林，据说这里隐藏着通往宝藏的路径。',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sceneImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    unlocked: false,
    visited: false,
    completed: false,
    actions: [
      {
        name: '跟随发光蘑菇',
        description: '沿着发光蘑菇的路径前进，看看它们会带你去哪里。',
        result: '发光蘑菇的路径带你来到了一个古老的石圈，在中心你发现了一卷古老的羊皮卷轴。',
        foundItem: 'ancientScroll'
      },
      {
        name: '与森林精灵交谈',
        description: '尝试与森林中的精灵交流，获取指引。',
        result: '一位友好的精灵告诉你，水晶碎片和古老卷轴是开启最终宝藏的关键。',
        foundItem: null
      }
    ]
  },
  {
    id: 'crystal-cave',
    name: '水晶洞穴',
    description: '内部布满发光水晶的神秘洞穴，据说这里藏着最终的宝藏。',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sceneImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    unlocked: false,
    visited: false,
    completed: false,
    actions: [
      {
        name: '探索洞穴深处',
        description: '深入洞穴，寻找最终的宝藏。',
        result: '你在洞穴的最深处发现了一个巨大的宝箱，但需要集齐所有线索才能打开它。',
        foundItem: null
      },
      {
        name: '研究水晶排列',
        description: '仔细观察洞穴中水晶的排列方式，看看是否有特殊含义。',
        result: '你发现水晶的排列形成了一个星座图案，结合你找到的所有线索，终于解开了最终谜题！宝箱缓缓打开，里面装满了珍贵的宝石和黄金！',
        foundItem: 'finalTreasure'
      }
    ]
  }
];

export default new Vuex.Store({
  state: {
    locations: JSON.parse(localStorage.getItem('huntLocations') || JSON.stringify(defaultLocations)),
    currentLocation: null,
    foundItems: JSON.parse(localStorage.getItem('huntFoundItems') || '{}'),
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
    users: JSON.parse(localStorage.getItem('huntUsers') || '[]'),
    userScores: JSON.parse(localStorage.getItem('userScores') || '{}')
  },
  mutations: {
    setCurrentLocation(state, id) {
      state.currentLocation = state.locations.find(l => l.id === id) || null;
      if (state.currentLocation) {
        state.currentLocation.visited = true;
        localStorage.setItem('huntLocations', JSON.stringify(state.locations));
      }
    },
    addFoundItem(state, item) {
      state.foundItems[item] = true;
      // 解锁后续地点
      if (item === 'mapFragment') state.locations[1].unlocked = true;
      if (item === 'templeKey') state.locations[2].unlocked = true;
      if (item === 'crystalShard') state.locations[3].unlocked = true;
      if (item === 'ancientScroll') state.locations[4].unlocked = true;
      // 标记已完成
      if (state.currentLocation) state.currentLocation.completed = true;
      
      // 更新用户分数（只保留最高分数）
      if (state.currentUser) {
        const newScore = Object.keys(state.foundItems).length * 100;
        const currentScore = state.userScores[state.currentUser] || 0;
        // 只有当新分数更高时才更新
        if (newScore > currentScore) {
          state.userScores[state.currentUser] = newScore;
          localStorage.setItem('userScores', JSON.stringify(state.userScores));
        }
      }
      
      localStorage.setItem('huntFoundItems', JSON.stringify(state.foundItems));
      localStorage.setItem('huntLocations', JSON.stringify(state.locations));
    },
    registerUser(state, username) {
      if (!state.users.includes(username)) {
        state.users.push(username);
        state.currentUser = username;
        state.userScores[username] = 0;
        localStorage.setItem('huntUsers', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(username));
        localStorage.setItem('userScores', JSON.stringify(state.userScores));
        return true;
      }
      return false;
    },
    logoutUser(state) {
      // 重置游戏进度
      state.locations = JSON.parse(JSON.stringify(defaultLocations));
      state.currentLocation = null;
      state.foundItems = {};
      state.currentUser = null;
      
      // 保存重置后的状态
      localStorage.setItem('huntLocations', JSON.stringify(state.locations));
      localStorage.setItem('huntFoundItems', JSON.stringify(state.foundItems));
      localStorage.setItem('currentUser', 'null');
    }
  },
  getters: {
    isUsernameAvailable: (state) => (username) => {
      return !state.users.includes(username);
    },
    getRankings: (state) => {
      return Object.entries(state.userScores)
        .sort(([,a], [,b]) => b - a)
        .map(([username, score], index) => ({
          rank: index + 1,
          username,
          score
        }));
    }
  }
});
