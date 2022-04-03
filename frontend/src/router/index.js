import vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// home
import index from '../views/home/index.vue'
import feedback from '../views/home/feedback.vue'
import about from '../views/home/about.vue'
import contact from '../views/home/contact.vue'
// error
import notFound from '../views/error/notFound.vue'
// account
import register from '../views/account/register.vue'
import login from '../views/account/login.vue'
import account from '../views/account/index.vue'

//views
// import emradmin from "../views/management/emradmin.vue"
import emrList from '../views/management/emrList.vue'
import emrEdit from '../views/management/emrEdit.vue'

import projectstatusList from '../views/management/projectstatusList.vue'
import contractorstatusList from '../views/management/contractorstatusList.vue'

import airlineEdit from '../views/management/airlineEdit.vue'
import airlineadmin from '../views/management/airlineadmin.vue'

import hospitalList from '../views/hospitals/hospitalList.vue'
import rentalCarCompany from '../views/rentalCarCompany/rentalCarCompanyList.vue'

import moduleEdit from '../views/management/moduleEdit.vue'
import moduleadmin from '../views/management/moduleadmin.vue'
vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: index,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/about',
      component: about,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/emr',
      component: emrList,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/projectstatus',
      component: projectstatusList,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/contractorstatus',
      component: contractorstatusList,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/airline',
      component: airlineadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/airline/edit',
      name: '/airline/edit',
      component: airlineEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/module',
      component: moduleadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/module/edit',
      name: '/module/edit',
      component: moduleEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/emr/edit',
      name: '/emr/edit',
      component: emrEdit,
      // props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/contact',
      component: contact,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/feedback',
      component: feedback,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/auth/register',
      component: register,
      meta: {
        skipIfAuthorized: true,
        isOpen: true,
      },
    },
    {
      path: '/auth/login',
      component: login,
      meta: {
        skipIfAuthorized: true,
        isOpen: true,
      },
    },
    {
      path: '/auth/logout',
    },
    {
      path: '/account',
      component: account,
    },
    {
      path: '/hospital',
      component: hospitalList,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/rental-car-co',
      component: rentalCarCompany,
      meta: {
        isOpen: true,
      },
    },

    {
      path: '*',
      component: notFound,
      meta: {
        isOpen: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.path === '/auth/logout') {
      store.dispatch('logout')
    } else if (to.matched.some(record => record.meta.skipIfAuthorized)) {
      next({
        path: '/home',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isOpen)) {
    next()
  } else {
    next({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})

export default router
