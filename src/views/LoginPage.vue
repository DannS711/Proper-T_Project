<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { GoogleLogin } from 'vue3-google-login'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['loginHandler', 'googleLoginHandler', 'facebookLoginhandler']),

    callback(response) {
      this.googleLoginHandler(response.credential)
      // console.log("Handle the response", response)
    }
  },
}
</script>

<template>
  <!-- Section: Design Block -->
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center text-lg-start w-75 h-75">
      <div class="card shadow-lg" style="bottom: 50px">
        <div class="row g-0 d-flex justify-content-center align-items-center">
          <div class="col-lg-8">
            <div class="card-body py-5 px-md-5">
              <form @submit.prevent="loginHandler(email, password)">
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="form2Example1" class="form-control" v-model="email" />
                  <label class="form-label" for="form2Example1">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="form2Example2" class="form-control" v-model="password" />
                  <label class="form-label" for="form2Example2">Password</label>
                </div>

                <!-- 2 column grid layout for inline styling -->
                <div class="row mb-4">
                  <div class="col">
                    <!-- Simple link -->
                    <p class="mt-4">
                      Don't have an account?
                      <router-link to="/register" class="register-link">Register</router-link>
                    </p>
                  </div>
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0 text-muted">OR LOGIN WITH</p>
                </div>

                <GoogleLogin :callback="callback" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}
</style>
