<template>
  <div>
    <template v-if="fetching">
      <v-main>
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
              <h1 class="text-center mb-5">Carregando informações</h1>
              <v-progress-linear indeterminate />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </template>
    <template v-else>
      <v-container>
        <v-row v-if="pokemonCard" justify="center">
          <v-col cols="12" md="4">
            <v-card class="mb-4" elevation="0">
              <v-img :src="pokemonCard.images.large" class="card-image" />
              <v-card-title>{{ pokemonCard.name }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-tabs v-model="activeTab" background-color="white">
                <v-tab>Informações Básicas</v-tab>
                <v-tab>Informações Adicionais</v-tab>
                <v-tab>Set</v-tab>
              </v-tabs>
              <v-tabs-items v-model="activeTab">
                <v-tab-item>
                  <v-card flat class="pa-4">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="6">
                          <p><v-icon class="mr-2">mdi-dna</v-icon><strong>Supertype:</strong> {{ pokemonCard.supertype }}</p>
                          <p><v-icon class="mr-2">mdi-subdirectory-arrow-right</v-icon><strong>Subtypes:</strong> {{ pokemonCard.subtypes.join(', ') }}</p>
                          <p><v-icon class="mr-2">mdi-heart-pulse</v-icon><strong>HP:</strong> {{ pokemonCard.hp }}</p>
                          <v-progress-linear :value="pokemonCard.hp / 340 * 100" color="red" class="mb-2"></v-progress-linear>
                          <p><v-icon class="mr-2">mdi-pokeball</v-icon><strong>Tipos:</strong> {{ pokemonCard.types.join(', ') }}</p>
                          <p><v-icon class="mr-2">mdi-poll</v-icon><strong>Evolui de:</strong> {{ pokemonCard.evolvesFrom ?? 'Nada' }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p><v-icon class="mr-2">mdi-sword-cross</v-icon><strong>Ataques:</strong></p>
                          <ul>
                            <li v-for="attack in pokemonCard.attacks" :key="attack.name">
                              <strong>{{ attack.name }}:</strong> {{ attack.damage }} - {{ attack.text }}
                            </li>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pa-4">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="6">
                          <p><v-icon class="mr-2">mdi-alert-circle</v-icon><strong>Fraquezas:</strong> {{ pokemonCard.weaknesses ? pokemonCard.weaknesses.map(weakness => weakness.type + ' ' + weakness.value).join(', ') : 'Nenhuma' }}</p>
                          <p><v-icon class="mr-2">mdi-shield</v-icon><strong>Resistências:</strong> {{ pokemonCard.resistances ? pokemonCard.resistances.map(resistance => resistance.type + ' ' + resistance.value).join(', ') : 'Nenhuma' }}</p>
                          <p><v-icon class="mr-2">mdi-walk</v-icon><strong>Custo de Retirada:</strong> {{ pokemonCard.retreatCost ? pokemonCard.retreatCost.join(', ') : 'Nenhum' }}</p>
                          <p><v-icon class="mr-2">mdi-palette</v-icon><strong>Artista:</strong> {{ pokemonCard.artist }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p><v-icon class="mr-2">mdi-star</v-icon><strong>Raridade:</strong> {{ pokemonCard.rarity }}</p>
                          <p><v-icon class="mr-2">mdi-message-text</v-icon><strong>Texto de Sabor:</strong> {{ pokemonCard.flavorText }}</p>
                          <p><v-icon class="mr-2">mdi-numeric</v-icon><strong>Número na Pokédex Nacional:</strong> {{ pokemonCard.nationalPokedexNumbers.join(', ') }}</p>
                          <p><v-icon class="mr-2">mdi-scale-balance</v-icon><strong>Legalidades:</strong> {{ pokemonCard.legalities ? Object.keys(pokemonCard.legalities).join(', ') : 'Nenhuma' }}</p>
                        </v-col>
                      </v-row>                      
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pa-4">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <p><strong>Set:</strong> {{ pokemonCard.set.name }} - {{ pokemonCard.set.series }}</p>
                          <p><strong>Impressão Total:</strong> {{ pokemonCard.set.printedTotal }}</p>
                          <p><strong>Total:</strong> {{ pokemonCard.set.total }}</p>
                          <p><strong>Código PTCGO:</strong> {{ pokemonCard.set.ptcgoCode }}</p>
                          <p><strong>Data de Lançamento:</strong> {{ pokemonCard.set.releaseDate }}</p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-alert type="error">Card not found</v-alert>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home",
    };
  },
  data() {
    return {
      cardId: null,
      fetching: false,
      pokemonCard: null,
      activeTab: 0
    };
  },
  created() {
    this.cardId = this.$route.params.id;
    this.fetch();
  },
  methods: {
    fetch() {
      if (this.fetching) {
        return;
      }
      this.fetching = true;

      this.$store
        .dispatch("pokemon/fetchPokemonCardById", this.cardId)
        .then((card) => {
          this.pokemonCard = card;
          this.fetching = false;
        })
        .catch((error) => {
          console.error("Error fetching card:", error);
          this.pokemonCard = null;
          this.fetching = false;
        });
    },
  },
};
</script>

<style scoped>
.card-image {
  max-height: 500px;
  width: auto;
}
</style>
