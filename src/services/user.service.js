import Localsource from "./Localsource/Localsource.user.service.js";

function getUserFromLocalSource(login, password) {
    return Localsource.getUser(login, password)
}


function checkUserFromLocalSource(login, password, role, redirect = "1") {
    return Localsource.searchUser(login, password, role, redirect);
}

export default {
    getUserFromLocalSource, checkUserFromLocalSource
}