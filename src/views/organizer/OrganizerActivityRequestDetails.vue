<script setup>
import {useRoute, useRouter} from "vue-router";


import ActivityRequestsService from "../../services/activity-requests.service.js";
import {ref} from 'vue'
import {onMounted} from "vue";
const router = useRouter();
const route = useRoute();

const requestId = Number(route.params.id);
let activityRequest = ref();


onMounted( async function () {
  let response = await ActivityRequestsService.getAcitivityRequest(requestId);
  console.log(response)
  if (response.status===200) {
    activityRequest.value=response.data;
}})


async function callAcceptService() {
  await ActivityRequestsService.acceptActivityRequest(requestId);
  router.push({path : '/organisateur/demandes-prestation'})
}
</script>


<template>
  <section class="page-prestations">
    <h2>Prestations en attente de validation</h2>

    <p v-if="!activityRequest" class="vide">
      Rien à valider.
    </p>
      <div v-else class="infos">
        <div class="entete">
          <h3>{{ activityRequest.activityName }}</h3>
          <span class="badge">{{ activityRequest.type }}</span>
        </div>
        <p class="description">{{ activityRequest.description }}</p>
        <ul>
          <li><strong>Prestataire :</strong> {{ activityRequest.providerName }}</li>
          <li><strong>Email :</strong> {{ activityRequest.email }}</li>
          <li><strong>Date :</strong> {{ activityRequest.date }}</li>
          <li><strong>Créneau :</strong> {{ activityRequest.timeSlot }}</li>
          <!--          <li><strong>Emplacement :</strong> {{ locationName(p.locationId) }}</li>-->
        </ul>
      </div>
      <div class="actions">
        <button class="btn btn-success " @click="callAcceptService">Accepter</button>
        <router-link  class="btn btn-danger" :to=" {path :`/organisateur/demandes-prestation/refuser/${requestId}`}">Refuser</router-link>
      </div>
  </section>
</template>

<style scoped>
.page-prestations {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  align-self: stretch;
  padding: 32px 16px;
  box-sizing: border-box;
}

h2 {
  margin: 0;
  text-align: center;
}

.vide {
  color: #888;
  font-style: italic;
}

/* Carte principale */
.infos {
  width: 100%;
  max-width: 720px;
  box-sizing: border-box;
  padding: 28px 32px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-top: 6px solid #f59e0b;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  animation: apparition 0.25s ease-out;
}

@keyframes apparition {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.entete {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f1f1;
}

.entete h3 {
  margin: 0;
  font-size: 1.5rem;
}

.badge {
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: #fef3c7;
  color: #92400e;
  border-radius: 999px;
  text-transform: capitalize;
}

.description {
  margin: 20px 0;
  padding: 14px 16px;
  color: #4b5563;
  line-height: 1.6;
  text-align: left;
  background: #fafafa;
  border-left: 3px solid #fcd34d;
  border-radius: 6px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 8px;
  font-size: 0.95rem;
  text-align: left;
  word-break: break-word;
}

li strong {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Boutons */
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 720px;
}

.btn,
.actions a {
  flex: 1;
  max-width: 220px;
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s, box-shadow 0.15s;
}

.accepter {
  background: #16a34a;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
}

.actions a {
  background: #dc2626;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}

.btn:hover,
.actions a:hover {
  filter: brightness(1.1);
}

.btn:active,
.actions a:active {
  transform: scale(0.96);
}

@media (max-width: 600px) {
  .infos { padding: 20px; }
  ul { grid-template-columns: 1fr; }
  .actions { flex-direction: column; align-items: stretch; }
  .btn, .actions a { max-width: none; }
}
</style>