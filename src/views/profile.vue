<template>
  <div class="dashboard-container flex">
    <div class="w-1/4 p-4 flex flex-col">
      <div class="shadow-md rounded-lg p-6 border border-[#FFD700] mb-4 bg-[#2f2524]">
        <h2 class="text-2xl font-bold mb-4">Informações do Perfil</h2>
        <div v-if="user">
          <p class="font-bold">Nome:</p><span>{{ user.name }}</span>
          <p class="font-bold">Email:</p><span>{{ user.email }}</span>
          <p class="font-bold">Número de Cartas:</p><span>{{ user.cards ? user.cards.length : 0 }}</span>
        </div>
        <div v-else>
          <p>Carregando informações do usuário...</p>
        </div>
      </div>
      <div class="shadow-md rounded-lg p-6 border border-[#FFD700] bg-[#2f2524]">
        <h2 class="text-2xl font-bold mb-4">Menu</h2>
        <button v-for="(menuItem, index) in menuItems" :key="index" @click="selectedMenu = menuItem"
          :class="['w-full text-left p-2 rounded mb-2 flex items-center transition-all duration-300 relative overflow-hidden border-2', { 'hover:border-[#FFD700] hover:shadow-lg border-transparent': selectedMenu !== menuItem, 'border-[#FFD700] bg-transparent ': selectedMenu === menuItem }]">
          <i v-if="menuIcons[menuItem]" :class="['navbar-icon mr-2 text-[#FFD700]', menuIcons[menuItem]]" />
          {{ menuItem }}
        </button>
      </div>
    </div>
    <div class="w-3/4 p-4">
      <div class="shadow-md rounded-lg p-6 border border-[#FFD700] bg-[#2f2524]">
        <h2 class="text-2xl font-bold mb-4">{{ selectedMenu }}</h2>
        <div v-if="selectedMenu === 'Minhas Cartas' && user">
          <div v-if="user.cards.length === 0" class="text-center">
            <p>Sem cartas no seu inventário no momento.</p>
          </div>
          <div v-else class="flex items-center justify-center relative">
            <button @click="prevCard" class="text-[#FFD700] px-2 py-1 rounded mr-4">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel">
              <div class="carousel-track" :style="cardSlideStyle">
                <div v-for="(card, index) in user.cards" :key="index" class="carousel-slide" style="width: 100%;">
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
            <button @click="nextCard" class="text-[#FFD700] px-2 py-1 rounded ml-4">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="flex justify-center mt-4">
            <button @click="redirectToCards"
              class="flex items-center justify-center  bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700]">
              Ver Todas as Cartas
            </button>
            <button @click="showAddCardModal = true"
              class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] ml-2">
              Adicionar Carta
            </button>
          </div>
        </div>
        <div v-if="selectedMenu === 'Minhas Trocas' && user">
          <div v-if="tradeRequests.length === 0" class="text-center">
            <p>Sem trocas em seu nome no momento.</p>
          </div>
          <div v-else class="flex items-center justify-center relative">
            <button @click="prevTrade" class="text-[#FFD700] px-2 py-1 rounded mr-4">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel">
              <div class="carousel-track" :style="tradeSlideStyle">
                <div v-for="(trade, index) in tradeRequests" :key="index" class="carousel-slide" style="width: 100%;">
                  <div class="trade-item mb-4">
                    <div class="trade-info flex justify-between items-center">
                      <div class="trade-cards flex">
                        <div class="card mr-4">
                          <p class="card-name">{{ getCardName(trade.tradeCards, 'OFFERING') }}</p>
                          <img :src="getCardImage(trade.tradeCards, 'OFFERING')" alt="Oferta" class="cards-image">
                          <p class="font-bold">Oferecendo</p>
                        </div>
                        <div class="card">
                          <p class="card-name">{{ getCardName(trade.tradeCards, 'RECEIVING') }}</p>
                          <img :src="getCardImage(trade.tradeCards, 'RECEIVING')" alt="Recebendo" class="cards-image">
                          <p class="font-bold">Recebendo</p>
                        </div>
                      </div>
                      <div class="trade-details">
                        <p class="font-bold">Data: {{ new Date(trade.createdAt).toLocaleDateString() }}</p>
                        <button @click="deleteTrade(trade.id)" class="text-red-500 ml-4">Deletar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button @click="nextTrade" class="text-[#FFD700] px-2 py-1 rounded ml-4">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="flex justify-center mt-4">
            <button @click="showTradeModal = true"
              class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700]">
              Criar Nova Troca
            </button>
            <button @click="redirectToAllTrades"
              class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] ml-2">
              Ver Todas as Trocas
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showTradeModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-[#2f2524] p-6 rounded-lg shadow-lg w-96 border border-[#FFD700]">
        <h2 class="text-xl font-bold mb-4">Criar Nova Troca</h2>
        <form @submit.prevent="handleCreateTrade">
          <div class="mb-4">
            <label for="offering" class="block mb-2">Carta Oferecida</label>
            <select v-model="newTrade.offering" class="w-full p-2 border border-gray-300 rounded bg-[#2f2524]">
              <option v-for="card in filteredOfferingCards" :key="card.id" :value="card">
                {{ card.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="receiving" class="block mb-2">Carta Desejada</label>
            <select v-model="newTrade.receiving" class="w-full p-2 border border-gray-300 rounded bg-[#2f2524]">
              <option v-for="card in filteredReceivingCards" :key="card.id" :value="card">
                {{ card.name }}
              </option>
            </select>
          </div>
          <div class="flex justify-between">
            <button type="button" @click="cancelCreateTrade"
              class="flex items-center justify-center bg-red-500 rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] mr-2">
              Cancelar
            </button>
            <button type="submit" :disabled="!newTrade.offering || !newTrade.receiving || isLoading"
              class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>Criar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showAddCardModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-[#2f2524] p-6 rounded-lg shadow-lg w-96 border border-[#FFD700]">
        <h2 class="text-xl font-bold mb-4">Adicionar Carta</h2>
        <form @submit.prevent="handleAddCards">
          <div v-for="(card, index) in selectedCards" :key="index" class="mb-4 flex items-center">
            <select v-model="selectedCards[index]" class="w-full p-2 border border-gray-300 rounded bg-[#2f2524]">
              <option v-for="card in allCards" :key="card.id" :value="card">
                {{ card.name }}
              </option>
            </select>
            <button v-if="index !== 0" @click="removeCardField(index)" type="button" class="text-red-500 ml-2">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button type="button" @click="addNewCardField" :disabled="selectedCards.length >= 3"
            class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed">
            Adicionar Carta
          </button>
          <div class="flex justify-between mt-4">
            <button type="button" @click="cancelAddCards"
              class="flex items-center justify-center bg-red-500 rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] mr-2">
              Cancelar
            </button>
            <button type="submit" :disabled="!areAllCardsSelected || isLoading"
              class="flex items-center justify-center bg-[#a98736] rounded-lg px-3 py-1 text-sm transition-all duration-300 hover:bg-black hover:border-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>Salvar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useHead } from '@vueuse/head';

export default {
  name: 'Profile',
  setup() {
    useHead({
      title: 'Perfil'
    });
  },
  data() {
    return {
      showTradeModal: false,
      showAddCardModal: false,
      newTrade: {
        offering: null,
        receiving: null,
      },
      selectedCards: [null],
      isLoading: false,
      offeringSearch: '',
      receivingSearch: '',
      filteredOfferingCards: [],
      filteredReceivingCards: [],
      currentCardIndex: 0,
      currentTradeIndex: 0,
      menuItems: ['Minhas Cartas', 'Minhas Trocas'],
      selectedMenu: 'Minhas Cartas',
      menuIcons: {
        'Minhas Cartas': 'fas fa-th-large',
        'Minhas Trocas': 'fas fa-exchange-alt',
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'tradeRequests', 'allCards', 'userCards']),
    areAllCardsSelected() {
      return this.selectedCards.every(card => card !== null);
    },
    cardSlideStyle() {
      return { transform: `translateX(-${this.currentCardIndex * 100}%)` };
    },
    tradeSlideStyle() {
      return { transform: `translateX(-${this.currentTradeIndex * 100}%)` };
    },
    filteredCards() {
      return this.allCards.filter(card => !this.userCards.some(userCard => userCard.id === card.id));
    },
  },
  methods: {
    ...mapActions(['fetchUserCards', 'fetchMyTradeRequests', 'fetchAllCards', 'createTradeRequest', 'addCardToUser', 'deleteTradeRequest', 'checkAuth']),
    async handleCreateTrade() {
      if (this.newTrade.offering && this.newTrade.receiving) {
        const tradeData = {
          cards: [
            { cardId: this.newTrade.offering.id, type: 'OFFERING' },
            { cardId: this.newTrade.receiving.id, type: 'RECEIVING' }
          ]
        };
        this.isLoading = true;
        try {
          await this.createTradeRequest(tradeData);
          this.showTradeModal = false;
          this.newTrade.offering = null;
          this.newTrade.receiving = null;
          window.location.reload();
        } catch (error) {
          console.error('Failed to create trade request:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async handleAddCards() {
      const cardIds = this.selectedCards.filter(card => card).map(card => card.id);
      if (cardIds.length > 0) {
        this.isLoading = true;
        try {
          await this.addCardToUser(cardIds);
          this.showAddCardModal = false;
          this.selectedCards = [null];
          window.location.reload();
        } catch (error) {
          console.error('Failed to add cards:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    cancelAddCards() {
      this.showAddCardModal = false;
      this.selectedCards = [null];
    },
    cancelCreateTrade() {
      this.showTradeModal = false;
      this.newTrade.offering = null;
      this.newTrade.receiving = null;
    },
    addNewCardField() {
      if (this.selectedCards.length < 3) {
        this.selectedCards.push(null);
      }
    },
    removeCardField(index) {
      this.selectedCards.splice(index, 1);
    },
    filterOffering() {
      if (this.user && this.user.cards) {
        this.filteredOfferingCards = this.user.cards.filter(card =>
          card.name.toLowerCase().includes(this.offeringSearch.toLowerCase())
        );
      }
    },
    filterReceiving() {
      if (this.allCards) {
        this.filteredReceivingCards = this.filteredCards.filter(card =>
          card.name.toLowerCase().includes(this.receivingSearch.toLowerCase())
        );
      }
    },
    prevCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex -= 1;
      } else {
        this.currentCardIndex = this.user.cards.length - 1;
      }
    },
    nextCard() {
      if (this.user && this.currentCardIndex < this.user.cards.length - 1) {
        this.currentCardIndex += 1;
      } else {
        this.currentCardIndex = 0;
      }
    },
    prevTrade() {
      if (this.currentTradeIndex > 0) {
        this.currentTradeIndex -= 1;
      } else {
        this.currentTradeIndex = this.tradeRequests.length - 1;
      }
    },
    nextTrade() {
      if (this.tradeRequests && this.currentTradeIndex < this.tradeRequests.length - 1) {
        this.currentTradeIndex += 1;
      } else {
        this.currentTradeIndex = 0;
      }
    },
    getCardName(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card ? card.card.name : 'Nome não disponível';
    },
    getCardImage(tradeCards, type) {
      const card = tradeCards.find(card => card.type === type);
      return card ? card.card.imageUrl : require('../../public/images/back.png');
    },
    deleteTrade(tradeId) {
      this.deleteTradeRequest(tradeId)
        .then(() => {
          this.fetchMyTradeRequests();
        })
        .catch((error) => {
          console.error('Failed to delete trade request:', error);
        });
    },
    redirectToCards() {
      this.$router.push('/cards');
    },
    redirectToAllTrades() {
      this.$router.push('/trade-requests');
    }
  },
  watch: {
    user: {
      handler(newValue) {
        if (newValue && newValue.cards) {
          this.filteredOfferingCards = newValue.cards;
        }
      },
      immediate: true,
    },
    allCards: {
      handler(newValue) {
        if (newValue) {
          this.filteredReceivingCards = this.filteredCards;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.checkAuth().then(() => {
      this.fetchUserCards();
      this.fetchMyTradeRequests();
      this.fetchAllCards();
    });
  },
};
</script>
