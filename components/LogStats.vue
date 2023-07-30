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

export default {
  data() {
    return {
      statistics: null,
      error: null,
    };
  },
   mounted() {
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts: 
      name: 'main', // Use socket "home"
    })
    
    this.socket.onAny((event, ...args) => {
      this.socket.emit('newclient');
  });

    this.socket.on('updateStats', (data) => {
      console.log('new data')
      this.statistics = data;
    });
  },  
  methods: {
  }
}


</script>

