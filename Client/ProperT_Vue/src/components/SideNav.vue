<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'Sidebox',
  props: ['types'],
  data() {
    return {
      options: {
        filter: '',
        search: '',
        selectedOption: ''
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchUsersListings']),

    cancelInput() {
      this.options.filter = ''
      this.options.search = ''
      this.options.selectedOption = ''
    }
  }
}
</script>

<template>
  <div class="side-box">
    <form
      @submit.prevent="fetchUsersListings(options.filter, options.search, options.selectedOption)"
    >
      <div class="mb-4">
        <label class="form-label">Filter by Type</label>
        <select v-model="options.filter" class="form-control">
          <option v-for="type in types" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label">Search Listing</label>
        <input
          type="search"
          v-model="options.search"
          class="form-control"
          placeholder="Search Here..."
          autocomplete="off"
        />
      </div>
      <div class="mb-4">
        <label class="form-label">Ad Status</label>
        <div class="form-check">
          <input
            type="radio"
            id="radioExample1"
            value="delayed"
            v-model="options.selectedOption"
            class="form-check-input"
          />
          <label for="radioExample1" class="form-check-label">Delayed</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            id="radioExample2"
            value="showing"
            v-model="options.selectedOption"
            class="form-check-input"
          />
          <label for="radioExample2" class="form-check-label">Showing</label>
        </div>
      </div>
      <div class="row">
        <button class="col btn btn-dark" @click="cancelInput">Cancel</button>
        <button class="col btn btn-dark">Submit</button>
      </div>
    </form>
  </div>
</template>
