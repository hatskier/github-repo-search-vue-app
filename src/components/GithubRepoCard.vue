<template>
  <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item three-line>
      
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ name }}
        </v-list-item-title>
        <div class="mb-8">
          by
          <a :href="ownerUrl" target="_blank">
            {{ owner }}
          </a>
        </div>

        <v-list-item-subtitle>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                star
              </v-icon>
            </template>
            <span>Stars</span>
          </v-tooltip>
          {{ stars }}
        </v-list-item-subtitle>

        <div class="mt-2 mb-2">
          <v-list-item-subtitle>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Open issues</span>
            </v-tooltip>
            
            {{ openIssues }}
          </v-list-item-subtitle>
        </div>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        class="rounded"
        color="grey"
      >
        <img
          v-if="ownerAvatar"
          :src="ownerAvatar"
        />
        <v-icon size="70" v-if="!ownerAvatar" dark>
          mdi-account-circle
        </v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        color="blue"
        text
        :link="true"
        target="_blank"
        :href="url"
      >
        OPEN
        <v-icon
          small
          class="pa-2"
        >
          open_in_new
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GithubRepoCard',
  props: {
    name: String,
    url: String,
    owner: String,
    ownerUrl: String,
    ownerAvatar: String,
    stars: Number,
    openIssues: Number,
  }
}
</script>
