import { utilisateurs } from "../data/usersDatas.js";

function getUser(login, password) {
    let error_res=   {error : 1 , status : 404, datas : "Login inexistant ou mot de passe incorrect" };
    for (let i=0; i<utilisateurs.length; i++) {
        let utilisateur = utilisateurs[i];
        if (utilisateur.login===login) {
            return utilisateur.password===password
                ?  { error : 0, status : 200 ,datas : {id: utilisateur.id, login: utilisateur.login, role: utilisateur.role} }
                : error_res;

        }
    }
    return  error_res;
}

export default {
    getUser
}