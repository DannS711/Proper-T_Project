<script>
import { mapActions } from 'pinia';
import { RouterLink } from 'vue-router'
import { useCounterStore } from '../stores/counter';

export default {
    name: 'DashboardCard',
    props: ['listing'],
    components: { RouterLink },
    methods: {
        ...mapActions(useCounterStore, ["deleteUserListing"]),
        toEditPage(id) {
            this.$router.push(`/dashboard/edit/${id}`)
        }
    }
}
</script>

<template>
    <div class="card me-4 mb-4" style="width: 18rem;">
        <RouterLink :to="`/listings/${listing.id}`" class="link-style">
            <img :src="listing.imgUrl" class="card-img-top" alt="Listing Image">
        </RouterLink>
        <div class="card-body">
            <RouterLink :to="`/listings/${listing.id}`" class="link-style">
                <h5 class="card-title">{{ listing.title }}</h5>
            </RouterLink>
            <p class="card-text">{{ listing.address }}</p>
            <p class="card-title">LA: {{ listing.landArea }} M²</p>
            <p class="card-title">BA: {{ listing.buildingArea }} M²</p>
            <h6 class="card-title">Rp. {{ listing.price }}</h6>
            <div class="col mt-3">
                <button class="btn btn-primary me-3" @click="toEditPage(listing.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteUserListing(listing.id)">Delete</button>
            </div>
        </div>
    </div>
</template>
