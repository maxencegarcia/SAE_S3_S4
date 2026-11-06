import LocalSource from "./Localsource.activities.service.js"


async function getActivitiesFromLocalSource() {
    return LocalSource.getActivities();
}
async function removeActivityFromLocalSource(id) {
    return LocalSource.removeActivity(id);
}

async function removeActivity(id) {
    return removeActivityFromLocalSource(id);
}

async function getActivities() {
    return getActivitiesFromLocalSource();
}

async function getProviderActivitiesFromLocalSource() {
    return LocalSource.getProviderActivities()
}

async function addActivityFromLocalSource(activity) {
    return LocalSource.addActivity(activity)
}

async function getProviderActivities() {
    return getProviderActivitiesFromLocalSource()
}

async function addActivity(activity) {
    return addActivityFromLocalSource(activity)
}



export default {
    removeActivity,
    getActivities,
    getProviderActivities,
    addActivity
};