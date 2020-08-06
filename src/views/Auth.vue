<template>
  <div class="auth">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          contain
          height="200"
        />

        <div class="mt-5">
          <v-btn
            :loading="loading"
            large
            color="primary"
            @click="signInWithGithub()"
          >
            Sign In with Github
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>  
</template>

<script>
import firebase from 'firebase/app'
import lStorage from '@/local-storage'

export default {
  name: 'Auth',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async signInWithGithub() {
      try {
        this.loading = true
        const provider = new firebase.auth.GithubAuthProvider()

        // Getting github oauth token
        const result = await firebase.auth().signInWithPopup(provider)
        const token = result.credential.accessToken

        // Saving token in global application state and in local storage
        this.$store.dispatch('updateGithubAccessToken', token)
        lStorage.updateGithubAccessToken(token)

        // Finishing authentication
        this.$toast.success('Authentication completed')
        this.$router.push({ name: 'home' })

      } catch (err) {
        this.$toast.error(err.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
