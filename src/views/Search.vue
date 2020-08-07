<template>
  <div class="search">
    <SearchBar
      :loading="loading"
      @search="performSearch"
      :selectableOptions="savedSearchTerms"
    />

    <h2 v-if="currentSearchTerm" class="text-center">
      <span class="light-text">Results for:</span>
      {{ currentSearchTerm }}
      <v-tooltip v-if="!searchTermIsSaved(currentSearchTerm)" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="saveSearchTerm()"
          >
            <v-icon>save</v-icon>
          </v-btn>
        </template>
        <span>Save this search term</span>
      </v-tooltip>
      
    </h2>

    <v-container>
      <v-row>
        <v-col
          v-for="({ repo }, index) in repositories"
          :key="index" cols="12" sm="6" md="4"
        >
          <GithubRepoCard
            :name="repo.name"
            :url="repo.url"
            :owner="repo.owner.login"
            :ownerUrl="repo.owner.url"
            :ownerAvatar="repo.owner.avatarUrl"
            :stars="repo.stars.totalCount"
            :openIssues="repo.openIssues.totalCount"
          />
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import GithubRepoCard from '@/components/GithubRepoCard'

export default {
  name: 'Search',
  data() {
    return {
      currentSearchTerm: '',
      repositories: [],
      loading: false,
    }
  },
  methods: {
    async performSearch(searchTerm) {
      try {
        this.loading = true
        this.currentSearchTerm = searchTerm
        const response = await this.$apollo.query({
          query: require('@/graphql/search-repos.gql'),
          variables: {
            filterQuery: `${searchTerm} in:name,description"`
          }
        })
        this.repositories = response.data.search.repos
      } catch (err) {
        console.error(err)
        this.$toast.error(err.message)
      } finally {
        this.loading = false
      }
    },

    saveSearchTerm() {
      this.$store.dispatch('addSearchTerm', this.currentSearchTerm)
      this.$toast.success('Search term saved')
    },

    searchTermIsSaved(searchTerm) {
      return this.savedSearchTerms.includes(searchTerm)
    },
  },

  computed: {
    savedSearchTerms() {
      return this.$store.state.savedSearchTerms
    }
  },

  components: {
    SearchBar,
    GithubRepoCard,
  },
}
</script>

<style scoped>

.light-text {
  font-weight: 300;
}

</style>
