import { emplacements } from '../data/dataprestations'
import { prestations, participe } from '../data/usersDatas'


let listePrestations = [...prestations]
let listeParticipe = [...participe]

//Alias sans erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function ok(datas) {
    return { error: 0, status: 200, datas }
}
//Alias pour une erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function erreur(status, message) {
    return { error: 1, status, datas: message }
}

function getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null')
}

function exigerRole(role) {
    const user = getUser()
    if (!user || user.role !== role) {
        return null
    }
    return user
}

export async function getEmplacements() {
    return ok(emplacements)
}

export async function getMesPrestations() {
    const user = exigerRole('presta')
    if (!user) return erreur(403, 'Accès refusé')

    const mesPrestations = listeParticipe
        .filter(l => String(l.id) === String(user.id))
        .map(l => {
            const p = listePrestations.find(p => p.idevent === l.idevent)
            return { ...p, statut: l.statut }
        })

    return ok(mesPrestations)
}

export async function ajouterPrestation({ nom, type, date, creneau, idEmplacement }) {
    const user = exigerRole('presta')
    if (!user) return erreur(403, 'Accès refusé')

    const idevent = Date.now()

    listePrestations.push({
        idevent,
        nom,
        type,
        image: null,
        plan: null,
        description: '',
        date_debut: date,
        date_fin: date,
        creneau,
        idEmplacement: Number(idEmplacement)
    })

    listeParticipe.push({ id: user.id, idevent, statut: 'en attente' })

    return ok({ idevent })
}