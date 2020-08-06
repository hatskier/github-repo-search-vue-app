<template>
  <v-app-bar
    app
    color="primary"
    flat
    dense
    dark
  >
    <div class="d-flex align-center">
      <a href="/#/">
        <v-img
          alt="Github Repo Search Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/logo.png')"
          transition="scale-transition"
          width="40"
        />
      </a>
    </div>

    <a v-if="showBackToMainLink" href="/#/" id="back-to-main-link" >
      <v-toolbar-title>
        <v-icon dark>
          keyboard_arrow_left
        </v-icon>
        Back to main
      </v-toolbar-title>
    </a>


    <v-spacer></v-spacer>

    <div
      v-if="isUserSignedIn"
      @click="navigateToProfile()"
      class="avatar-wrapper"
    >
      <UserAvatar :size="38" />
    </div>
  </v-app-bar>
</template>

<script>
import UserAvatar from './UserAvatar'

export default {
  name: 'NavBar',
  computed: {
    isUserSignedIn() {
      return Boolean(this.$store.state.currentUser.uid)
    },
    showBackToMainLink() {
      return !['home', 'auth'].includes(this.$route.name)
    }
  },
  methods: {
    navigateToProfile() {
      if (this.$route.name !== 'profile')
      this.$router.push({ name: 'profile' })
    }
  },
  components: {
    UserAvatar,
  },
}
</script>

<style scoped lang="scss">

#back-to-main-link {
  color: white;
  text-decoration: none;

  i {
    position: relative;
    bottom: 1px;
  }

  &:hover {
    opacity: 0.8;
  }
}

.avatar-wrapper {
  box-shadow: 0 0 0 2px white;
  border-radius: 50%;
  &:hover {
    box-shadow: 0 0 2px 3px white;
    cursor: pointer;
  }
}

</style>
