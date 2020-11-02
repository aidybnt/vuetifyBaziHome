<template>
  <div>
    <v-app-bar app color="blue-grey darken-2" elevation="9">

      <v-icon color="white">mdi-power-standby</v-icon>
      <v-spacer class="text-center">
        <span class="text-h5 white--text"
              style="letter-spacing: 5px !important;font-weight: lighter;">
          {{ title }}
        </span>
      </v-spacer>
      <v-icon color="white">mdi-export</v-icon>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "Head",
  components: {},
  data() {
    return {
      title: '科学五行八字',
    }
  }

}
</script>

<style scoped>

</style>