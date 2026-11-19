

import { users } from "../../data/users.js";


const usersList = [...users];


let CURRENT_USER_ID=usersList.length;

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

function checkCorrectPassword(login, password) {
    let error_res=   {error : 1 , status : 404, data : "Login inexistant ou mot de passe incorrect" };
    for (let i=0; i<usersList.length; i++) {
        let utilisateur = usersList[i];
        if (utilisateur.login===login) {
            return utilisateur.password===password
                ?  { error : 0, status : 200 ,data : {id: utilisateur.id, login: utilisateur.login, role: utilisateur.role} }
                : error_res;

        }
    }
    return  error_res;
}


function searchUser(login) {
    for (let i=0; i<usersList.length; i++) {
        let utilisateur = usersList[i];
        if (utilisateur.login===login) {
            return  { error : 0, status : 200 ,data : "Login déja existant0" };
        }
    }
    return {error : 1 , status : 404, data : "Utilisateur inexistant" };
}

/*function addUser(login, password, role) {

    if (searchUser(login)) {
        return {error : 0, status: 409, data : "Un utilisateur avec ce login existe déja"}
    }

    let id = ++CURRENT_USER_ID;

    const user = {login, password,  role, id};
    if (role==="presta") {
        pendingRequest.value.push(user);
        router.push('/login');
    }
    else {
        users.push(user);
    }
    return { error: 0, status: 201, data: user }
}*/

function createPendingProvider(name, email) {
    const user = {id : ++CURRENT_USER_ID , name : name, email : email};
    usersList.push(user);
}



export default {
    getUser: checkCorrectPassword,  searchUser, requireRole, createPendingProvider
}