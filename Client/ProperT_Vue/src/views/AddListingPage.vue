<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'AddListingPage',
  data() {
    return {
      form: {
        title: 'title',
        adtype: 'Rent',
        address: 'address',
        description: 'description',
        price: '5000000',
        landArea: '650',
        buildingArea: '500',
        TypeId: '1',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S1PpVHhE5bbDoUsdWHhXloOf3-63EULaKA&usqp=CAU'
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchType', 'addnewUsersListing'])
  },
  computed: {
    ...mapState(useCounterStore, ['types'])
  },
  async created() {
    this.fetchType()
  }
}
</script>

<template>
  <div class="form-container">
    <form class="form-listing" @submit.prevent="
      addnewUsersListing(
        form.title,
        form.adtype,
        form.address,
        form.description,
        form.price,
        form.landArea,
        form.buildingArea,
        form.TypeId,
        form.imgUrl
      )
    ">
      <!-- title input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form6Example3">Title</label>
        <input type="text" id="form6Example3" class="form-control" placeholder="Title Required" required
          v-model="form.title" />
      </div>
      
      <!-- Ad Type input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form6Example4">Ad Type</label>
        <select class="form-select" aria-label="Default select example" v-model="form.adtype">
          <option value="Sale">Sale</option>
          <option value="Rent">Rent</option>
        </select>
      </div>

      <!-- Address input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form6Example5">Address</label>
        <input type="text" id="form6Example5" class="form-control" placeholder="Advertisement type Required" required
          v-model="form.address" />
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
            <input type="number" class="form-control" placeholder="Land Area Required" v-model="form.landArea" />
            <span class="input-group-text" id="basic-addon2">m²</span>
          </div>
        </div>
        <div class="col">
          <label class="form-label" for="form6Example6">Building Area</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Building Area Required" v-model="form.buildingArea" />
            <span class="input-group-text" id="basic-addon2">m²</span>
          </div>
        </div>
      </div>

      <!-- Type input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form6Example7">Type</label>
        <select class="form-select" aria-label="Default select example" v-model="form.TypeId">
          <option selected disabled>---SELECT TYPE---</option>
          <option v-for="type in types" :value="type.id">{{ type.name }}</option>
        </select>
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
