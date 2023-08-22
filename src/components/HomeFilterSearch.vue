<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "HomeFilterSearch",
    props: ["types"],
    data() {
        return {
            search: '',
            filter: ''
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchShowingListings"])
    }
}
</script>

<template>
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
</template>