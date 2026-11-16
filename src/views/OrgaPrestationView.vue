<script setup>
import { prestations } from "../data/usersDatas.js"
import {removePresta} from "../services/Localsource.prestation.service.js";
function deleteprestation(idevent) {
  removePresta(idevent)
}
</script>

<template>
  <section>
    <h2>Prestations</h2>
    <p v-if="!prestations.length">Aucune prestation pour le moment.</p>
    <article v-for="p in prestations" :key="p.idevent">
      <h3>{{ p.nom }} <small>({{ p.type }})</small></h3>
      <p>{{ p.description }}</p>
      <p>{{ p.date_debut }} · {{ p.creneau }}</p>
      <div class="actions">
        <button class="btn accepter" @click="deleteprestation(p.idevent)">Supprimer</button>
      </div>
    </article>
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
  .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>




