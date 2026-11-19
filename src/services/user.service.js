import Localsource from "./Localsource/Localsource.user.service.js";

function getUserFromLocalSource(login, password) {
    return Localsource.getUser(login, password)
}


function checkUserFromLocalSource(login, password, role, redirect = "1") {
    return Localsource.searchUser(login, password, role, redirect);
}


/*function addUserFromLocalSource(login, password, role) {
    return Localsource.addUser(login, password, role);
}

function addUser(login, password, role, id) {
    return addUserFromLocalSource(login, password, role, id);
}*/

export default {
    getUserFromLocalSource, checkUserFromLocalSource
}