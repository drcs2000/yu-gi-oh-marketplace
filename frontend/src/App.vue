<template>
  <div id="app">
    <navBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import navBar from "./components/navBar.vue"
import Footer from "./components/footer.vue"
export default {
  name: 'App',
  components: {
    navBar,
    Footer
  }
};
</script>

<style>
@import "./index.css";
</style>
