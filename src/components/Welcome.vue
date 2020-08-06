<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Github Search
        </h1>

        <p class="subheading font-weight-regular">
          This web app allows you to search github repositories using public
          <a target="_blank" href="https://docs.github.com/en/graphql">
            GitHub GraphQL API
          </a>
        </p>
      </v-col>

      <v-col v-for="link in links" :key="link.text" cols="12" sm="6" md="6" lg="4">
        <a :href="link.link" class="main-nav-link" >
          <v-card
            class="pa-2 ma-2 nav-card"
            outlined
          >
            <v-card-title>
              <v-icon class="pr-3" color="primary">
                {{ link.icon }}
              </v-icon>
              {{ link.text }}
              
            </v-card-title>
            
          </v-card>
        </a>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Welcome',

    data() {
      return {
        links: [
          { icon: 'search', text: 'Search repositories', link: '/#/search' },
          { icon: 'save', text: 'Saved searches', link: '/#/saved-searches' },
          { icon: 'person', text: 'My profile', link: '/#/profile' },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
}

.nav-card {
  &:hover{
    border: 1px solid #1976d2;
  }
}

</style>
