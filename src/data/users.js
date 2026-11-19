// login





export const users = [
    {login: 'orga', password: 'mdp', id: 0, role: 'orga', email: 'organisateur@mail.com', status : 'registered'},
    {login: 'orgaadmin', password: 'admin123', id: 2, role: 'orga', email : 'orgaadmin@mail.com' , status :'registered'},
    {login: 'presta', password: 'mdp', id: 1, role: 'presta', email : 'presta@mail.com', status : "registered"},
    {login: 'webdev', password: 'webdev123', id: 3, role: 'presta', email : 'webdev@mail.com', status: 'registered'}
]

export const participations = [
    {providerId: 1, activityId: 1, status: 'accepté'},
    {providerId: 1, activityId: 2, status: 'refusée'},
    {providerId: 3, activityId: 3, status: 'en attente'},
]




function load(cle, parDefaut) {
    try {
        const sauvegarde = localStorage.getItem(cle)
        return sauvegarde ? JSON.parse(sauvegarde) : parDefaut
    } catch {
        return parDefaut
    }
}