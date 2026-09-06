<template>
  <div class="login-card">
    <h2>Connexion</h2>
    <p>Veuillez vous connecter</p>
    <div class="tabs">
      <RouterLink to="/login" class="tab ">
        Je suis prestataire
      </RouterLink>
      <RouterLink to="/loginorga" class="tab tab-active">
        Je suis organisateur
      </RouterLink>
    </div>

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
    const res = await fetch('http://localhost:3000/api/loginorga', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: login.value, password: password.value })
    })

    const data = await res.json()

    if (!res.ok) {
      erreur.value = data.message
      return
    }

    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/orga')
  } catch (e) {
    erreur.value = 'Erreur de connexion au serveur'
  }
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