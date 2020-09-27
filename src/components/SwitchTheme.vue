<template>
  <v-btn @click="$emit('change')" icon>
    <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
    <v-icon v-else>mdi-weather-night</v-icon>
  </v-btn>
</template>