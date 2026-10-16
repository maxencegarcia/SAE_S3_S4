import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PrestatView from '../views/PrestatView.vue'
import Defaultlayout from '../layouts/Defaultlayout.vue'
import Prestalayout from '../layouts/prestalayout.vue'
import EventView from '../views/EventView.vue'
import OrgaView from '../views/OrgaView.vue'
import Orgalayout from '../layouts/Orgalayout.vue'
import OrgaPrestationView from "../views/OrgaPrestationView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Defaultlayout,
            children: [
                { path: '', component: HomeView}
            ]
        },
        {
            path: '/event',
            component: Defaultlayout,
            children: [
                { path: '', component: EventView}
            ]
        },
        {
            path: '/login',
            component: Defaultlayout,
            children: [
                { path: '', component: LoginView}
            ]
        },
        {
            path: '/orga',
            component: Orgalayout,
            children: [
                { path: '', component: OrgaView}
            ]
        },
        {
          path : '/orga/prestations',
          component: Orgalayout,
            children : [
                {path : '', component : OrgaPrestationView}
            ]
        },

        {
            path: '/presta',
            component: Prestalayout,
            children: [
                { path: '', component: PrestatView}
            ]
        }

        // {
        //     path: '/login',
        //     component: LoginView
        // },
        // {
        //     path: '/presta',
        //     component: PrestatView
        // }
    ]
})

router.beforeEach((to) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.path.startsWith('/presta') && user?.role !== 'presta') {
    return '/login'
  }
  if (to.path.startsWith('/orga') && user?.role !== 'orga') {
    return '/login'
  }
})

export default router