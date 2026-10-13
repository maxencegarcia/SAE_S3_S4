// login

export const prestataire = [
    {login: 'presta', password: 'mdp', id: '1', role: 'presta'},
    {login: 'webdev', password: 'webdev123', id: '2', role: 'presta'}
]

export const orga = [
    {login: 'orga', password: 'mdp', id: '1', role: 'orga'},
    {login: 'orgaadmin', password: 'admin123', id: '2', role: 'orga'}
]
// event page event logique



export const evenements = [
  {idevent: 1, nom: 'Test de jeu en Duo', type: 'test', image: 'Testjeuduo.jpeg', plan: 'plan_jeu_duo.png', description: 'Un test de jeu en duo pour voir si on est capables de coopérer… ou si on va surtout se gêner mutuellement', date_debut: '2026-12-12', date_fin: '2026-12-12'},
  {idevent: 2, nom: 'Battle d\'aura', type: 'concour', image: 'BattleAura.png', plan: 'plan_battle_aura.png', description: 'Affrontez-vous dans une battle d’aura où le style, le charisme et la présence feront toute la différence. Qui dominera la scène et repartira avec le plus d’aura ?', date_debut: '2026-12-12', date_fin: '2026-12-12'},
  {idevent: 3, nom: 'Game award', type: 'présentation', image: 'GA.jpg', plan: 'plan_game_award.png', description: 'Présentez et défendez vos jeux préférés lors d’une cérémonie inspirée des Game Awards. Découvrez les nominations, débattez des meilleurs jeux et élisez les grands gagnants !', date_debut: '2026-10-15', date_fin: '2026-10-15'}
]


// liaison entre les 2

export const participe = [
    {id: 1, idevent:1},
    {id: 1, idevent: 2},
    {id: 3, idevent: 3},
]