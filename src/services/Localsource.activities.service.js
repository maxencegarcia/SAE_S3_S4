import { locations } from '../data/dataprestations'
import { activities, participations } from '../data/usersDatas'


let activitiesList = [...activities]
let participationsList = [...participations]

//Alias sans erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function okResponse(data) {
    return { error: 0, status: 200, data }
}
//Alias pour une erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function errorResponse(status, message) {
    return { error: 1, status, data: message }
}

function getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null')
}

function requireRole(role) {
    const user = getUser()
    if (!user || user.role !== role) {
        return null
    }
    return user
}

export async function getLocations() {
    return okResponse(locations)
}

export async function getActivities() {

    return okResponse([...activitiesList]);
}

export async function getProviderActivities() {
    const user = requireRole('presta')
    if (!user) return errorResponse(403, 'Accès refusé')
    const userActivities = participationsList
        .filter(l => String(l.providerId) === String(user.id))
        .map(l => {
            const p = activitiesList.find(p => p.id === l.activityId)
            return { ...p, status: l.statut }
        })

    return okResponse(userActivities)
}

export async function addActivity({ name, type, date, timeSlot,  locationId }) {
    const user = requireRole('presta')
    if (!user) return errorResponse(403, 'Accès refusé')

    const activityId = Date.now()

    activitiesList.push({
        activityId: activityId,
        name: name,
        type,
        image: null,
        layout: null,
        description: '',
        startDate: date,
        endDate: date,
        timeSlot: timeSlot,
        locationId: Number(locationId)
    })

    participationsList.push({ providerId: user.id, activityId: activityId, statut: 'en attente' })

    return okResponse({ idevent: activityId })
}

function removeActivityIdOccurencesFromParticipations(id) {
    let i=0;
    while (i<participationsList.length) {
        if (participationsList[i].activityId===id) {
            participationsList.splice(i, 1);
        }
        else {
            i++;
        }
    }
}

export async function removeActivity(id) {
    const user = requireRole("orga");
    if (!user) return [];
    for (let i=0; i<activitiesList.length; i++) {
        console.log(activitiesList[i], id)
        if (activitiesList[i].id===id) {
            activitiesList.splice(i,1);
            removeActivityIdOccurencesFromParticipations(id);
            return okResponse("Prestation supprimée");
        }
    }
    return errorResponse(404, "Prestation inexistante");
}


export default {
    getActivities,
    getProviderActivities,
    addActivity,
    removeActivity
};