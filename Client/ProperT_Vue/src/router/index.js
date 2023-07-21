import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import HomePage from '../views/HomePage.vue'
import AddListingPage from '../views/AddListingPage.vue'
import EditListingPage from '../views/EditListingPage.vue'
import DetailListing from '../views/DetailListing.vue'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/listings/:id',
      name: 'editListing',
      component: DetailListing
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/dashboard/add',
      name: 'addlisting ',
      component: AddListingPage
    },
    {
      path: '/dashboard/edit/:id',
      name: 'editListing',
      component: EditListingPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('access_token') && to.name === 'login') {
    next({ name: 'home' })
  } else if (localStorage.getItem('access_token') && to.name === 'register') {
    next({ name: 'home' })
  } else if (localStorage.getItem('membership') === 'InActive' && to.name === 'dashboard') {
    Swal.fire({
      icon: 'error',
      title: 'You haven\'t buy a membership',
      text: 'Proceed to membership payment methods?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.membershipPayment()
        this.$router.push('/')
      }
    });
    next({ name: 'home' })
  } else if (localStorage.getItem('membership') === 'InActive' && to.name === 'addListing') {
    Swal.fire({
      icon: 'error',
      title: 'You haven\'t buy a membership',
      text: 'Proceed to membership payment methods?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.membershipPayment()
        this.$router.push('/')
      }
    });
    next({ name: 'home' })
  } else if (localStorage.getItem('membership') === 'InActive' && to.name === 'addListing') {
    Swal.fire({
      icon: 'error',
      title: 'You haven\'t buy a membership',
      text: 'Proceed to membership payment methods?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.membershipPayment()
        this.$router.push('/')
      }
    });
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
