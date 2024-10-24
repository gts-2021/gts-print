# #Gts-print
Design system for gts projects

# #Processus d'intégration en locale de 'gts-print' dans un autre projet :
## Génération d'une version 'gts-print'
* Récupérer depuis GitHub la dernière version de gts-print
* Lancer `npm run build` pour générer le dossier 'dist' qui contient les composants à exporter. 
* Lancer `npm pack` pour créer une version packagé prête à être installer par d'autres projets. (ex : gts-print-1.0.0.tgz)

## Intégration de 'gts-print' dans un projet :
* Copier le chemin absolue de fichier `gts-print-1.0.0.tgz` généré dans `gts-print`
* Lancer `npm install cheminCopié`

# #Processus de mise à jour : 
## Mise à jour à niveau des composants existant (Non  suppression/ajout des composants).
* Lancer `npm run build`
* Lancer `npm pack`
* Relancer seulement l'application consommatrice.

## Ajout d'un nouveau composant
* Penser à ajouter ce composant dans le fichier `index.js` pour l'export.
* Lancer `npm run build`
* Lancer `npm pack`

## Suppression d'un nouveau composant
* Penser à supprimer ce composant dans le fichier `index.js` pour l'export.
* Lancer `npm run build`
* Lancer `npm pack`

# #Processus de déploiment en prod d'une nouvelle version :
## Génération d'une release candistae (RC) :

* Assurer la recette et la validation sur la branche `develop`.
* Créer une release avec git flow `git flow release start versionNumber` remplacer `versionNumber` par le numero d'une nouvelle version ex : `1.0.3`
* Modifier le fichier package.json en mettant à jour le numero de version.
* `git add .`
* `git flow release publish` 
* `git flow release finish` 
* et comme ça la branche master est à jour 