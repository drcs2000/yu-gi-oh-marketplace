<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-2xl mb-4">Página não encontrada</p>
    <router-link to="/" class="text-lg text-[#FFD700] underline">Voltar para a página inicial</router-link>
  </div>
</template>

<script>
import { useHead } from '@vueuse/head';

export default {
  name: 'NotFound',
  setup() {
    useHead({
      title: '404 - Página Não Encontrada'
    });
  },
};
</script>
