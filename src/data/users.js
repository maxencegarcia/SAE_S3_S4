// login


import {ref} from "vue";


export const users = [
    {login: 'orga', password: 'mdp', id: '0', role: 'orga'},
    {login: 'orgaadmin', password: 'admin123', id: '2', role: 'orga'},
    {login: 'presta', password: 'mdp', id: '1', role: 'presta'},
    {login: 'webdev', password: 'webdev123', id: '3', role: 'presta'}
]
export const pendingRequest  = [
    {login: 'prestapendingtest', password: 'mdp', id: '1', role: 'presta'},
    {login: 'presta2', password: 'mdp', id: '3', role: 'presta'}
];
//verifier ici il y avait un prbleme d'id
// normalement j'ai verif et c'est bon mais je laisse le com au cas ou







// liaison entre les 2

export const participations = [
    {providerId: 1, activityId: 1, status: 'acceptée'},
    {providerId: 1, activityId: 2, status: 'refusée'},
    {providerId: 3, activityId: 3, status: 'en attente'},
]