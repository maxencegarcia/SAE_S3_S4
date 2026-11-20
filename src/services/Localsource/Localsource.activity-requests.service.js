import {activityRequests, rejectedActivityRequests} from "../../data/activity_requests.js";
import LocalsourceUserService from "./Localsource.user.service.js";
import LocalsourceActivitiesService from "./Localsource.activities.service.js";
import {errorResponse, okResponse} from "../../utils/response.js";



let activityRequestsList = activityRequests;
let rejectedActivityRequestsList = rejectedActivityRequests;
let CURRENT_ACTIVITY_REQUEST_ID = activityRequestsList.length;
let CURRENT_REJECTED_ACTIVITY_REQUEST_ID=rejectedActivityRequestsList.length
;
export async function offerActivity({ providerName, email, activityName, type, date, timeSlot, locationId, description }) {

    const activityRequestId = ++CURRENT_ACTIVITY_REQUEST_ID;

    activityRequestsList.push({
        activityRequestId,
        activityName,
        providerName,
        email,
        type,
        date,
        timeSlot,
        locationId: Number(locationId),
        description
    })
    return okResponse({activityRequestId})
}

export async function rejectActivity(activityRequestId) {
    const index = activityRequestsList.findIndex(u => u.activityRequestId === activityRequestId);
    if (index > -1) {
        const request = activityRequestsList[index];
        activityRequestsList.splice(index, 1);
        rejectedActivityRequestsList.push(request);
    }
}

export async function acceptActivityRequest(activityRequestId) {
    const user = LocalsourceUserService.requireRole('orga')
    if (!user) return errorResponse(403, 'Accès refusé')
    const activityRequestIndex = activityRequestsList.findIndex( r => r.activityRequestId === activityRequestId);
    if (activityRequestIndex===-1) return;
    let activityRequest = activityRequestsList[activityRequestIndex];
    if ( !activityRequest ) return  errorResponse(404, "id de demande d'activité invalide");
    let args = {name : activityRequest.activityName , type : activityRequest.type, date : activityRequest.date, timeslot : activityRequest.timeSlot, locationId : activityRequest.locationId }
    await LocalsourceActivitiesService.addActivity( args );
    activityRequestsList.splice(activityRequestIndex, 1)
    return okResponse("Demande acceptée")
}

export async function getActivityRequests() {
    return okResponse([...activityRequestsList]);
}

export async function getActivityRequest(id) {
    let data = activityRequestsList.find( r => r.activityRequestId === id);
    if (data === undefined) {
        return errorResponse(404, "Pas de demande de prestation avec cet id");
    }
    return okResponse(data);
}

export default {
    offerActivity,
    rejectActivity,
    acceptActivityRequest,
    getActivityRequests,
    getActivityRequest
}



