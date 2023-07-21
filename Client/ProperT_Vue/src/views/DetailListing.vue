<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "DetailListing",
    methods: {
        ...mapActions(useCounterStore, ["fetchListingDetail"])
    },
    computed: {
        ...mapState(useCounterStore, ["listing"])
    },
    async created() {
        const id = this.$route.params.id;
        await this.fetchListingDetail(id)
    }
}
</script>

<template>

</template>