<template>
  <div>
    <h2>Real-Time Log Stats</h2>

    <div v-if="statistics">
      <p>Total Records: {{ statistics.records }}</p>
      <p v-for="(count, type) in statistics.types" :key="type">
        {{ type }}: {{ count }}
      </p>
      <p>Average Processing Speed: {{ statistics.avgProcessingSpeed }} records/minute</p>
      <p>Record with the most words: {{ statistics.maxWords.message }}</p>

    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
  
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
  }
}


</script>

