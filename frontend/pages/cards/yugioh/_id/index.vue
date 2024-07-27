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
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card v-if="yugiohCard" class="pa-4">
              <v-row>
                <v-col cols="12" md="4">
                  <v-img
                    :src="yugiohCard.card_images[0].image_url"
                    class="card-image mb-4"
                  />
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-title>{{ yugiohCard.name }}</v-card-title>
                  <v-card-subtitle class="mb-2">{{
                    yugiohCard.type
                  }}</v-card-subtitle>
                  <v-divider class="mb-4"></v-divider>
                  <v-row>
                    <v-col cols="6">
                      <p>
                        <v-icon class="mr-2">mdi-star</v-icon
                        ><strong>Nível/Ranque:</strong>
                        {{ yugiohCard.level ?? yugiohCard.rank }}
                      </p>
                      <p>
                        <v-icon class="mr-2">mdi-sword-cross</v-icon
                        ><strong>ATK:</strong> {{ yugiohCard.atk }}
                      </p>
                      <p>
                        <v-icon class="mr-2">mdi-shield-half-full</v-icon
                        ><strong>DEF:</strong> {{ yugiohCard.def }}
                      </p>
                    </v-col>
                    <v-col cols="6">
                      <p>
                        <v-icon class="mr-2">mdi-calendar</v-icon
                        ><strong>Data TCG:</strong> {{ yugiohCard.tcg_date }}
                      </p>
                      <p>
                        <v-icon class="mr-2">mdi-calendar</v-icon
                        ><strong>Data OCG:</strong> {{ yugiohCard.ocg_date }}
                      </p>
                      <p>
                        <v-icon class="mr-2">mdi-element</v-icon
                        ><strong>Atributo:</strong> {{ yugiohCard.attribute }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-card-title class="headline mb-2">Texto do Card</v-card-title>
              <v-card-text>{{ yugiohCard.desc }}</v-card-text>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    v-for="format in yugiohCard.card_sets"
                    :key="format.set_code"
                    class="ma-2"
                    small
                    outlined
                    color="green"
                  >
                    {{ format.set_name }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-alert v-else type="error">Card not found</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardId: null,
      fetching: false,
      yugiohCard: null,
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
        .dispatch("yugioh/fetchYugiohCardById", this.cardId)
        .then((card) => {
          this.yugiohCard = card;
          this.fetching = false;
        })
        .catch((error) => {
          console.error("Error fetching card:", error);
          this.yugiohCard = null;
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
