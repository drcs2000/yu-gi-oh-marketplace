export const actions = {
  async fetchPokemon() {
    try {
      const axios = await import('axios');
      const response = await axios.default.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      return response.data
    } catch (error) {
      console.error(error);
    }
  },
  async fetchPokemonByName({ commit }, name) {
    try {
      const axios = await import('axios');
      const response = await axios.default.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
