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
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError.js'


export default {
  data() {
    return {
      statistics: null,
      error: null,

    };
  },
  mounted() {

    this.socket = io('http://localhost:3001', {
    })

    this.socket.on('runupdate', (data) => {
      this.statistics = data;
    });


  },
  methods: {
  }
}


</script>

