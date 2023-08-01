<template>
  <div class="app-container">
    <h2 class="app-heading">Real-Time Log Stats</h2>

    <div v-if="statistics" class="statistics-container">
      <p class="stats-item">📄 Total Records: {{ statistics.records }}</p>
      <div v-for="(count, type) in statistics.types" :key="type" class="stats-item">
        {{ getEmojiForLogType(type) }} {{ type }}: {{ count }}
      </div>
      <p class="stats-item">🚀 Average Processing Speed: {{ statistics.avgProcessingSpeed }} records/minute</p>
      <p class="stats-item">📚 Record with the most words: {{ statistics.maxWords.message }}</p>
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.app-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.statistics-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.stats-item {
  font-size: 16px;
  margin-bottom: 10px;
}

.stats-type {
  font-weight: bold;
  margin-right: 5px;
}

.error-message {
  font-size: 16px;
  margin-top: 20px;
  color: #ff0000;
}
</style>

  
<script>

import { io } from 'socket.io-client'

export default {
  data() {
    return {
      statistics: null,
      error: null,

    };
  },
  mounted() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZlZWFtIiwiaWF0IjoxNTE2MjM5MDIyfQ.h_otfeUlyRHuEwboQJ27NsdaJXjNtBSZXmNeZ11sslA'

    this.socket = io('ws://localhost:3001', {
      query: { token }
    })

    this.socket.on('runupdate', (data) => {
      this.statistics = data;
    });


  },
  methods: {
    getEmojiForLogType(logType) {
      console.log(logType)
      // Add your own logic to map log types to emojis
      switch (logType) {
        case '[info]':
          return 'ℹ️'; // Information emoji
        case '[warning]':
          return '⚠️'; // Warning emoji
        case '[error]':
          return '🛑'; // Error emoji
        default:
          return '📋'; // Default emoji for other log types
      }
    }}
}

</script>

