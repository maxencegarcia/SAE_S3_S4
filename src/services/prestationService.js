import { services, emplacements, prestations } from '../data/dataprestations'

let listePrestations = [...prestations]

function getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null')
}

function exigerRole(role) {
    const user = getUser()
    if (!user || user.role !== role) {
        throw new Error('Accès refusé')
    }
    return user
}

export async function getServices() {
    exigerRole('presta')
    return services
}

export async function getEmplacements() {
    return emplacements
}

export async function ajouterPrestation({ service, dateHeure, idEmplacement }) {
    const user = exigerRole('presta')

    const nouvelle = {
        id: Date.now(),
        idPresta: user.id,
        service,
        dateHeure,
        idEmplacement: Number(idEmplacement),
        statut: 'en attente'
    }

    listePrestations.push(nouvelle)
    return nouvelle
}

export async function getMesPrestations() {
    const user = exigerRole('presta')
    return listePrestations.filter(p => p.idPresta === user.id)
}