import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProviderView from '../views/provider/ProviderView.vue'
import Defaultlayout from '../layouts/Defaultlayout.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import AddActivity from '../views/provider/AddPrestaView.vue'
import OrganizerView from '../views/organizer/OrganizerView.vue'
import Organizerlayout from '../layouts/OrganizerLayout.vue'
import OrganizerActivitiesView from '../views/organizer/OrganizerActivitiesView.vue'
import Requestnewprestataire from "../views/organizer/Requestnewprestataire.vue";
import RegisterView from "../views/RegisterView.vue";
import ProviderLayout from "../layouts/ProviderLayout.vue";
import ActivityDetailsView from "../views/ActivityDetailsView.vue";


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
            path: '/prestations',
            component: Defaultlayout,
            children: [
                { path: '', component: ActivitiesView}
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
            path: '/register',
            component: Defaultlayout,
            children: [
                { path: '', component: RegisterView}
            ]
        },
        {
            path: '/organisateur',
            component: Organizerlayout,
            children: [
                { path: '', component: OrganizerView}
            ]
        },
        {
          path : '/organisateur/prestations',
          component: Organizerlayout,
            children : [
                {path : '', component : OrganizerActivitiesView}
            ]
        },
        {
            path : '/organisateur/demande-prestataires',
            component: Organizerlayout,
            children : [
                {path : '', component : Requestnewprestataire}
            ]
        },
        {
            path : '/prestataire/demande-prestation',
            component: ProviderLayout,
            children : [
                {path : '', component : AddActivity}
            ]
        },
        {
            path: '/prestataire',
            component: ProviderLayout,
            children: [
                { path: '', component: ProviderView}
            ]
        },
        {
            path : '/prestations/:id',
            component : Defaultlayout,
            children: [
                {path :'', name: 'prestations', component: ActivityDetailsView }
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

  if (to.path.startsWith('/prestataire') && user?.role !== 'presta') {
    return '/login'
  }
  if (to.path.startsWith('/organisateur') && user?.role !== 'orga') {
    return '/login'
  }
})

export default router