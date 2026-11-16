<script setup>
import { pendingprestation } from "../data/usersDatas.js"
import { emplacements } from "../data/dataprestations"
import UserService from "../services/user.service.js";
import {AcceptPrestation, ProposePrestation, removePrestapending} from "../services/Localsource.prestation.service.js";
import {ref} from "vue";



const nom = ref('')
const type = ref('')
const date = ref('')
const nomprestataire = ref('')
const email = ref('')
const creneau = ref('')
const idEmplacement = ref('')
const erreur = ref('')
const description = ref('')

function nomEmplacement(id) {
  return emplacements.find(e => e.id === Number(id))?.nom ?? 'Inconnu'
}
async function accepter(idevent) {
  const res = await AcceptPrestation(idevent)
  if (res.error) alert(res.datas)
}
async function refuser(id){
  removePrestapending(id);
}
//AcceptPrestation nomprestataire, email, nom, type, date, creneau, idEmplacement, description


</script>

<template>
  <section class="page-prestations">
    <h2>Prestations en attente de validation</h2>

    <p v-if="!pendingprestation.length" class="vide">
      Rien à valider.
    </p>

    <article v-for="p in pendingprestation" :key="p.idevent" class="carte">
      <div class="infos">
        <div class="entete">
          <h3>{{ p.nom }}</h3>
          <span class="badge">{{ p.type }}</span>
        </div>
        <p class="description">{{ p.description }}</p>
        <ul>
          <li><strong>Prestataire :</strong> {{ p.nomprestataire }}</li>
          <li><strong>Email :</strong> {{ p.email }}</li>
          <li><strong>Date :</strong> {{ p.date }}</li>
          <li><strong>Créneau :</strong> {{ p.creneau }}</li>
          <li><strong>Emplacement :</strong> {{ nomEmplacement(p.idEmplacement) }}</li>
        </ul>
      </div>

      <div class="actions">
        <button class="btn accepter" @click="accepter(p.idevent)">Accepter</button>
        <button class="btn refuser" @click="refuser(p.idevent)">Refuser</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.page-prestations {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 16px;
}

h2 {
  text-align: center;
  margin-bottom: 8px;
}

.vide {
  color: #888;
  font-style: italic;
}

.carte {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  padding: 20px 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 5px solid #f59e0b;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s, box-shadow 0.15s;
}

.carte:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.entete {
  display: flex;
  align-items: center;
  gap: 12px;
}

.entete h3 {
  margin: 0;
}

.badge {
  padding: 2px 10px;
  font-size: 0.8rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 999px;
  text-transform: capitalize;
}

.description {
  margin: 8px 0;
  color: #4b5563;
  text-align: left;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 24px;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
}

.btn:hover { filter: brightness(1.1); }
.btn:active { transform: scale(0.96); }

.accepter { background: #16a34a; }
.refuser  { background: #dc2626; }

@media (max-width: 600px) {
  .carte { flex-direction: column; align-items: stretch; }
  .actions { flex-direction: row; }
  .btn { flex: 1; }
  ul { grid-template-columns: 1fr; }
}
</style>