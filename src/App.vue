<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Main from '@/views/index.vue';
</script>

<template>
  <v-app class="main" full-height>
    <router-view></router-view>
  </v-app>
</template>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
