import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    cards: [],
    tradeRequests: [],
    allTrades: [], // For storing all trades
    allCards: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setCards(state, cards) {
      state.cards = cards;
    },
    setTradeRequests(state, tradeRequests) {
      state.tradeRequests = tradeRequests;
    },
    setAllTrades(state, allTrades) {
      state.allTrades = allTrades;
    },
    setAllCards(state, allCards) {
      state.allCards = allCards.filter(card => card.imageUrl !== null); // Filtra cards sem imagem
    },
  },
  actions: {
    async register({ commit }, userData) {
      const response = await axios.post('https://cards-marketplace-api.onrender.com/register', userData);
      commit('setUser', response.data);
    },
    async login({ commit }, credentials) {
      const response = await axios.post('https://cards-marketplace-api.onrender.com/login', credentials);
      commit('setToken', response.data.token);
      commit('setUser', response.data.user);
    },
    async fetchUserCards({ commit, state }) {
      const response = await axios.get('https://cards-marketplace-api.onrender.com/me/cards', {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      commit('setCards', response.data);
    },
    async fetchMyTradeRequests({ commit, state }) {
      const response = await axios.get('https://cards-marketplace-api.onrender.com/trades', {
        params: {
          rpp: 10,
          page: 1
        }
      });
      const userTrades = response.data.list.filter(trade => trade.userId === state.user.id);
      commit('setTradeRequests', userTrades);
    },
    async fetchAllTradeRequests({ commit }) {
      const response = await axios.get('https://cards-marketplace-api.onrender.com/trades', {
        params: {
          rpp: 10,
          page: 1
        }
      });
      commit('setTradeRequests', response.data.list);
    },
    async addCardToUser({ state }, cardIds) {
      await axios.post('https://cards-marketplace-api.onrender.com/me/cards', { cardIds }, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
    },
    async createTradeRequest({ state }, tradeData) {
      try {
        const response = await axios.post('https://cards-marketplace-api.onrender.com/trades', tradeData, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        return response.data;
      } catch (error) {
        console.error('Error creating trade request:', error.response || error.message);
        throw error;
      }
    },
    async deleteTradeRequest({ state }, tradeId) {
      await axios.delete(`https://cards-marketplace-api.onrender.com/trades/${tradeId}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
    },
    async fetchAllCards({ commit }) {
      const response = await axios.get('https://cards-marketplace-api.onrender.com/cards', {
        params: {
          rpp: 100,
          page: 1
        }
      });
      commit('setAllCards', response.data.list.filter(card => card.imageUrl !== null)); // Filtra cards sem imagem
    },
    async checkAuth({ commit, state }) {
      if (state.token) {
        try {
          const response = await axios.get('https://cards-marketplace-api.onrender.com/me', {
            headers: { Authorization: `Bearer ${state.token}` },
          });
          commit('setUser', response.data);
        } catch (error) {
          commit('setToken', null);
          commit('setUser', null);
        }
      }
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    userCards: state => state.cards,
    tradeRequests: state => state.tradeRequests,
    allTrades: state => state.allTrades,
    allCards: state => state.allCards,
  },
});
