# Known Issues

Ce fichier contient les bugs et problèmes actuellement connus dans le projet.

## Bugs critiques
- Aucun détecté pour le moment

## Bugs mineurs
- **Problème** : Problème d'actualisation de mise en page lors de l'ajout de réaction ou de changement de background sur les @question @mention et messages de moderéateurs.
    - **Cause** : BBB utilise des composants React-Virtualized ce qui limite nos possibilités de rafraichissement de la mise en page.
    - **Statut** : Aucune solution trouvée pour le moment.
    - **Solution temporaire** : Scroll dans le tchat pour forcer une mise à jour de la mise en page.


- **Problème** : Impossible de récupérer entièrement la liste des utilisateurs connectés sur la réunion BBB.
    - **Cause** : BBB utilise des composants React-Virtualized ce qui limite nos possibilités de récupération d'éléments non affichés.
    - **Statut** : Aucune solution trouvée pour le moment.
    - **Solution temporaire** : Récupérer les utilisateurs affiché dans la liste à gauche et récupérer dynamiquement les utilisateurs qui discutent dans le tchat et les mettre en cache.

## Limitations connues
- **Problème** : BBB utilise des composants React-Virtualized ce qui limite nos possibilités de rafraichissement de la mise en page et de récupération d'éléments non affichés.
    - **Statut** : Aucune solution trouvée pour le moment.