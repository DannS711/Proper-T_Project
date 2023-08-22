<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { GoogleLogin } from 'vue3-google-login'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['registerHandler', 'googleLoginHandler']),

    callback(response) {
      this.googleLoginHandler(response.credential)
      // console.log("Handle the response", response)
    }
  }
}
</script>

<template>
  <!-- Section: Design Block -->
  <section class="text-center text-lg-start">
    <!-- Jumbotron -->
    <div class="container py-4">
      <div class="row g-0 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div
            class="card cascading-right"
            style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)"
          >
            <div class="card-body p-5 shadow-5 text-center">
              <h2 class="fw-bold mb-5">Sign up now</h2>
              <form @submit.prevent="registerHandler(username, email, password, phoneNumber)">
                <!-- Username input -->
                <div class="form-outline mb-4">
                  <input type="text" class="form-control" v-model="username" />
                  <label class="form-label" for="form3Example3">Your Name</label>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" class="form-control" v-model="email" />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" class="form-control" v-model="password" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <!-- Phone Number input -->
                <div class="form-outline mb-4">
                  <input type="text" class="form-control" v-model="phoneNumber" />
                  <label class="form-label" for="form3Example4">Phone Number</label>
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4">Sign up</button>

                <div class="row">
                  <div class="col">
                    <!-- Simple link -->
                    <p>
                      Already have an account?
                      <router-link to="/login" class="login-link">Login</router-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
  </section>
  <!-- Section: Design Block -->
</template>

<style>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
