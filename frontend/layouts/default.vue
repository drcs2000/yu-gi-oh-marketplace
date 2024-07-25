<template>
  <v-app>
    <VerticalNavBar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    VerticalNavBar: () => import('~/components/common/navBar.vue')
  }
}
</script>
