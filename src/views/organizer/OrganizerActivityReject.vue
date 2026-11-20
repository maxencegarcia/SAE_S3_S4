<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ActivityRequestsService from '../../services/activity-requests.service.js'

const route = useRoute()
const router = useRouter()

const requestId = Number(route.params.id)
const message = ref('')
const error = ref('')

async function reject() {
  error.value = ''
  try {
    await ActivityRequestsService.rejectActivity(requestId)
    router.push('/organisateur/demandes-prestation')
  } catch (e) {
    error.value = 'Impossible de refuser la demande.'
  }
}

function goBack() {
  router.push(`/organisateur/demandes-prestation/details/${requestId}`)
}
</script>

<template>
  <div class="container py-4 w-100">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h2 class="mb-4">Refuser la demande</h2>

        <form class="card" @submit.prevent="reject">
          <div class="card-body">
            <div class="mb-3">
              <label for="message" class="form-label">Motif du refus</label>
              <textarea
                  id="message"
                  v-model="message"
                  class="form-control"
                  rows="5"
                  placeholder="Expliquez au prestataire pourquoi sa demande est refusée"
              ></textarea>
            </div>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-outline-secondary" @click="goBack">Retour</button>
              <button type="submit" class="btn btn-danger">Refuser</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>