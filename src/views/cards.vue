<template>
  <div class="dashboard-container">
    <div class="header flex justify-between items-center p-4 bg-[#2f2524] mb-6 rounded-lg border border-[#FFD700]">
      <h1 class="text-3xl font-bold">Cartas</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterCards"
        placeholder="Pesquisar Cartas..."
        class="p-2 rounded-lg border border-gray-300 text-black"
      />
    </div>
    <div class="cards-grid p-4">
      <div v-for="card in filteredCards" :key="card.id" class="card-container">
        <div class="card-flip">
          <div class="card-front">
            <img :src="card.imageUrl" :alt="card.name" class="card-image" />
          </div>
          <div class="card-back">
            <div class="card-content">
              <h2 class="card-name">{{ card.name }}</h2>
              <p class="card-description">{{ card.description }}</p>
              <div class="flex justify-center mt-4">
                <button @click="addCard(card.id)" class="flex items-center justify-center  bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700]">
                  <i class="fas fa-plus mr-2" /> Adicionar Carta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useHead } from '@vueuse/head';

export default {
  name: 'Cards',
  setup() {
    useHead({
      title: 'Cartas'
    });
  },
  data() {
    return {
      searchQuery: '',
      filteredCards: [],
    };
  },
  computed: {
    ...mapGetters(['allCards']),
  },
  methods: {
    ...mapActions(['fetchAllCards', 'addCardToUser']),
    addCard(cardId) {
      this.addCardToUser([cardId]);
    },
    filterCards() {
      this.filteredCards = this.allCards.filter(card => {
        const cardName = card.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return cardName.includes(query);
      });
    },
  },
  watch: {
    allCards: {
      handler() {
        this.filterCards();
      },
      immediate: true,
    },
  },
  created() {
    this.fetchAllCards();
  },
};
</script>
