<template>
  <div class="flex flex-col items-center justify-center pt-20">
    <div class="relative w-full text-center mb-10 pt-20 flex items-center justify-center h-screen">
      <div class="welcome-background"></div>
      <div class="welcome-overlay"></div>
      <div class="relative z-10 flex flex-col items-center justify-center p-5">
        <h1 class="text-5xl font-bold mb-5">Bem-vindo ao maior Marketplace de Yu-Gi-Oh! do país!</h1>
        <p class="text-2xl mb-5">Explore o emocionante mundo das cartas de Yu-Gi-Oh! e encontre cards raros e valiosos para sua coleção. Participe de trocas incríveis e faça parte desta comunidade apaixonada!</p>
      </div>
    </div>
    <div class="w-full flex">
      <div class="w-2/4 p-4">
        <h2 class="text-3xl font-bold text-center mb-5">Últimos Pedidos de Troca</h2>
        <div class="carousel">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(trade, index) in tradeRequests" :key="index" class="carousel-slide">
              <div class="trade-item">
                <div class="trade-info">
                  <div class="trade-cards">
                    <div class="card">
                      <p class="card-name">{{ getCardName(trade.tradeCards, 'OFFERING') }}</p>
                      <img :src="getCardImage(trade.tradeCards, 'OFFERING')" alt="Oferta" class="cards-image">
                      <p class="text-sm">Oferecendo</p>
                    </div>
                    <div class="card">
                      <p class="card-name">{{ getCardName(trade.tradeCards, 'RECEIVING') }}</p>
                      <img :src="getCardImage(trade.tradeCards, 'RECEIVING')" alt="Recebendo" class="cards-image">
                      <p class="text-sm">Recebendo</p>
                    </div>
                  </div>
                  <div class="trade-details">
                    <p class="font-bold">Usuário: {{ trade.user.name }}</p>
                    <p class="font-bold">Data: {{ new Date(trade.createdAt).toLocaleDateString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/4 p-4">
        <h2 class="text-3xl font-bold text-center mb-5">Nossas Cartas</h2>
        <div class="carousel">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentCardIndex * 100}%)` }">
            <div v-for="(card, index) in allCards" :key="index" class="carousel-slide">
              <div class="card-container">
                <div class="card-flip">
                  <div class="card-front">
                    <img :src="card.imageUrl" :alt="card.name" class="card-image" />
                  </div>
                  <div class="card-back">
                    <div class="card-content">
                      <h2 class="card-name">{{ card.name }}</h2>
                      <p class="card-description">{{ card.description }}</p>
                    </div>
                  </div>
                </div>
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
  name: 'Home',
  setup() {
    useHead({
      title: 'Home'
    });
  },
  data() {
    return {
      currentIndex: 0,
      currentCardIndex: 0,
    };
  },
  computed: {
    ...mapGetters(['tradeRequests', 'allCards']),
  },
  methods: {
    ...mapActions(['fetchAllTradeRequests', 'fetchAllCards']),
    getCardName(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card ? card.card.name : 'Nome não disponível';
    },
    getCardImage(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card ? card.card.imageUrl : require('../../public/images/back.png');
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % Math.ceil(this.tradeRequests.length / 3);
    },
    startAutoplay() {
      setInterval(this.nextSlide, 7000); // 7 segundos
    },
    nextCardSlide() {
      this.currentCardIndex = (this.currentCardIndex + 1) % Math.ceil(this.allCards.length / 3);
    },
    startCardAutoplay() {
      setInterval(this.nextCardSlide, 7000); // 7 segundos
    },
    redirectToCards() {
      this.$router.push('/cards');
    },
    redirectToAllTrades() {
      this.$router.push('/trade-requests');
    }
  },
  created() {
    this.fetchAllTradeRequests().then(() => {
      this.startAutoplay();
    });
    this.fetchAllCards().then(() => {
      this.startCardAutoplay();
    });
  },
};
</script>
