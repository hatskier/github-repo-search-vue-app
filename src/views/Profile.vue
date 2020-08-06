<template>
  <div class="profile">
    <v-row class="text-center">
      <v-col cols="12">
        <UserAvatar :size="140" class="my-5" />
        <h1>Hi, {{ currentUser.displayName }}</h1>
        <p>Your email: {{ currentUser.email }}</p>
        <v-btn large outlined color="warning" @click="signOut()" >
        Sign Out
        <v-icon>
          directions_walk
        </v-icon>
      </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    },
  },
  methods: {
    async signOut() {
      try {
        const question = 'Are you sure you want to log out?'
        const logOutConfirmation = await this.$confirm(question)
        if (logOutConfirmation) {
          await firebase.auth().signOut()
          this.$toast.success(`You've been successfully signed out`)
        }
      } catch (err) {
        console.error(err)
        this.$toast.error('There was a problem with signing out :(')
      }
    },
  },
  components: {
    UserAvatar,
  },
}
</script>

<style scoped>

</style>
