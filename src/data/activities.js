export const services = [
    'Livre d\'or',
    'Réservation de place',
    'Planning de passage',
    'Vente de goodies'
]


export const locations = [
    { id: 1, name: 'Scène principale' },
    { id: 2, name: 'Stand A' },
    { id: 3, name: 'Stand B' },
    { id: 4, name: 'Zone détente' }
]



export const activities = [
    {id: 1, name: 'Test de jeu en Duo', type: 'test', image: 'Testjeuduo.jpeg', layout: 'plan_jeu_duo.png', description: 'Un test de jeu en duo pour voir si on est capables de coopérer… ou si on va surtout se gêner mutuellement', startDate: '2026-12-12', endDate: '2026-12-12',timeSlot: '14:00-15:00', locationId: 2},
    {id: 2, name: 'Battle d\'aura', type: 'concour', image: 'BattleAura.png', layout: 'plan_battle_aura.png', description: 'Affrontez-vous dans une battle d’aura où le style, le charisme et la présence feront toute la différence. Qui dominera la scène et repartira avec le plus d’aura ?', startDate: '2026-12-12', endDate: '2026-12-12',timeSlot: '12:00-13:00', locationId: 1},
    {id: 3, name: 'Game award', type: 'présentation', image: 'GA.jpg', layout: 'plan_game_award.png', description: 'Présentez et défendez vos jeux préférés lors d’une cérémonie inspirée des Game Awards. Découvrez les nominations, débattez des meilleurs jeux et élisez les grands gagnants !', startDate: '2026-10-15', endDate: '2026-10-15',timeSlot: '16:00-18:00', locationId: 2}
]

/**
export const activities = [
    {
        id: 1,
        idProvider: '1',
        service: 'Livre d\'or',
        date: '2026-12-11T18:00',
        idEmplacement: 2,
        statut: 'en attente'
    }
]
*/