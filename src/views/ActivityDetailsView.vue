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
  <div v-if="activity" class="d-flex flex-column flex-align-start">

    <img class="align-self-center img-fluid" :src="'/public/images/'+activity['image']" >
    <h1> {{activity["name"]}} </h1>
    <h3> {{activity["description"]}}</h3>
    <h3>{{activity["startDate"]}} - {{activity["endDate"]}}</h3>
    <router-link class="btn btn-info" to="/prestations">retour</router-link>
  </div>


</template>

<style scoped>



img {
  max-height: 1000px;
}
</style>
