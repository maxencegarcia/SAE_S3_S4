import LocalSource from "./Localsource.prestation.service.js"


async function getPrestationsFromLocalSource() {
    return LocalSource.getPrestations();
}
async function supprimerPrestationFromLocalSource(id) {
    return LocalSource.supprimerPrestation(id);
}

async function supprimerPrestation(id) {
    return supprimerPrestationFromLocalSource(id);
}

async function getPrestations() {
    return getPrestationsFromLocalSource();
}



export default {
    supprimerPrestation,
    getPrestations
};