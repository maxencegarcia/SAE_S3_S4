import Localsource from "./Localsource.user.service.js";
function getUserFromLocalSource(login, password) {
    return Localsource.getUser(login, password)
}


function checkUserFromLocalSource(login, password, role) {
    return Localsource.checkUser(login, password, role)
}


export default {
    getUserFromLocalSource, checkUserFromLocalSource
}