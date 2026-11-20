
import * as LocalSource from "./Localsource/Localsource.activity-requests.service.js";


async function offerActivityFromLocalSource(request) {
    return LocalSource.offerActivity(request)
}

async function offerActivity(request) {
    let response = null
    try {
        response = await offerActivityFromLocalSource(request)
    } catch (err) {
        response = { error: 1, status: 500, data: "Erreur lors de l'envoi de la demande" }
    }
    return response
}

async function rejectActivityFromLocalSource(activityRequestId) {
    return LocalSource.rejectActivity(activityRequestId)
}

async function rejectActivity(activityRequestId) {
    let response = null
    try {
        response = await rejectActivityFromLocalSource(activityRequestId)
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur lors du refus de la demande' }
    }
    return response
}



async function acceptActivityRequestFromLocalSource(activityRequestId) {
    return LocalSource.acceptActivityRequest(activityRequestId)
}

async function acceptActivityRequest(activityRequestId) {
    let response = null
    try {
        response = await acceptActivityRequestFromLocalSource(activityRequestId)
    } catch (err) {
        response = { error: 1, status: 500, data: "Erreur lors de l'acceptation de la demande" }
    }
    return response
}

async function getActivityRequestsFromLocalSource() {
    let response = null
    try {
        response = await LocalSource.getActivityRequests();
    } catch (err) {
        response = { error: 1, status: 500, data: "Erreur lors de demande d'activité" }
    }
    return response
}

async function getActivityRequests() {
    let response = null
    try {
        response = await getActivityRequestsFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 500, data: "Erreur lors de la demande d'activité" }
    }
    return response
}

async function getActivityRequestFromLocalSource(id) {
    let response = null
    try {
        response = await LocalSource.getActivityRequest(id);
    } catch (err) {
        response = { error: 1, status: 500, data: "Erreur lors de demande d'activité" }
    }
    return response
}


async function getAcitivityRequest(id) {
    return await getActivityRequestFromLocalSource(id);
}

export default {
    offerActivity,
    rejectActivity,
    acceptActivityRequest,
    getActivityRequests,
    getAcitivityRequest
}