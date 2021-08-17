<template>
  <div class="app">
    <h1 class="mb-5 text-secondary">Pizza Menu</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "./assets/sass/global.scss";
</style>
