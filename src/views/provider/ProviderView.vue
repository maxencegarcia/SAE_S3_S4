<script setup>
import { ref, onMounted } from 'vue'
import {storeToRefs} from "pinia";
import { getLocations } from '../../services/Localsource.activities.service.js'
import {activitiesStore} from "../../store/activities.store.js";

const activityStore = activitiesStore();
const { providerActivities} = storeToRefs(activityStore)
const emplacements = ref([])
const error = ref('')

onMounted(async () => {
  await activityStore.loadProviderActivities();
  const resEmplacements = await getLocations()
  if (!resEmplacements.error) emplacements.value = resEmplacements.data
})

function nomEmplacement(id) {
  console.log(id, emplacements)
  const e = emplacements.value.find(e => e.id === id)
  return e ? e.name : 'inconnu'
}
</script>

<template>
  <div class="presta-page">
    <div class="presta-header">
      <h2>Page prestataire</h2>
      <router-link to="/presta/addprestation"><input type="button" value="ajouter une prestation" class="btn-primary"></router-link>

    </div>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="providerActivities.length === 0" class="presta-vide">
      Vous ne participez à aucun événement pour le moment.
    </p>

    <ul v-else class="presta-liste">
      <li v-for="activity in providerActivities" :key="activity.id" class="presta-carte">
        <h3>{{ activity.name }}</h3>
        <p class="presta-dates">
          {{ activity.startDate }}<span v-if="activity.endDate !== activity.startDate"> → {{ activity.endDate }}</span>
        </p>
        <p>Créneau : {{ activity.timeSlot }}</p>
        <p>Emplacement : {{ nomEmplacement(activity.locationId) }}</p>
        <p>{{ activity.description }}</p>
        <p>Statut : {{ activity.status }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.presta-page {
  width: 100%;
  max-width: 900px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.presta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.presta-header h2 {
  font-size: 20px;
  font-weight: 500;
  color: #2c2c2a;
}

.btn-primary {
  padding: 9px 16px;
  background: #534ab7;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #3c3489;
}

.presta-liste {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.presta-carte {
  background: #fff;
  border: 0.5px solid #d3d1c7;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.presta-carte h3 {
  font-size: 16px;
  font-weight: 500;
  color: #2c2c2a;
}

.presta-carte p {
  font-size: 14px;
  color: #5f5e5a;
}

.presta-dates {
  font-size: 13px;
  color: #888780;
}

.presta-vide {
  font-size: 14px;
  color: #888780;
}
</style>