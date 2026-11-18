<script setup>
import { ref, onMounted } from 'vue'
import {useActivitiesStore} from "../store/activities.store.js";
import {storeToRefs} from "pinia";

const activityStore  = useActivitiesStore();
const {activities} = storeToRefs(activityStore);
import {useRouter } from 'vue-router'

function state(activity) {
  const today = new Date().toISOString().slice(0, 10)
  const start = activity.startDate.slice(0, 10)
  const end = activity.endDate.slice(0, 10)
  if (today < start) return 'à venir'
  if (today > end) return 'terminé'
  return 'en cours'
}


// conexion bdd peut etre ne jamais la remettre je ne sais pas trop a voir parce c'est plus pratique mais en meme temp 
// la syntaxe js est immonde
// peut etre supprimere ce message aussi

// onMounted(async () => {
//   const res = await fetch('http://localhost:3000/api/activityent')
//   activityenements.value = await res.json()
// })

const router = useRouter();

onMounted(() => {
  activities.value = activityStore.loadActivities();
})

const image = {
  'informatique': '/src/assets/informatique.jpg', 
  'test': '/src/assets/test.png'
}

// c'est pour le chgangement d'image au click
const idimcli = ref(null)

function getImage(activity) {
  if (idimcli.value !== activity.id) {
    if (activity.image!= null) {
      return '/public/images/' + activity.image
    }
    return image[activity.type]
  }
  else{
    return '/public/images/' + activity.layout
  }
}

function plan(activity){
  if (idimcli.value === activity.id) {
    idimcli.value = null
  }
  else{ idimcli.value = activity.id }
}
</script>

<template>
  <ul class="activities-container ">
    <li v-for="activity in activities" :key="activity.id" style="list-style: none;" class="d-flex flex-column flex-align-start activity-card bg-light">
      <h3>{{ activity.name }} </h3>
      <span class="text-primary" :class="state(activity)" >{{ state(activity) }}</span> <br>
      <img :src="getImage(activity)" :alt="activity.name" style="height: 400px; width: 1000px; cursor: pointer;" @click="plan(activity)"><br>
      {{ activity.description }}
        <router-link class="btn btn-info" :to="{  name: 'prestations', params: { id: activity.id } }">
        détails
      </router-link>
    </li>
  </ul>
</template>

<style scoped>


.activities-container {

}
.activity-card {
  border : 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;

}
</style>
