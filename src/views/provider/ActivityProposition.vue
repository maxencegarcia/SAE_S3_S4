<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getLocations} from "../../services/Localsource/Localsource.activities.service.js";


const router = useRouter()

import {useActivitiesStore} from "../../store/activities.store.js";
import ActivityRequestsService from "../../services/activity-requests.service.js";

const activityStore = useActivitiesStore();


const types = ['test', 'concour', 'présentation']
const creneaux = ['10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00']
const emplacements = ref([])

const nom = ref('')
const type = ref('')
const date = ref('')
const nomprestataire = ref('')
const email = ref('')
const creneau = ref('')
const idEmplacement = ref('')
const erreur = ref('')
const description = ref('')

onMounted(async () => {
  const res = await getLocations()
  if (res.error) { erreur.value = res.data; return }
  emplacements.value = res.data
})

async function valider() {
  erreur.value = ''
  if (!nom.value || !type.value || !date.value || !creneau.value || !idEmplacement.value || !description.value) {
    erreur.value = 'Merci de remplir tous les champs'
    return
  }

  const res = await ActivityRequestsService.offerActivity({
    providerName: nomprestataire.value,
    email: email.value,
    activityName: nom.value,
    type: type.value,
    date: date.value,
    timeSlot: creneau.value,
    locationId: idEmplacement.value,
    description: description.value
  })
  console.log(activityStore.providerActivities);


  router.push('/')
}

async function resize(fichier){
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width * 0.3
    canvas.height = img.height * 0.3
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}
async function chooseimage(e) {

}
</script>

<template>
  <div class="add-page">
    <h2>Ajouter une prestation</h2>
    <p v-if="erreur" style="color: red">{{ erreur }}</p>

    <form @submit.prevent="valider">
      <label>Votre Nom
        <input class="form-control" type="text" v-model="nomprestataire">
      </label>
      <label>Votre Email
        <input class="form-control"  type="text" v-model="email">
      </label>
      <label>Nom de la prestation
        <input class="form-control" type="text" v-model="nom">
      </label>
      <label>Description
        <input class="form-control" type="text" v-model="description">
      </label>

      <label>Type
        <select class="form-control" v-model="type">
          <option disabled value="">-- choisir --</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>

      <label>Date
        <input  class="form-control" type="date" v-model="date">
      </label>

      <label>Créneau
        <select class="form-control" v-model="creneau">
          <option disabled value="">-- choisir --</option>
          <option v-for="c in creneaux" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>

      <label>Emplacement
        <select class="form-control" v-model="idEmplacement">
          <option disabled value="">-- choisir --</option>
          <option v-for="e in emplacements" :key="e.id" :value="e.id">{{ e.name }}</option>
        </select>
      </label>
      <label> L'image pour votre prestation (optionnel)
      <input class="form-control" type="file" id="filephoto" accept="image/*"/>
      </label>
      <button class="btn btn-success align-self-start" type="submit">Valider</button>
      <router-link class="btn btn-danger align-self-start " to="/">Annuler</router-link>
    </form>
  </div>
</template>

<style scoped>
.add-page {
  width: 100%;
  max-width: 500px;
  align-self: flex-start;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>