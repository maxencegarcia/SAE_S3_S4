import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PrestatView from '../views/PrestatView.vue'
import Defaultlayout from '../layouts/Defaultlayout.vue'
import Prestalayout from '../layouts/prestalayout.vue'
import EventView from '../views/EventView.vue'

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
  const isPresta = to.path.startsWith('/presta')
  const user = localStorage.getItem('user')

  if (isPresta && !user) {
    return '/login'
  }
})

export default router