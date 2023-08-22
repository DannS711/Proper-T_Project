<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import HomeCard from '../components/HomeCard.vue';
import Swal from 'sweetalert2'

export default {
  name: 'HomePage',
  components: { HomeCard },
  data() {
    return {
      search: '',
      filter: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ["membershipPayment", "fetchShowingListings", "fetchType"]),

    addClicked() {
      if (!localStorage.getItem("access_token")) {
        Swal.fire({
          icon: 'error',
          title: 'You haven\'t logged in yet',
          text: 'Proceed to login page?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/login')
          }
        });
      } else if (localStorage.getItem("membership") === 'InActive') {
        Swal.fire({
          icon: 'error',
          title: 'You haven\'t buy a membership',
          text: 'Proceed to membership payment methods?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.membershipPayment()
            this.$router.push('/')
          }
        });
      } else if (localStorage.getItem("membership") === 'Active') {
        this.$router.push('/dashboard/add')
      }
    }
  },
  computed: {
    ...mapState(useCounterStore, ["showedListings", "types"])
  },

  async created() {
    await this.fetchShowingListings()
    await this.fetchType()
    // console.log(this.showedListings);
  }
}
</script>

<template>
  <div
    class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom title-container">
    <button class="btn btn-outline-primary" id="add-button" @click.prevent="addClicked">Advertise Your
      Property</button>
    <h1 class="display-2 title-section">Welcome</h1>
  </div>
  <div class="d-flex justify-content-center align-items-center">
    <form class="d-flex" @submit.prevent="fetchShowingListings(search, filter)">
      <div class="row">
        <div class="col">
          <select class="form-select" aria-label="Default select example" v-model="filter">
            <option v-for="type in types" :value="type.id">{{ type.name }}</option>
          </select>
        </div>
        <div class="col">
          <input id="searchInput" class="form-control me-2" type="text" placeholder="Search Here"
            aria-label="default input example" v-model="search">
        </div>
        <div class="col">
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  </div>
  <div class="card-container mt-5">
    <HomeCard v-for="showListing in showedListings" :showListing="showListing" />
  </div>
</template>
