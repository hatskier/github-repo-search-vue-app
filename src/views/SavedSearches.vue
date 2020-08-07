<template>
  <div class="saved-searches">
    <h1 class="text-center mt-3">Saved searches</h1>

    <v-card max-width="500" class="mx-auto mt-5">
      <v-list>
        <v-list-item
          v-for="(term, index) in searchTerms"
          :key="index"
          @click="deleteTerm(term)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="term"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon>delete</v-icon>
          </v-list-item-icon>
        </v-list-item>

      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SavedSearches',
  data() {
    return {

    }
  },
  computed: {
    searchTerms() {
      return this.$store.state.savedSearchTerms
    }
  },
  methods: {
    async deleteTerm(term) {
      const question = 'Are you sure you want to delete this search term?'
      const deletionConfirmation = await this.$confirm(question)
      if (deletionConfirmation) {
        this.$store.dispatch('deleteSearchTerm', term)
        this.$toast.success('Search term deleted')
      }
    }
  }
}
</script>
