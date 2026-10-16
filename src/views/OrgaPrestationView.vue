<script setup>
import {ref} from "vue"
import {prestations} from "../data/usersDatas.js";
import Orgalayout from "../layouts/Orgalayout.vue";

let prestations_ref = ref(prestations)

</script>


<template>

  <section>
    <h2>Prestations</h2>
    <p> < Prestations : {{prestations_ref}} </p>
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




