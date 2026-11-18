<script setup>


import { useRoute, useRouter } from 'vue-router'
import {useActivitiesStore} from "../store/activities.store.js";
import {computed, onMounted} from "vue";

const activitiesStore = useActivitiesStore();

onMounted( () => {
  activitiesStore.loadActivities();
})
const route = useRoute()
const router = useRouter()

const id = route.params.id

const activity = computed(() => activitiesStore.activities.find( a => a.id === Number(id) ));



</script>


<template>
  <div v-if="activity">
    <img :src="'src/assets/'+activity['image']" >
    <h1> {{activity["name"]}} </h1>
    <h3> {{activity["description"]}}</h3>
    <h3>{{activity["startDate"]}} - {{activity["endDate"]}}</h3>
  </div>
  <router-link to="/prestations">retour</router-link>

</template>

<style scoped>

</style>