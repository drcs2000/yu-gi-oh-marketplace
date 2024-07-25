<template>
  <v-app-bar app class="bg-grey darken-3" dark>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <v-row>
            <v-col cols="auto" v-for="item in items" :key="item.title">
              <v-btn text @click="navigate(item.route)">
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="auto">
          <v-btn text @click="navigate('/login')" class="login">
            <v-icon left>mdi-login</v-icon>
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
        { title: 'Cards', icon: 'mdi-cards', route: '/cards' },
        { title: 'Trade Requests', icon: 'mdi-swap-horizontal', route: '/trade-requests' }
      ]
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
