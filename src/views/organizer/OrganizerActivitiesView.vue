<script setup>

import {onMounted} from 'vue'
import { storeToRefs } from 'pinia'

import {activitiesStore} from "../../store/activities.store.js"


const activityStore = activitiesStore();
const { activities, errors } = storeToRefs(activityStore);
onMounted(() => activityStore.loadActivities())

</script>


<template>

  <section>

    <h2>Prestations</h2>
    <ul class="presta-liste">

      <li v-for="activity in activities" :key="activity.idevent" class="presta-carte">
        <div class ="content">
          <h3>{{ activity.name }}</h3>
          <p class="presta-dates">
            {{ activity.startDate }}<span v-if="activity.endDate !== activity.startDate"> → {{ activity.endDate }}</span>
          </p>
          <p>Créneau : {{ activity.timeSlot }}</p>
          <p>{{ activity.description }}</p>

        </div>
        <div class="boutons">
            <button @click="activityStore.removeActivity(activity.id)" class="bouton-rouge">supprimer</button>
        </div>
      </li>
    </ul>
  </section>


</template>

<style>
  section {
    display : flex;
    flex-direction: column;

    align-items: center;
    width: 100%;
    height: 100%;

  }

  h2, p {

    text-align: center;
  }

  .presta-liste {
    background-color : gray;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .presta-carte {
      display: flex;
      flex-direction: row;
      align-items: center;
    justify-content: center;
  }

  .bouton-rouge {
    background-color : red;
    color : white;
    border-radius: 4px;
    font-family : 'Inter', sans-serif;
    font-size: 15px;
    padding: 10px;
  }

</style>




