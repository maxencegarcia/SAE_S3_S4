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
// c'est pour le chgangement d'image au click
const idimcli = ref(null)

function getimage(ev) {
  if (idimcli.value != ev.idevent) {
    if (ev.image!= null) {
      return '/src/assets/' + ev.image
    }
    return image[ev.type]
  }
  else{
    return '/src/assets/' + ev.plan
  }
}

function plan(ev){
  if (idimcli.value == ev.idevent) {
    idimcli.value = null
  }
  else{ idimcli.value = ev.idevent }
}
</script>

<template>
  <ul>
    <li v-for="ev in evenements" :key="ev.idevent" style="list-style: none;">
      {{ ev.nom }} — <span :class="statut(ev)">{{ statut(ev) }}</span> <br>
      <img :src="getimage(ev)" :alt="ev.nom" style="height: 400px; width: 1000px; cursor: pointer;" @click="plan(ev)"><br>
      {{ ev.description }} <br> <br> <br> <br>
    </li>
  </ul>
</template>