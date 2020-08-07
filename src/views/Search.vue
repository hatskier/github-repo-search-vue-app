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

    <div v-if="repositories.length > 0" class="text-center paging mt-3">
        <v-btn
          :disabled="!currentPageInfo.hasNextPage"
          color="primary"
          outlined
          @click="nextPage()"
        >
          Next page
          <v-icon>
            mdi-menu-right
          </v-icon>
        </v-btn>
    </div>

    <v-container>
      <v-row>
        <v-col
          v-for="({ repo, cursor }, index) in repositories"
          :key="index" cols="12" sm="6" md="4"
        >
          <GithubRepoCard
            :name="repo.name"
            :url="repo.url"
            :owner="repo.owner.login + cursor"
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

const DEFAULT_PAGE_SIZE = 9

export default {
  name: 'Search',
  data() {
    return {
      currentSearchTerm: '',
      repositories: [],
      loading: false,
      currentPageInfo: {},
    }
  },
  methods: {
    async performSearch(searchTerm, pagingVariables = {}) {
      try {
        this.loading = true
        this.currentSearchTerm = searchTerm
        const response = await this.$apollo.query({
          query: require('@/graphql/search-repos.gql'),
          variables: {
            ...pagingVariables,
            filterQuery: `${searchTerm} in:name,description"`,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        })
        this.currentPageInfo = response.data.search.pageInfo
        this.repositories = response.data.search.repos
      } catch (err) {
        console.error(err)
        this.$toast.error(err.message)
      } finally {
        this.loading = false
      }
    },

    async nextPage() {
      if (this.currentPageInfo.hasNextPage) {
        await this.performSearch(this.currentSearchTerm, {
          after: this.currentPageInfo.endCursor,
        })
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
    },
  },

  components: {
    SearchBar,
    GithubRepoCard,
  },
}
</script>

<style scoped lang="scss">

.light-text {
  font-weight: 300;
}

.square {
  padding: 5px 10px;
  border: 1px solid lightgray;
  color: black;
  border-radius: 3px;
  width: 25px;
  margin: 3px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px #1976d2;
  }

  &.disabled {
    opacity: 0.5;
    &:hover {
      box-shadow: none;
    }
  }

}

</style>
