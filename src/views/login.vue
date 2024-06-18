<template>
  <div class="flex justify-center items-center w-full h-screen pt-16">
    <div class="flex justify-between bg-opacity-20 border border-[#FFD700] rounded-lg p-8 shadow-lg max-w-4xl w-full">
      <div class="flex flex-col justify-center p-5 border-r border-[#FFD700] w-1/2 items-center">
        <h2 class="text-center text-2xl mb-4">Login</h2>
        <form @submit.prevent="handleLogin" class="w-full">
          <div class="mb-4 w-full">
            <label for="email" class="block mb-2 ">Email</label>
            <input type="email" id="email" v-model="email" required class="w-full p-3 border border-[#FFD700] rounded-lg bg-transparent " />
          </div>
          <div class="mb-4 w-full">
            <label for="password" class="block mb-2 ">Senha</label>
            <input type="password" id="password" v-model="password" required class="w-full p-3 border border-[#FFD700] rounded-lg bg-transparent " />
          </div>
          <p class="mb-4 ">Não tem conta? <router-link to="/register" class="underline ">Registre-se agora!</router-link></p>
          <div class="flex justify-center">
            <button :disabled="!isFormValid || isLoading" type="submit" class="flex items-center justify-center  bg-[#857100] rounded-lg px-5 py-2 text-xl transition-all duration-300 hover:bg-black" :class="{ 'border-red-500 shake': loginError }">
              <span v-if="isLoading" class="loader mr-2"></span>
              <span v-if="isLoading">Carregando...</span>
              <span v-else>Entrar</span>
            </button>
          </div>
        </form>
      </div>
      <div class="relative flex flex-col justify-center items-center p-5 w-1/2">
        <div class="geometric-shapes">
          <div class="shape shape1" />
          <div class="shape shape2" />
          <div class="shape shape3" />
        </div>
        <img src="../../public/images/seto.png" alt="Cards" class="max-w-full max-h-60 rounded-lg relative z-10" />
        <p class="mt-4 text-lg ">Entre e faça parte do time</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useHead } from '@vueuse/head';

export default {
  name: "Login",
  setup() {
    useHead({
      title: 'Login'
    });
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      loginError: false
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password;
    }
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      this.isLoading = true;
      this.loginError = false;
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/profile');
      } catch (error) {
        this.loginError = true;
        console.error(error);
      } finally {
        this.isLoading = false;
        if (this.loginError) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.loginError = false;
            }, 500);
          });
        }
      }
    }
  },
};
</script>
