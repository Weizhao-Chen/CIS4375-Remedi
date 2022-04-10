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
import emrList from '../views/management/forms/emr/emrList.vue'
import emrEdit from '../views/management/forms/emr/emrEdit.vue'

import projectstatusList from '../views/management/projectstatusList.vue'
import contractorstatusList from '../views/management/contractorstatusList.vue'



// old stuff
// import hospitalList from '../views/management/old stuff/hospitalList.vue'
// import rentalCarCompany from '../views/management/old stuff/rentalCarCompanyList.vue'
// import airlineEdit from '../views/management/old stuff/airlineEdit.vue'
// import airlineadmin from '../views/management/old stuff/airlineadmin.vue'

import moduleEdit from '../views/management/forms/module/moduleEdit.vue'
import moduleadmin from '../views/management/forms/module/moduleadmin.vue'

import contractorEdit from '../views/management/forms/contractor/contractorEdit.vue'
import contractoradmin from '../views/management/forms/contractor/contractoradmin.vue'

import clinicareaEdit from '../views/management/forms/clinic area/clinicareaEdit.vue'
import clinicareaadmin from '../views/management/forms/clinic area/clinicareaadmin.vue'

import assignedclinicareaEdit from '../views/management/forms/assigned clinic area/assignedclinicareaEdit.vue'
import assignedclinicareaadmin from '../views/management/forms/assigned clinic area/assignedclinicareaadmin.vue'

import projectEdit from '../views/management/forms/project/projectEdit.vue'
import projectadmin from '../views/management/forms/project/projectadmin.vue'

import contractorprojectEdit from '../views/management/forms/contractor project/contractorprojectEdit.vue'
import contractorprojectadmin from '../views/management/forms/contractor project/contractorprojectadmin.vue'

import flightEdit from '../views/management/forms/flight/flightEdit.vue'
import flightadmin from '../views/management/forms/flight/flightadmin.vue'

import rentalcarEdit from '../views/management/forms/rental car/rentalcarEdit.vue'
import rentalcaradmin from '../views/management/forms/rental car/rentalcaradmin.vue'

import hospitalEdit from '../views/management/forms/hospital/hospitalEdit.vue'
import hospitaladmin from '../views/management/forms/hospital/hospitaladmin.vue'

import perferredModulesList from '../views/management/perferredModules.vue'
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
      path: '/perferred_modules',
      component: perferredModulesList,
      meta: {
        isOpen: true,
      },
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
      path: '/emr/edit',
      name: '/emr/edit',
      component: emrEdit,
      // props: true,
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
    //airline? need to be removed
    // {
    //   path: '/airline',
    //   component: airlineadmin,
    //   props: true,
    //   meta: {
    //     isOpen: true,
    //   },
    // },
    // {
    //   path: '/airline/edit',
    //   name: '/airline/edit',
    //   component: airlineEdit,
    //   props: true,
    //   meta: {
    //     isOpen: true,
    //   },
    // },
    //contractor
    {
      path: '/contractor',
      component: contractoradmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/contractor/edit/:contractorID',
      name: '/contractor/edit',
      component: contractorEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/contractor/create',
      name: '/contractor/create',
      component: contractorEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //project
    {
      path: '/project',
      component: projectadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/project/edit/:projectID',
      name: '/project/edit',
      component: projectEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/project/create',
      component: projectEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //flight
    {
      path: '/flight',
      component: flightadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/flight/edit/:flightID',
      name: '/flight/edit',
      component: flightEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/flight/create',
      component: flightEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //rental car
    {
      path: '/rentalcar',
      component: rentalcaradmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/rentalcar/edit/:rentalCarID',
      name: '/rentalcar/edit',
      component: rentalcarEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/rentalcar/create',
      component: rentalcarEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //contractor project
    {
      path: '/contractorproject',
      component: contractorprojectadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/contractorproject/edit',
      name: '/contractorproject/edit',
      component: contractorprojectEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //clinic area
    {
      path: '/clinicarea',
      component: clinicareaadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/clinicarea/edit',
      name: '/clinicarea/edit',
      component: clinicareaEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //hospital
    {
      path: '/hospital',
      component: hospitaladmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/hospital/edit',
      name: '/hospital/edit',
      component: hospitalEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //assigned clinic area
    {
      path: '/assignedclinicarea',
      component: assignedclinicareaadmin,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/assignedclinicarea/edit',
      name: '/assignedclinicarea/edit',
      component: assignedclinicareaEdit,
      props: true,
      meta: {
        isOpen: true,
      },
    },
    //module
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
    //future improvements
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
    } else if (to.matched.some((record) => record.meta.skipIfAuthorized)) {
      next({
        path: '/home',
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.isOpen)) {
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
