<template>
  <header class="flex items-center justify-between p-4 bg-[#1E1E1E] fixed w-full h-20 z-50">
    <router-link to="/" class="flex items-center">
      <img src="../../public/images/logo.png" alt="Logo" class="h-12" />
    </router-link>
    <nav>
      <ul class="flex list-none m-0 p-0 relative">
        <li class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center  bg-transparent border-2 border-transparent rounded-lg py-2 px-4 transition-all duration-300 relative overflow-hidden hover:border-[#FFD700] hover:shadow-lg mr-8"
          >
            Minha Conta
            <i class="fas fa-chevron-down navbar-icon ml-2 text-[#FFD700]" />
          </button>
          <div
            v-if="isDropdownOpen"
            ref="dropdown"
            class="absolute right-0 mt-4 w-48 bg-[#1E1E1E] border border-[#FFD700] rounded-lg shadow-lg z-50"
          >
            <ul class="list-none p-2">
              <div v-if="isAuthenticated">
                <li class="mb-2">
                  <button
                    @click="navigateTo('/profile')"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-user navbar-icon mr-2 text-[#FFD700]" />
                    Perfil
                  </button>
                </li>
                <li class="mb-2">
                  <button
                    @click="navigateTo('/cards')"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-th-large mr-2 text-[#FFD700]" />
                    Cartas
                  </button>
                </li>
                <li class="mb-2">
                  <button
                    @click="navigateTo('/trade-requests')"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-exchange-alt navbar-icon mr-2 text-[#FFD700]" />
                    Trocas
                  </button>
                </li>
                <li>
                  <button
                    @click="logoutAndRedirect"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-sign-out-alt navbar-icon mr-2 text-[#FFD700]" />
                    Sair
                  </button>
                </li>
              </div>
              <div v-else>
                <li class="mb-2">
                  <button
                    @click="navigateTo('/login')"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-sign-in-alt mr-2 text-[#FFD700]" />
                    Login
                  </button>
                </li>
                <li class="mb-2">
                  <button
                    @click="navigateTo('/register')"
                    class="flex items-center  border-2 border-transparent rounded-lg px-4 py-2 transition-all duration-300 hover:border-[#FFD700] w-full text-left"
                  >
                    <i class="fas fa-user-plus mr-2 text-[#FFD700]" />
                    Register
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.isDropdownOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    logoutAndRedirect() {
      this.logout().then(() => {
        this.$router.push('/');
      });
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
