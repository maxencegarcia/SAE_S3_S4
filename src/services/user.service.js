import Localsource from "./Localsource.user.service.js";
function getUserFromLocalSource(login, password) {
    return Localsource.getUser(login, password)
}


export default {
    getUserFromLocalSource
}