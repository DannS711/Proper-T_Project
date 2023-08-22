<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { RouterLink } from 'vue-router';

export default {
    name: "HomeCard",
    props: ["showListing"],
    components: { RouterLink }
}
</script>

<template>
    <div class="card me-4 mb-4" style="width: 18rem;">
        <RouterLink :to="`/listings/${showListing.id}`" class="link-style">
            <img :src="showListing.imgUrl" class="card-img-top" alt="Listing Image">
        </RouterLink>
        <div class="card-body">
            <RouterLink :to="`/listings/${showListing.id}`" class="link-style">
                <h5 class="card-title">{{ showListing.title }}</h5>
            </RouterLink>
            <p class="card-text">{{ showListing.address }}</p>
            <p class="card-title">LA: {{ showListing.landArea }} M²</p>
            <p class="card-title">BA: {{ showListing.buildingArea }} M²</p>
            <h6 class="card-title">Rp. {{ showListing.price }}</h6>
        </div>
    </div>
</template>