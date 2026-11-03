<template>
  <div class="login-card">
    <h2>Enregistrement</h2>
    <p>Veuillez vous enregistrer</p>

    <p v-if="erreur" style="color: red; font-size: 13px;">{{ erreur }}</p>

    <label>Définisser votre login
      <input type="text" v-model="login">
    </label>
    <label>Définisser votre password
      <input type="password" v-model="password">
    </label>
    <label>
      <select v-model="role">
        <option value="user" selected>utilisateur enregistrer</option>
        <option value="presta">prestataire</option>
        <option value="orga">organisateur</option>
      </select>
    </label>
    <input type="button" value="Confirmer" @click="enregistrer">
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserService from "../services/user.service.js";

const login = ref('')
const password = ref('')
const role = ref('')
const erreur = ref('')
const router = useRouter()

// pour info les nouveaux login sont supprimé quand on redemarre le serveur il faudrait regler cela pour la partie sql


async function enregistrer() {
  if(login.value === "" || password.value === "") {
    erreur.value = "les login et mot de passe sont obligatoire"
    return;
  }

  const result = UserService.checkUserFromLocalSource(login.value, password.value, role.value);
  if (result.error!==0 ) { // || result.status==200
    erreur.value= result.datas ;
    return;
  }

  //const user = result.datas;
  //localStorage.setItem('user', JSON.stringify({id: user.id, login: user.login, role: user.role}))

  /*
  if (user.role === "presta") {
    router.push('/presta')
  }
  else {
    router.push('/orga')
  }
 */

  // Pour apres login api

  // try {
  //   const res = await fetch('http://localhost:3000/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ login: login.value, password: password.value })
  //   })

  //   const data = await res.json()

  //   if (!res.ok) {
  //     erreur.value = data.message
  //     return
  //   }

  //   localStorage.setItem('user', JSON.stringify(data.user))
  //   router.push('/presta')
  // } catch (e) {
  //   erreur.value = 'Erreur de connexion au serveur'
  // }
}
</script>

<style scoped>

.tabs {
  display: flex;
  border-bottom: 2px solid #e5e5e5;
  margin-bottom: 24px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: #888;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s, border-color 0.2s;
}

.tab:hover {
  color: #333;
}

.tab-active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  font-weight: 600;
}

</style>