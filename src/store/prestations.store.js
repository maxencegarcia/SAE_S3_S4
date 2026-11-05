import { defineStore } from 'pinia'
import { ref } from 'vue'
import prestationService from "../services/prestation.service.js";
import {compareStringValue} from "../utils/string.utils.js";

export const prestationsStore = defineStore('prestations', () => {

    // 1. Les données : une ref par donnée, initialisée vide
    let dejaCharge=false;

    const prestations = ref()
    const erreurs = ref();


    // 2. Les fonctions

    function traiter(reponse) {
        if (reponse.error) {
            erreurs.value = { status: reponse.status, datas: reponse.datas }
            return false
        }
        erreurs.value = null
        return true
    }

    async function chargerPrestations() {
        let reponse = await prestationService.getPrestations();
        if (!traiter(reponse)) return false;
        prestations.value = reponse.datas;
        return true;

    }

    async function charger() {
        if (dejaCharge) return;
        dejaCharge = await chargerPrestations();

    }



    async function supprimerPrestation(id) {

        const reponse = await prestationService.supprimerPrestation(id);
        if (!traiter(reponse)) return;
        await chargerPrestations();


    }


    // 3. Le return : tout ce que les composants doivent voir
    return {prestations, charger, supprimerPrestation, erreurs}
})
