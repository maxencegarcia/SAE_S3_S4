import Localsource from "./Localsource.user.service.js";
function getUserFromLocalSource(login, password) {
    return Localsource.getUser(login, password)
}


function checkUserFromLocalSource(login, password, role, redirect = "1") {
    return Localsource.checkUser(login, password, role, redirect);
}

function RemoveUserPendingRequestFromLocalSource(id){
    return Localsource.removeUserpending(id);
}

export default {
    getUserFromLocalSource, checkUserFromLocalSource, RemoveUserPendingRequestFromLocalSource
}