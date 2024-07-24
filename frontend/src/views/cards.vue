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
                <button @click="addCard(card.id)" class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700]">
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
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
    async addCard(cardId) {
      try {
        await this.addCardToUser([cardId]);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Carta adicionada ao seu inventário.',
          background: '#2f2524',
          color: '#ffffff',
          confirmButtonColor: '#a98736',
          customClass: {
            popup: 'custom-swal-popup',
          }
        });
      } catch (error) {
        console.error('Failed to add card:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um problema ao adicionar a carta.',
          background: '#2f2524',
          color: '#ffffff',
          confirmButtonColor: '#a98736',
          customClass: {
            popup: 'custom-swal-popup',
          }
        });
      }
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

<style>
.custom-swal-popup {
  border: 1px solid #FFD700;
}
</style>
