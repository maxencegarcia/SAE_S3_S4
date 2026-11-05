<script setup>

import {onMounted} from 'vue'
import { storeToRefs } from 'pinia'

import {prestationsStore} from "../store/prestations.store.js"


const prestStore = prestationsStore();
const { prestations, erreur } = storeToRefs(prestStore);
onMounted(() => prestStore.charger())

</script>


<template>

  <section>

    <h2>Prestations</h2>
    <ul class="presta-liste">

      <li v-for="ev in prestations" :key="ev.idevent" class="presta-carte">
        <div class ="content">
          <h3>{{ ev.nom }}</h3>
          <p class="presta-dates">
            {{ ev.date_debut }}<span v-if="ev.date_fin !== ev.date_debut"> → {{ ev.date_fin }}</span>
          </p>
          <p>Créneau : {{ ev.creneau }}</p>
          <p>{{ ev.description }}</p>

        </div>
        <div class="boutons">
            <button @click="prestStore.supprimerPrestation(ev.idevent)" class="bouton-rouge">supprimer</button>
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




