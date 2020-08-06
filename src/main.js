import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import VuetifyConfirm from 'vuetify-confirm'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueToast, { position: 'top-right' })
Vue.use(VuetifyConfirm, { vuetify })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
