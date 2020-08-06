<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Page not found</h1>
      </v-col>
      <v-col cols="12">
        <img
          id="not-found"
          :src="require('@/assets/not-found-image.png')"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          class="my-0"
          large
          color="primary"
          href="/#/"
          rounded
          :link="true"
        >
          <v-icon class="icon">keyboard_arrow_left</v-icon>
          Back to main
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style lang="scss" scoped>
#not-found {
  width: 500px;
}
</style>
