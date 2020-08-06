<template>
  <div>
    <v-text-field
      class="pa-5"
      outlined
      label="Search github repositories"
      v-model="searchQuery"
      clearable
      :loading="loading"
      @keyup.enter.native="performSearch"
      append-icon="search"
      @click:append="performSearch"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
    }
  },
  props: {
    value: String,
    loading: Boolean,
  },
  methods: {
    performSearch() {
      this.$emit('search', this.searchQuery)
    },
  },
}
</script>

<style>

</style>