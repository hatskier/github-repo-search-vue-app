<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import config from '@/config'
import NavBar from '@/components/NavBar'

import 'vue-toast-notification/dist/theme-sugar.css'

export default {
  name: 'App',

  created() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebase)
    }

    this.$store.dispatch('loadSearchTermsFromLocalStorage')

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('updateCurrentUser', user)
      if (!user && this.$route.name !== 'auth') {
        this.$router.push({ path: '/auth' })
      }
    })
  },

  components: {
    NavBar,
  }
};
</script>

<style>
.toast-text {
  font-family: Roboto, sans-serif;
}
</style>
