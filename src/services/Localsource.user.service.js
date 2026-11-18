
import { pendingRequest } from "../data/users.js";
import { users } from "../data/users.js";
import router from "../router/index.js";

function getUser(login, password) {
    let error_res=   {error : 1 , status : 404, data : "Login inexistant ou mot de passe incorrect" };
    for (let i=0; i<users.length; i++) {
        let utilisateur = users[i];
        if (utilisateur.login===login) {
            return utilisateur.password===password
                ?  { error : 0, status : 200 ,data : {id: utilisateur.id, login: utilisateur.login, role: utilisateur.role} }
                : error_res;

        }
    }
    return  error_res;
}



function searchUser(login) {
    for (let i=0; i<users.length; i++) {
        let utilisateur = users[i];
        if (utilisateur.login===login) {
            return  { error : 0, status : 200 ,data : "Login déja existant0" };
        }
    }
    return {error : 1 , status : 404, data : "Utilisateur inexistant" };
}

function addUser(login, password, role) {

    if (searchUser(login)) {
        return {error : 0, status: 409, data : "Un utilisateur avec ce login existe déja"}
    }

    let id = users.length;

    const user = {login, password,  role, id};
    if (role==="presta") {
        pendingRequest.value.push(user);
        router.push('/login');
    }
    else {
        users.push(user);
    }
    return { error: 0, status: 201, data: user }
}

function removeUserpending(id) {
    const index = pendingRequest.value.findIndex(u => u.id === id);
    if(index>-1){
        pendingRequest.value.splice(index, 1);
    }
}

export default {
    getUser, checkUser: searchUser, addUser, removeUserpending
}