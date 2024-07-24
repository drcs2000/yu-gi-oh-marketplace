<template>
  <div class="layout">
    <NavBar />
    <main class="main-content">
      alfkgjSJ
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Footer: () => import('~/components/common/footer.vue'),
    NavBar: () => import('~/components/common/navBar.vue')
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
