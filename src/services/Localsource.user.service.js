import { users } from "../data/usersDatas.js";
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
function checkUser(login, password, role) {
    let error_res=   {error : 1 , status : 404, data : "Login deja existant impossible de creer des doublon" };
    let id = 0;
    for (let i=0; i<users.length; i++) {
        let utilisateur = users[i];
        if (utilisateur.login===login) {
            return error_res;
        }
        id ++;
    }
    console.log(id);
    id ++;
    addUser(login, password, role, id);
    router.push('/login')
    return  { error : 0, status : 200 ,data : "login disponible" };
}

function addUser(login, password, role, id) {
    const user = {login, password, id, role};
    users.push(user);
    return { error: 0, status: 201, data: user }
}

export default {
    getUser, checkUser, addUser
}