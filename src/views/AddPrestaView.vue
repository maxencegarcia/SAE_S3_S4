<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getEmplacements, ajouterPrestation } from '../services/Localsource.prestation.service.js'

const router = useRouter()

const types = ['test', 'concour', 'présentation']
const creneaux = ['10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00']
const emplacements = ref([])

const nom = ref('')
const type = ref('')
const date = ref('')
const creneau = ref('')
const idEmplacement = ref('')
const erreur = ref('')

onMounted(async () => {
  const res = await getEmplacements()
  if (res.error) { erreur.value = res.datas; return }
  emplacements.value = res.datas
})

async function valider() {
  erreur.value = ''
  if (!nom.value || !type.value || !date.value || !creneau.value || !idEmplacement.value) {
    erreur.value = 'Merci de remplir tous les champs'
    return
  }

  const res = await ajouterPrestation({
    nom: nom.value,
    type: type.value,
    date: date.value,
    creneau: creneau.value,
    idEmplacement: idEmplacement.value
  })
  if (res.error) { erreur.value = res.datas; return }

  router.push('/presta')
}
</script>

<template>
  <div class="add-page">
    <h2>Ajouter une prestation</h2>
    <p v-if="erreur" style="color: red">{{ erreur }}</p>

    <form @submit.prevent="valider">
      <label>Nom
        <input type="text" v-model="nom">
      </label>

      <label>Type
        <select v-model="type">
          <option disabled value="">-- choisir --</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>

      <label>Date
        <input type="date" v-model="date">
      </label>

      <label>Créneau
        <select v-model="creneau">
          <option disabled value="">-- choisir --</option>
          <option v-for="c in creneaux" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>

      <label>Emplacement
        <select v-model="idEmplacement">
          <option disabled value="">-- choisir --</option>
          <option v-for="e in emplacements" :key="e.id" :value="e.id">{{ e.nom }}</option>
        </select>
      </label>

      <button type="submit">Valider</button>
      <router-link to="/presta">Annuler</router-link>
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