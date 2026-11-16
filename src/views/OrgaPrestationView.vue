<script setup>
import { prestations } from "../data/usersDatas.js"
</script>

<template>
  <section>
    <h2>Prestations</h2>
    <p v-if="!prestations.length">Aucune prestation pour le moment.</p>
    <article v-for="p in prestations" :key="p.idevent">
      <h3>{{ p.nom }} <small>({{ p.type }})</small></h3>
      <p>{{ p.description }}</p>
      <p>{{ p.date_debut }} · {{ p.creneau }}</p>
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

</style>




