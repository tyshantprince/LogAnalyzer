// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    'nuxt-socket-io',
    'nuxt-scheduler'

  ],
  io: {
    // module options
    server:{
      
      
    },
    sockets: [{
      
      name: 'main',
      url: 'http://localhost:3001/'
    }]
  },
  
  devtools: { enabled: true },
  
})
