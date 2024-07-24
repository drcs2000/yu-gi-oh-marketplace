export const state = () => ({
  isAuthenticated: false,
  user: null,
});

export const mutations = {
  SET_AUTH(state, payload) {
    state.isAuthenticated = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
};

export const actions = {
  login({ commit }, user) {
    // Perform login logic
    commit('SET_AUTH', true);
    commit('SET_USER', user);
  },
  logout({ commit }) {
    // Perform logout logic
    commit('SET_AUTH', false);
    commit('SET_USER', null);
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getUser(state) {
    return state.user;
  },
};
