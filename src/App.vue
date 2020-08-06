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
import lStorage from '@/local-storage'

import 'vue-toast-notification/dist/theme-sugar.css'

export default {
  name: 'App',

  created() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebase)
    }

    const token = lStorage.getGithubAccessToken()
    this.$store.dispatch('updateGithubAccessToken', token)

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('updateCurrentUser', user)
      lStorage.updateUserAuthState(user)
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
