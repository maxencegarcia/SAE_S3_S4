import { emplacements } from '../data/dataprestations'
import {prestations, participe, pendingprestation, pendingrequest} from '../data/usersDatas'


//let listePrestations = [...prestations]
let listeParticipe = [...participe]

//Alias sans erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function ok(datas) {
    return { error: 0, status: 200, datas }
}
//Alias pour une erreur pour éviter à avoir à recopier { error, status, datas } à chaque fois
function erreur(status, message) {
    return { error: 1, status, datas: message }
}

function save(cle, valeur) {
    localStorage.setItem(cle, JSON.stringify(valeur))
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
            const p = prestations.value.find(p => p.idevent === l.idevent)
            return { ...p, statut: l.statut }
        })

    return ok(mesPrestations)
}
export async function getPendingPrestations() {
    const user = exigerRole('presta')
    if (!user) return erreur(403, 'Accès refusé')

    const mesPrestations = listeParticipe
        .filter(l => String(l.id) === String(user.id))
        .map(l => {
            const p = pendingprestation.value.find(p => p.idevent === l.idevent)
            return { ...p, statut: l.statut }
        })

    return ok(mesPrestations)
}

export async function ProposePrestation({ nomprestataire, email, nom, type, date, creneau, idEmplacement, description }) {
    //const user = exigerRole('presta')
    // if (!user) return erreur(403, 'Accès refusé')

    const idevent = Date.now()

    pendingprestation.value.push({
        idevent,
        nomprestataire,
        email,
        nom,
        type,
        date: date,
        creneau,
        idEmplacement: Number(idEmplacement),
        description: description
    })
    console.log('après ajout :', pendingprestation.value.length)


    //{nomprestataire: 'test', email: 'test@gmail.com', nom: 'philippe', type: 'test', date: '2026-12-12', creneau: '14:00-15:00', idEmplacement: '2', description: 'Un test'}



    // listeParticipe.push({ id: user.id, idevent, statut: 'en attente' })

    return ok({ idevent })
}

export async function removePrestapending(id) {
    const index = pendingprestation.value.findIndex(u => u.idevent === id);
    if(index>-1){
        pendingprestation.value.splice(index, 1);
    }
}
export async function removePresta(id) {
    const index = prestations.value.findIndex(u => u.idevent === id);
    if(index>-1){
        prestations.value.splice(index, 1);
    }
}

export async function AcceptPrestation(idevent) {
    const user = exigerRole('orga')
    if (!user) return erreur(403, 'Accès refusé')

    const p = pendingprestation.value.find(p => p.idevent === idevent)
    if (!p) return erreur(404, 'Prestation introuvable')

    prestations.value.push({
        idevent: p.idevent,
        nom: p.nom,
        type: p.type,
        image: null,
        plan: null,
        description: p.description,
        date_debut: p.date,
        date_fin: p.date,
        creneau: p.creneau,
        idEmplacement: p.idEmplacement
    })
    //save('prestations', listePrestations)
    pendingprestation.value = pendingprestation.value.filter(x => x.idevent !== idevent)
    const lien = listeParticipe.find(l => l.idevent === idevent)
    if (lien) {
        lien.statut = 'acceptée'
        save('participe', listeParticipe)
    }

    return ok({ idevent })
}