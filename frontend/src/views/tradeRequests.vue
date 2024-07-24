<template>
  <div class="dashboard-container">
    <div class="header flex justify-between items-center p-4 bg-[#2f2524] mb-6 rounded-lg border border-[#FFD700]">
      <h1 class="text-3xl font-bold">Trocas</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterTrades"
        placeholder="Pesquisar Trocas..."
        class="p-2 rounded-lg border border-gray-300 text-black"
      />
    </div>
    <div class="trades-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div v-for="(trade, index) in filteredTradeRequests" :key="index" class="trade-item p-4 bg-[#2f2524] rounded-lg shadow-md border border-[#FFD700]">
        <div class="trade-info mb-4">
          <div class="trade-cards flex justify-between items-center mb-4">
            <div class="card">
              <p class="card-name">{{ getCardName(trade.tradeCards, 'OFFERING') }}</p>
              <img :src="getCardImage(trade.tradeCards, 'OFFERING')" alt="Oferta" class="cards-image mb-2 rounded-lg">
              <p class="text-sm">Oferecendo</p>
            </div>
            <div class="card">
              <p class="card-name">{{ getCardName(trade.tradeCards, 'RECEIVING') }}</p>
              <img :src="getCardImage(trade.tradeCards, 'RECEIVING')" alt="Recebendo" class="cards-image mb-2 rounded-lg">
              <p class="text-sm">Recebendo</p>
            </div>
          </div>
          <div class="trade-details text-sm text-gray-300">
            <p class="font-bold">Usuário: {{ trade.user.name }}</p>
            <p class="font-bold">Data: {{ new Date(trade.createdAt).toLocaleDateString() }}</p>
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
  name: 'Home',
  setup() {
    useHead({
      title: 'Trocas'
    });
  },
  data() {
    return {
      searchQuery: '',
      filteredTradeRequests: [],
    };
  },
  computed: {
    ...mapGetters(['tradeRequests']),
  },
  methods: {
    ...mapActions(['fetchAllTradeRequests']),
    getCardName(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card ? card.card.name : 'Nome não disponível';
    },
    getCardImage(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card && card.card.imageUrl ? card.card.imageUrl : require('../../public/images/back.png');
    },
    filterTrades() {
      this.filteredTradeRequests = this.tradeRequests.filter(trade => {
        const offeringCard = this.getCardName(trade.tradeCards, 'OFFERING').toLowerCase();
        const receivingCard = this.getCardName(trade.tradeCards, 'RECEIVING').toLowerCase();
        const userName = trade.user.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return offeringCard.includes(query) || receivingCard.includes(query) || userName.includes(query);
      });
    }
  },
  watch: {
    tradeRequests: {
      handler() {
        this.filterTrades();
      },
      immediate: true,
    },
  },
  created() {
    this.fetchAllTradeRequests();
  },
};
</script>
