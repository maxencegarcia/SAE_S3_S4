<template>
  <div class="login-card">
    <h2>Connexion</h2>
    <p>Veuillez vous connecter</p>

    <p v-if="erreur" style="color: red; font-size: 13px;">{{ erreur }}</p>

    <label>Login
      <input type="text" v-model="login">
    </label>
    <label>Password
      <input type="password" v-model="password">
    </label>
    <input type="button" value="Confirmer" @click="seConnecter">
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const login = ref('')
const password = ref('')
const erreur = ref('')
const router = useRouter()

async function seConnecter() {
  erreur.value = ''
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: login.value, password: password.value })
    })

    const data = await res.json()

    if (!res.ok) {
      erreur.value = data.message
      return
    }

    router.push('/presta')
  } catch (e) {
    erreur.value = 'Erreur de connexion au serveur'
  }
}
</script>