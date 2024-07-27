export const actions = {
  async fetchDigimon() {
    try {
      const axios = await import('axios');
      const response = await axios.default.get('https://digimon-api.vercel.app/api/digimon');
      return response.data.slice(0, 20)
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDigimonCardById({ commit }, name) {
    try {
      const axios = await import('axios');
      const response = await axios.default.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
