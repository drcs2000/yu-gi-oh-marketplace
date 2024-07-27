<template>
  <v-app>
    <div class="background-container">
      <navBar />
      <v-main>
        <Nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  components: {
    navBar: () => import('~/components/common/navBar.vue')
  }
}
</script>

<style>
.background-container {
  position: relative;
  min-height: 100vh;
  max-width: 100%;
}

@media (min-width: 1920px) {
  .background-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    z-index: 0;
  }
}

.max-width {
  max-width: 1280px;
}
</style>
