<template>
  <v-container fluid fill-height>
    <v-row class="mt-2 mb-4" justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="0" class="custom-card d-flex flex-row align-center">
          <div class="text-section">
            <h1 class="font-weight-bold" style="font-size: 4rem">
              <span class="highlight">Explore</span> <br />
              o mundo <br />
              das cartas
            </h1>
            <p class="caption">
              Descubra cartas raras e exclusivas para a sua coleção!
            </p>
            <v-btn class="explore-btn" small outlined color="black" dark
              >Explorar Agora</v-btn
            >
          </div>
          <div class="image-section">
            <img
              src="@/assets/images/home.png"
              alt="Home Image"
              class="home-image"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="logo-section">
      <v-col
        v-for="logo in logos"
        :key="logo.name"
        cols="12"
        md="6"
        class="d-flex justify-center"
      >
        <img :src="logo.src" :alt="logo.name" class="brand-logo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pokemonLogo from "../assets/images/pokemon.png";
import yugiohLogo from "../assets/images/yugioh.png";

export default {
  name: "HomePage",
  data() {
    return {
      logos: [
        { name: "pokemon", src: pokemonLogo },
        { name: "Yu-Gi-Oh!", src: yugiohLogo },
        // Adicione mais logos conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
.custom-card {
  background-color: #f4f6f5;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  display: flex;
  align-items: center;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.image-section {
  flex: 1;
  border-radius: 16px;
  margin-left: 20px;
}

.highlight {
  background: linear-gradient(to right, #ffd700, #ffd90018);
  padding: 0 10px;
}

.explore-btn {
  margin-bottom: 40px;
  bottom: 0;
  position: absolute;
}

.logo-section {
  background-color: #2f2524 !important;
  padding: 20px;
  margin-top: 40px;
  width: 100%;
}

.brand-logo {
  max-height: 50px;
}
</style>
