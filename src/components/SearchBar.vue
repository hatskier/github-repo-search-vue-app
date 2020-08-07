<template>
  <div>
    <v-menu
      v-model="menu"
      bottom
      :offset-y="true"
      :disabled="selectableOptions.length === 0"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="attrs"
          v-on="on"
          class="pa-5 pb-1 mb-4"
          outlined
          label="Search github repositories | click to select from saved"
          v-model="searchQuery"
          clearable
          hide-details
          :loading="loading"
          @keyup.enter.native="performSearch"
          append-icon="search"
          @click:append="performSearch"
        ></v-text-field>
      </template>
      <v-list>
        <v-list-item
          v-for="(term, index) in selectableOptions"
          :key="index"
          @click="selectTerm(term)"
        >
          <v-list-item-title>{{ term }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>chevron_right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      menu: false,
    }
  },
  props: {
    loading: Boolean,
    selectableOptions: Array,
  },
  methods: {
    selectTerm(selectedTerm) {
      this.searchQuery = selectedTerm
      this.performSearch()
    },
    performSearch() {
      this.$emit('search', this.searchQuery)
    },
    hideMenu() {
      this.menu = false
    }
  },
  watch: {
    searchQuery() {
      this.hideMenu()
    }
  },
}
</script>

<style scoped>

div.v-text-field__details {
  display: none;
}

</style>