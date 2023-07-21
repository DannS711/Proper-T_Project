<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { RouterLink } from 'vue-router'

export default {
  name: 'Navbar',
  components: { RouterLink },
  methods: {
    ...mapActions(useCounterStore, ['logoutHandler'])
  },
  computed: {
    ...mapState(useCounterStore, ['isLoggedIn', 'isMember'])
  }
}
</script>

<template>
  <header>
    <RouterLink to="/" href="#" class="logo" tabindex="-1">Proper~T</RouterLink>
    <nav class="navigation">
      <RouterLink to="/" href="#" tabindex="-1">Home</RouterLink>
      <!-- <RouterLink to="/favorites" href="#" tabindex="-1">Favorite</RouterLink> -->
      <RouterLink v-if="isLoggedIn" to="/login" tabindex="-1" @click="logoutHandler">Logout</RouterLink>
      <RouterLink v-else to="/login" tabindex="-1">Login</RouterLink>
    </nav>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
        v-if="isLoggedIn">
        <img src="../assets/settings.svg" alt="" />
      </button>
      <ul class="dropdown-menu">
        <li>
          <RouterLink to="" class="dropdown-item">Profile</RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboard" class="dropdown-item">Dashboard</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
