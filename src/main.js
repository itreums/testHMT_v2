
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'

Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(App)
}).$mount('#app')
