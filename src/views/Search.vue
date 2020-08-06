<template>
  <div class="search">
    <SearchBar @search="performSearch" />

    <GithubRepoCard />

    {{ repositories }}
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import GithubRepoCard from '@/components/GithubRepoCard'

export default {
  name: 'Search',
  data() {
    return {
      lastSearchedQuery: '',
      repositories: [],
    }
  },
  methods: {
    performSearch(searchQuery) {
      // TODO implement github graphql integration here
      this.$toast.success(`It will search for query: ${searchQuery}`)
    }
  },
  computed: {

  },
  components: {
    SearchBar,
    GithubRepoCard,
  },
}
</script>

<style>

</style>
