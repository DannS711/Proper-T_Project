<script>
import { mapActions, mapState } from 'pinia'
import SideNav from '../components/SideNav.vue'
import DashboardCard from '../components/DashboardCard.vue'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'DashboardPage',
  components: { SideNav, DashboardCard },
  methods: {
    ...mapActions(useCounterStore, ['fetchUsersListings', 'fetchType'])
  },
  computed: {
    ...mapState(useCounterStore, ['userslistings', 'types'])
  },
  async created() {
    // console.log(this.userslistings);
    await this.fetchType()
    await this.fetchUsersListings()
  }
}
</script>

<template>
  <div
    class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom title-container">
    <RouterLink to="/dashboard/add" class="btn btn-outline-primary" id="add-button">Advertise Your Property</RouterLink>
    <h1 class="display-2 title-section">Dashboard</h1>
  </div>
  <div class="dashboard-container">
    <SideNav :types="types" />
    <div class="card-container">
      <DashboardCard v-for="listing in userslistings" :listing="listing" />
    </div>
  </div>
</template>
