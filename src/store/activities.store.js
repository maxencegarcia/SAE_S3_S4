import { defineStore } from 'pinia'
import { ref } from 'vue'
import activitiesService from "../services/activities.service.js";
import {compareStringValue} from "../utils/string.utils.js";

export const activitiesStore = defineStore('activities', () => {

    // 1. Les données : une ref par donnée, initialisée vide

    const activities = ref()
    const errors = ref();
    const providerActivities=ref([]);


    // 2. Les fonctions

    function treat(response) {
        if (response.error) {
            errors.value = { status: response.status, data: response.data }
            return false
        }
        errors.value = null
        return true
    }

    function reset() {
        activities.value=null;
        providerActivities.value=null;
        errors.value=null;
    }

    async function loadActivities() {
        let response = await activitiesService.getActivities();
        if (!treat(response)) return false;
        activities.value = response.data;
        return true;
    }

    async function loadProviderActivities() {
        let response = await activitiesService.getProviderActivities();
        if (!treat(response)) return false;
        providerActivities.value = response.data;
        return true;
    }




    async function removeActivity(id) {

        const response = await activitiesService.removeActivity(id);

        if (!treat(response)) return;

        await loadActivities();

    }




    // 3. Le return : tout ce que les composants doivent voir
    return { activities, providerActivities, loadActivities, loadProviderActivities, removeActivity,  errors}
})
