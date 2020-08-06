<template>
  <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item three-line>
      
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Value 1
        </v-list-item-title>
        <div class="mb-8">
          Value 2
        </div>

        <v-list-item-subtitle>
          Value 3
        </v-list-item-subtitle>

        <div class="mt-2 mb-2">
          <v-list-item-subtitle>
            Value 4
          </v-list-item-subtitle>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        color="blue"
        text
      >
        ACTION
        <v-icon
          small
          class="pa-2"
        >
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>