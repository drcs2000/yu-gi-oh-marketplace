<template>
  <transition name="fade">
    <v-app-bar
      class="bg-grey darken-3"
      dark
      elevation="0"
      app
    >
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-row>
              <v-col v-for="item in items" :key="item.title">
                <v-btn text @click="navigate(item.route)">
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </transition>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        { title: "Pokemon", icon: "mdi-pokeball", route: "/pokemon" },
        { title: "Digimon", icon: "mdi-google-downasaur", route: "/digimon" }
      ],
      lastScrollY: 0,
      showAppBar: true,
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.bg-grey {
  background-color: #2f2524 !important;
}
</style>
