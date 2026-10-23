<script setup>
import { ref, onMounted, computed } from 'vue'
import { prestations, participe } from '../data/usersDatas.js'
// import {json} from "express";

const user = JSON.parse(localStorage.getItem('user') || 'null')
const eventdupresta = computed(() => {
  if (!user) return []
  const ids = participe
      .filter(p => p.id === Number(user.id))
      .map(p => p.idevent)
      return prestations.filter(ev => ids.includes(ev.idevent))
})


</script>
<template>
  <div class="presta-page">
    <div class="presta-header">
      <h2>Page prestataire</h2>
      <router-link to="/presta/addprestation"><input type="button" value="ajouter une prestation" class="btn-primary"></router-link>

    </div>

    <p v-if="eventdupresta.length === 0" class="presta-vide">
      Vous ne participez à aucun événement pour le moment.
    </p>

    <ul v-else class="presta-liste">
      <li v-for="ev in eventdupresta" :key="ev.idevent" class="presta-carte">
        <h3>{{ ev.nom }}</h3>
        <p class="presta-dates">
          {{ ev.date_debut }}<span v-if="ev.date_fin !== ev.date_debut"> → {{ ev.date_fin }}</span>
        </p>
        <p>{{ ev.description }}</p>
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