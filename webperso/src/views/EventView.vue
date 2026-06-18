<script setup>
import { ref, onMounted } from 'vue'

const evenements = ref([])

function statut(ev) {
  const aujourdHui = new Date().toISOString().slice(0, 10)
  const debut = ev.date_debut.slice(0, 10)
  const fin = ev.date_fin.slice(0, 10)
  if (aujourdHui < debut) return 'à venir'
  if (aujourdHui > fin) return 'terminé'
  return 'en cours'
}

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/event')
  evenements.value = await res.json()
})

const image = {
  'informatique': '/src/assets/informatique.jpg', 
  'film': '/src/assets/film.jpeg'
}

function getimage(ev) {
  if (ev.image!= null) {
    return '/src/assets/' + ev.image
  }
  return image[ev.type]
}
</script>

<template>
  <ul>
    <li v-for="ev in evenements" :key="ev.idevent">
      {{ ev.nom }} — <span :class="statut(ev)">{{ statut(ev) }}</span>
      <img :src="getimage(ev)" :alt="ev.nom">
    </li>
  </ul>
</template>