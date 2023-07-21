import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import router from '../router'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000'
import axios from 'axios'
export const useCounterStore = defineStore('useCounterStore', {
  state: () => ({
    isLoggedIn: localStorage.getItem('access_token') ? true : false,
    userslistings: [],
    types: [],
    listing: [],
    isMember: false,
    showedListings: []
  }),
  actions: {
    async loginHandler(email, password) {
      // console.log('masuk login handler', email, password)
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/login`,
          data: {
            email: email,
            password: password
          }
        })
        console.log(data)
        localStorage.setItem('id', data.id)
        localStorage.setItem('email', data.email)
        localStorage.setItem('membership', data.membership)
        localStorage.setItem('access_token', data.access_token)
        if (data.membership === 'Active') {
          // console.log("masuk");
          this.isMember = true
          // console.log(this.isMember);
        }
        this.isLoggedIn = true
        this.router.push('/')

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Login success'
        })
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oh no...',
          text: 'Invalid Email/Password!'
        })
      }
    },

    async registerHandler(username, email, password, phoneNumber) {
      // console.log("masuk register handler", email, password);
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/register`,
          data: {
            username,
            email,
            password,
            phoneNumber
          }
        })
        // console.log(data.message);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Register success'
        })
        this.router.push('/login')
      } catch (err) {
        console.log(err)
        const errMsg = err.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oh no...',
          text: errMsg
        })
      }
    },

    async googleLoginHandler(credential) {
      // console.log("masuk google login handler", credential);
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/googleLogin`,
          data: {
            Google_Token: credential
          }
        })
        // console.log(data)
        localStorage.setItem('id', data.id)
        localStorage.setItem('email', data.email)
        localStorage.setItem('membership', data.membership)
        localStorage.setItem('access_token', data.access_token)
        if (data.membership === 'Active') {
          this.isMember = true
          // console.log(this.isMember);
        }
        this.isMember = false
        this.isLoggedIn = true
        this.router.push('/')

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Login success'
        })
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Email/Password!'
        })
      }
    },

    async logoutHandler() {
      const result = await Swal.fire({
        title: 'Logout Confirmation',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        localStorage.clear()
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Logout success'
        })
        this.router.push('/login')
        this.isLoggedIn = false
      }
    },

    async fetchType() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/types`
        })
        console.log(data);
        this.types = data.message
      } catch (err) {
        console.log(err)
      }
    },

    async fetchShowingListings(search, filter) {
      try {
        const queryParams = {}
        if (search) {
          queryParams.search = search
        }
        if (filter) {
          queryParams.filter = filter
        }
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/listings`,
          params: queryParams
        })
        this.showedListings = data.message
      } catch (err) {
        console.log(err);
      }
    },

    async fetchListingDetail(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/listings/${id}`
        })
        console.log(data.message);
        this.listing = data.message
      } catch (err) {
        console.log(err);
      }
    },

    async fetchUsersListings(filter, search, selectedOption) {
      // console.log(search,"search", filter, "filter", selectedOption, "selected");
      try {
        const queryParams = {}
        if (search) {
          queryParams.search = search
        }
        if (filter) {
          queryParams.filter = filter
        }
        if (selectedOption) {
          queryParams.selectedOption = selectedOption
        }
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/members/listings`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          params: queryParams
        })
        console.log(data.message);

        this.userslistings = data.message
      } catch (err) {
        console.log(err)
      }
    },

    async addnewUsersListing(
      title,
      adType,
      address,
      description,
      price,
      landArea,
      buildingArea,
      TypeId,
      imgUrl
    ) {
      // console.log(title, adType, address, description, price, landArea, buildingArea, TypeId, imgUrl);
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/members/listings`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: { title, adType, address, description, price, landArea, buildingArea, TypeId, imgUrl }
        })
        console.log(data)
        this.router.push('/dashboard')
      } catch (err) {
        console.log(err)
      }
    },

    async editUsersListings(id, title, address, description, price, landArea, buildingArea, imgUrl) {
      try {
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/members/listings/${id}`,
          data: {
            title, address, description, price, landArea, buildingArea, imgUrl
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        // console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Listing has been edited',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUserListing(id) {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrl}/members/listings/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Listing deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.fetchUsersListings()
      } catch (err) {
        console.log(err);
      }
    },

    async userMembershipChange() {
      try {
        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrl}/memberships`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.isMember = true
        localStorage.setItem("membership", 'Active')
      } catch (err) {
        console.log(err);
      }
    },

    async membershipPayment() {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/midtrans-token`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data);

        const callBack = this.userMembershipChange

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            // console.log("payment success");
            Swal.fire({
              icon: 'success',
              title: 'Payment Success',
              text: 'Payment has been successfully completed.',
            });
            callBack()
          },
          onError: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              icon: 'error',
              title: 'Payment Failed!',
              text: 'An error occurred during the payment process.',
            });
          },
          onClose: function () {
            /* You may add your own implementation here */
            Swal.fire({
              icon: 'warning',
              title: 'Payment Cancelled',
              text: 'You closed the popup without finishing the payment.',
            });
          }
        })
      } catch (err) {
        console.log(err);
        this.router.push('/')
      }
    }
  }
})
