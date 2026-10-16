<script setup>

import {ref} from "vue"
let user = ref(localStorage.getItem("user"))


</script>

<script setup>
</script>
<template>
  <section>
    <h2>Organisateur</h2>
    <p>Bienvenue {{JSON.parse(user).login}}, vous êtes connecté en tant qu'organisateur</p>


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



</style>

