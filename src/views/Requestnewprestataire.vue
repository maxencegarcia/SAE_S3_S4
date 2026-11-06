
<template>

  <section>
    <h2>Prestations</h2>
    <li v-for="p in prestataire" :key="p.id" class="carte">
      <span class="login">{{ p.login }}</span>
      <button @click="accepter(p.login, p.password, p.role, p.id)"> accepter </button>
      <button @click="refuser(p.id)"> refuser </button>
      <!-- <span class="badge">{{ p.role }}</span> --->
    </li>
  </section>


</template>



<script setup>

import {computed, ref} from "vue"
import {pendingrequest} from "../data/usersDatas.js";
import Orgalayout from "../layouts/Orgalayout.vue";
import UserService from "../services/user.service.js";

const prestataire = computed(() => pendingrequest.value.filter(u => u.role==="presta"))

async function accepter(login, password, role, id){
  UserService.checkUserFromLocalSource(login, password, role, "0");
  UserService.RemoveUserPendingRequestFromLocalSource(id);
}
async function refuser(id){
  UserService.RemoveUserPendingRequestFromLocalSource(id);

}

</script>

<style scoped>
.liste-presta {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.liste-presta h2 {
  font-size: 20px;
  font-weight: 500;
  color: #2c2c2a;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.carte {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 0.5px solid #d3d1c7;
  border-radius: 12px;
  padding: 1rem 1.5rem;
}

.login {
  font-size: 15px;
  font-weight: 500;
  color: #2c2c2a;
}


.vide {
  font-size: 14px;
  color: #888780;
}
</style>




