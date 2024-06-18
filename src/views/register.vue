<template>
  <div class="flex justify-center items-center w-full h-screen pt-16">
    <div class="flex justify-between bg-opacity-20 border border-[#FFD700] rounded-lg p-8 shadow-lg max-w-4xl w-full">
      <div class="flex flex-col justify-center p-5 border-r border-[#FFD700] w-1/2 items-center">
        <h2 class="text-center text-2xl mb-4">Registro</h2>
        <form @submit.prevent="handleRegister" class="w-full">
          <div class="mb-4 w-full">
            <label for="name" class="block mb-2 ">Nome</label>
            <input type="text" id="name" v-model="name" required class="w-full p-3 border border-[#FFD700] rounded-lg bg-transparent " />
          </div>
          <div class="mb-4 w-full">
            <label for="email" class="block mb-2 ">Email</label>
            <input type="email" id="email" v-model="email" required class="w-full p-3 border border-[#FFD700] rounded-lg bg-transparent " />
          </div>
          <div class="mb-4 w-full">
            <label for="password" class="block mb-2 ">Senha</label>
            <input type="password" id="password" v-model="password" required class="w-full p-3 border border-[#FFD700] rounded-lg bg-transparent " />
          </div>
          <p class="mb-4 ">Já tem uma conta? <router-link to="/login" class="underline ">Faça login agora!</router-link></p>
          <div class="flex justify-center">
            <button :disabled="!isFormValid || loading" type="submit" class="flex items-center justify-center  bg-[#a98736] rounded-lg px-5 py-2 text-xl transition-all duration-300 hover:bg-black" :class="{ 'border-red-500 shake': registerError }">
              <span v-if="loading" class="loader mr-2"></span>
              <span v-if="loading">Carregando...</span>
              <span v-else>Registrar</span>
            </button>
          </div>
          <p v-if="registerError" class="text-red-500 mt-2 text-center">Erro no registro. Verifique suas informações e tente novamente.</p>
        </form>
      </div>
      <div class="relative flex flex-col justify-center items-center p-5 w-1/2">
        <div class="geometric-shapes">
          <div class="shape shape1" />
          <div class="shape shape2" />
          <div class="shape shape3" />
        </div>
        <img src="../../public/images/yugi.png" alt="Cards" class="max-w-full max-h-60 rounded-lg relative z-10" />
        <p class="mt-4 text-lg ">Entre e faça parte do time</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useHead } from '@vueuse/head';

export default {
  name: "Register",
  setup() {
    useHead({
      title: 'Registro'
    });
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
      registerError: false,
    };
  },
  computed: {
    isFormValid() {
      return this.name && this.email && this.password;
    }
  },
  methods: {
    ...mapActions(["register"]),
    async handleRegister() {
      this.loading = true;
      this.registerError = false;
      try {
        await this.register({ name: this.name, email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        this.registerError = true;
        console.error(error);
      } finally {
        this.loading = false;
        if (this.registerError) {
          setTimeout(() => {
            this.registerError = false;
          }, 1000);
        }
      }
    }
  },
};
</script>
