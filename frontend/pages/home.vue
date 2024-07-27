<template>
  <div>
    <div class="diagonal-background">
      <div class="left-background"></div>
      <div class="right-background"></div>
      <div class="center-message">
        <h1>Discover the Ultimate Pokémon and Digimon Universe!</h1>
      </div>
    </div>

    <v-container
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
      "
    >
      <v-col class="max-width">
        <v-row class="my-5" justify="center">
          <v-col cols="12">
            <div class="title-with-icon">
              <v-icon left>mdi-pokeball</v-icon>
              <h2 class="text-center">Select the Pokémon Type</h2>
            </div>
          </v-col>
        </v-row>
        <v-slide-group show-arrows class="slider-background">
          <v-slide-item
            v-for="(typeObj, index) in pokemonTypes"
            :key="index"
          >
            <v-card
              elevation="0"
              height="300"
              width="300"
              class="mb-2 mx-3 d-flex justify-center align-center monster-card"
              outlined
              @mouseover="setSelectedPokemon(index)"
              @mouseleave="resetHoveredIndex"
            >
              <v-img
                :src="require(`@/assets/gifs/pokemon/${typeObj.name}.gif`)"
                alt="Pokémon Gif"
                class="monster-gif"
              />
              <div
                :class="[
                  'monster-card-overlay',
                  { show: selectedPokemon === index },
                ]"
                :style="{ backgroundColor: typeObj.overlayColor }"
              >
                <v-btn block text class="white--text overlay-btn">{{
                  typeObj.type
                }}</v-btn>
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-row class="my-5">
          <v-col cols="12">
            <div class="title-with-icon">
              <v-icon left>mdi-pokeball</v-icon>
              <h2 class="text-center">Select the Digimon Type</h2>
            </div>
          </v-col>
        </v-row>
        <v-slide-group show-arrows class="slider-background">
          <v-slide-item
            v-for="(typeObj, index) in digimonTypes"
            :key="index"
          >
            <v-card
              elevation="0"
              height="300"
              width="300"
              class="mb-2 mx-3 d-flex justify-center align-center monster-card"
              outlined
              @mouseover="setSelectedDigimon(index)"
              @mouseleave="resetSelectedDigimon"
            >
              <v-img
                :src="require(`@/assets/gifs/digimon/${typeObj.name}.gif`)"
                alt="Pokémon Gif"
                class="monster-gif"
              />
              <div
                :class="[
                  'monster-card-overlay',
                  { show: selectedDigimon === index },
                ]"
                :style="{ backgroundColor: typeObj.overlayColor }"
              >
                <v-btn block text class="white--text overlay-btn">{{
                  typeObj.type
                }}</v-btn>
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "DiagonalBackground",
  head() {
    return {
      title: "Home",
    };
  },
  data() {
    return {
      selectedPokemon: -1,
      selectedDigimon: -1,
      pokemonTypes: [
        {
          type: "Normal",
          name: "Snorlax",
          color: "#A8A77A",
          overlayColor: "rgba(168, 167, 122, 0.5)",
        },
        {
          type: "Fire",
          name: "Charizard",
          color: "#EE8130",
          overlayColor: "rgba(238, 129, 48, 0.5)",
        },
        {
          type: "Water",
          name: "Squirtle",
          color: "#6390F0",
          overlayColor: "rgba(99, 144, 240, 0.5)",
        },
        {
          type: "Electric",
          name: "Pikachu",
          color: "#F7D02C",
          overlayColor: "rgba(247, 208, 44, 0.5)",
        },
        {
          type: "Grass",
          name: "Bulbasaur",
          color: "#7AC74C",
          overlayColor: "rgba(122, 199, 76, 0.5)",
        },
        {
          type: "Ice",
          name: "Articuno",
          color: "#96D9D6",
          overlayColor: "rgba(150, 217, 214, 0.5)",
        },
        {
          type: "Fighting",
          name: "Hitmonlee",
          color: "#C22E28",
          overlayColor: "rgba(194, 46, 40, 0.5)",
        },
        {
          type: "Poison",
          name: "Gengar",
          color: "#A33EA1",
          overlayColor: "rgba(163, 62, 161, 0.5)",
        },
        {
          type: "Ground",
          name: "Cubone",
          color: "#E2BF65",
          overlayColor: "rgba(226, 191, 101, 0.5)",
        },
        {
          type: "Flying",
          name: "Murkrow",
          color: "#A98FF3",
          overlayColor: "rgba(169, 143, 243, 0.5)",
        },
        {
          type: "Psychic",
          name: "Mewtwo",
          color: "#F95587",
          overlayColor: "rgba(249, 85, 135, 0.5)",
        },
        {
          type: "Bug",
          name: "Scyther",
          color: "#A6B91A",
          overlayColor: "rgba(166, 185, 26, 0.5)",
        },
        {
          type: "Rock",
          name: "Geodude",
          color: "#B6A136",
          overlayColor: "rgba(182, 161, 54, 0.5)",
        },
        {
          type: "Ghost",
          name: "Gastly",
          color: "#735797",
          overlayColor: "rgba(115, 87, 151, 0.5)",
        },
        {
          type: "Dragon",
          name: "Dragonite",
          color: "#6F35FC",
          overlayColor: "rgba(111, 53, 252, 0.5)",
        },
        {
          type: "Dark",
          name: "Absol",
          color: "#705746",
          overlayColor: "rgba(112, 87, 70, 0.5)",
        },
        {
          type: "Steel",
          name: "Metagross",
          color: "#B7B7CE",
          overlayColor: "rgba(183, 183, 206, 0.5)",
        },
        {
          type: "Fairy",
          name: "Jigglypuff",
          color: "#D685AD",
          overlayColor: "rgba(214, 133, 173, 0.5)",
        },
      ],
      digimonTypes: [
        { name: "Agumon", type: "Fire", overlayColor: "rgba(255, 69, 0, 0.5)" },
        {
          name: "Andromon",
          type: "Data",
          overlayColor: "rgba(0, 191, 255, 0.5)",
        },
        {
          name: "Angemon",
          type: "Holy",
          overlayColor: "rgba(255, 215, 0, 0.5)",
        },
        {
          name: "BlackWarGreymon",
          type: "Dark",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
        {
          name: "Etemon",
          type: "Earth",
          overlayColor: "rgba(139, 69, 19, 0.5)",
        },
        {
          name: "Garurumon",
          type: "Beast",
          overlayColor: "rgba(128, 128, 128, 0.5)",
        },
        {
          name: "Gomamon",
          type: "Water",
          overlayColor: "rgba(0, 0, 255, 0.5)",
        },
        {
          name: "Guilmon",
          type: "Virus",
          overlayColor: "rgba(128, 0, 128, 0.5)",
        },
        {
          name: "Ikkakumon",
          type: "Ice",
          overlayColor: "rgba(173, 216, 230, 0.5)",
        },
        {
          name: "Kabuterimon",
          type: "Insect",
          overlayColor: "rgba(0, 128, 0, 0.5)",
        },
        {
          name: "Lillymon",
          type: "Plant",
          overlayColor: "rgba(34, 139, 34, 0.5)",
        },
        {
          name: "MetalSeadramon",
          type: "Machine",
          overlayColor: "rgba(192, 192, 192, 0.5)",
        },
        {
          name: "Palmon",
          type: "Plant",
          overlayColor: "rgba(34, 139, 34, 0.5)",
        },
        {
          name: "Tentomon",
          type: "Electric",
          overlayColor: "rgba(255, 255, 0, 0.5)",
        },
        {
          name: "Zhuqiaomon",
          type: "Demon",
          overlayColor: "rgba(75, 0, 130, 0.5)",
        },
        {
          name: "Garudamon",
          type: "Bird",
          overlayColor: "rgba(255, 182, 193, 0.5)",
        },
        {
          name: "Patamon",
          type: "Free",
          overlayColor: "rgba(255, 140, 0, 0.5)",
        },
      ],
    };
  },
  methods: {
    setSelectedPokemon(index) {
      this.selectedPokemon = index;
    },
    setSelectedDigimon(index) {
      this.selectedDigimon = index;
    },
    resetHoveredIndex() {
      this.selectedPokemon = -1;
    },
    resetSelectedDigimon() {
      this.selectedDigimon = -1;
    },
  },
};
</script>

<style scoped>
.diagonal-background {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
  overflow: hidden;
  background-color: black;
}

.left-background,
.right-background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0.8;
  background-repeat: no-repeat;
  background-size: contain;
}

.left-background {
  left: 0;
  background-color: #b22222;
  background-image: url("@/assets/images/digimon_side.png");
  background-position: bottom left;
  clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
}

.right-background {
  right: 0;
  background-color: #ffcc00;
  background-image: url("@/assets/images/pokemon_side.png");
  background-position: bottom right;
  clip-path: polygon(60% 0, 100% 0, 100% 100%, 40% 100%);
}

.left-background:hover {
  transform: scale(1.05);
  opacity: 1;
  z-index: 2;
  cursor: pointer;
}

.right-background:hover {
  transform: scale(1.05);
  opacity: 1;
  z-index: 2;
  cursor: pointer;
}

.center-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 3;
}

.center-message h1 {
  font-size: 2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
}

.monster-gif {
  width: auto;
  height: 250px;
  object-fit: cover;
}

.monster-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.monster-card-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: top 0.3s ease, opacity 0.3s ease;
}

.monster-card:hover .monster-card-overlay {
  top: 0;
  opacity: 1;
}

.monster-card-overlay.show {
  top: 0;
  opacity: 1;
}

.overlay-btn {
  font-family: "Arial", sans-serif;
  font-size: 20px;
  color: white;
  margin: 2px 0;
}

.title-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-with-icon v-icon {
  margin-right: 10px;
}

.slider-background {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}
</style>

