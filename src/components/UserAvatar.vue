<template>
  <v-avatar :size="size">
    <img
      v-if="currentUser.photoURL"
      :src="currentUser.photoURL"
      :alt="currentUser.displayName"
    />

    <v-icon v-if="!currentUser.photoURL" dark>
      mdi-account-circle
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    size: Number,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    },
  },
}
</script>
