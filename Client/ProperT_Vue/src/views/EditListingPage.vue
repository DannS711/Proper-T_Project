<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "EditListingPage",
    data() {
        return {
            form: {
                id: '',
                title: '',
                address: '',
                description: '',
                price: '',
                landArea: '',
                buildingArea: '',
                imgUrl: '',
            }
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchListingDetail", "editUsersListings", "fetchType"]),

    },
    computed: {
        ...mapState(useCounterStore, ["listing", "types"])
    },
    async created() {
        const id = this.$route.params.id;
        await this.fetchListingDetail(id)
        await this.fetchType()
        this.form.id = this.listing.id
        this.form.title = this.listing.title
        this.form.address = this.listing.address
        this.form.description = this.listing.description
        this.form.price = this.listing.price
        this.form.landArea = this.listing.landArea
        this.form.buildingArea = this.listing.buildingArea
        this.form.imgUrl = this.listing.imgUrl
    }
}
</script>

<template>
    <div class="form-container">
        <form class="form-listing" @submit.prevent="
            editUsersListings(
                form.id,
                form.title,
                form.address,
                form.description,
                form.price,
                form.landArea,
                form.buildingArea,
                form.imgUrl
            )
        ">
            <!-- title input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form6Example3">Title</label>
                <input type="text" id="form6Example3" class="form-control" placeholder="Title Required" required
                    v-model="form.title" />
            </div>

            <!-- Address input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form6Example5">Address</label>
                <input type="text" id="form6Example5" class="form-control" placeholder="Advertisement type Required"
                    required v-model="form.address" />
            </div>

            <!-- Price input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form6Example6">Price</label>
                <input type="text" id="form6Example6" class="form-control" placeholder="Price Required" required
                    v-model="form.price" />
            </div>

            <!-- Land & Building Area -->
            <div class="row">
                <div class="col">
                    <label class="form-label" for="form6Example6">Land Area</label>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="Land Area Required"
                            v-model="form.landArea" />
                        <span class="input-group-text" id="basic-addon2">m²</span>
                    </div>
                </div>
                <div class="col">
                    <label class="form-label" for="form6Example6">Building Area</label>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="Building Area Required"
                            v-model="form.buildingArea" />
                        <span class="input-group-text" id="basic-addon2">m²</span>
                    </div>
                </div>
            </div>

            <!-- ImageUrl input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form6Example7">Image URL</label>
                <input type="text" class="form-control" placeholder="Image Url Required" v-model="form.imgUrl" />
            </div>

            <!-- Description input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="form6Example7">Description</label>
                <textarea class="form-control" id="form6Example7" rows="4" v-model="form.description"></textarea>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
        </form>
    </div>
</template>
  
<style>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-bottom: 100px;
}

.form-listing {
    margin-top: 150px;
    /* margin-bottom: 150px; */
    width: 1000px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(167, 167, 167, 0.656);
}
</style>