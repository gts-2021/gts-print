# #Gts-print
Design system for gts projects

# #Personnalisation du thème (Variables CSS)

Les composants `gts-print` utilisent des variables CSS (`--gts-*`) avec des valeurs par défaut définies dans `src/styles/tokens.css` (via `:where(:root)` pour que vos surcharges CSS soient toujours prioritaires sans conflit de spécificité).

## 1. Thème global dans l'application cible

Redéfinissez simplement les variables souhaitées dans votre CSS principal (après ou avant l'import de `gts-print/dist/gts-print.css`) :

```css
:root {
  --gts-primary-700: #1e3a8a;
  --gts-primary-600: #1d4ed8;
  --gts-primary-500: #2563eb;
  --gts-primary-400: #3b82f6;
  --gts-primary-300: #60a5fa;
  --gts-primary-200: #93c5fd;
  --gts-primary-100: #bfdbfe;
  --gts-primary-50: #eff6ff;

  --gts-secondary: #0f766e;
}
```

## 2. Thème contextuel (par section, page ou composant)

Appliquez une classe CSS (ou `:style`) sur le conteneur ciblé :

```css
.context-admin {
  --gts-primary-400: #7c3aed;
  --gts-primary-50: #f5f3ff;
  --gts-primary-700: #4c1d95;
}
```

```vue
<template>
  <section class="context-admin">
    <ButtonComponent title="Action contextuelle" />
  </section>
</template>
```

> **Note sur `src/styles/colors.scss`** : chaque variable SCSS (`$primary-color-400`, etc.) pointe sur sa variable CSS (`var(--gts-..., <valeur-par-défaut>)`). Aucune recompilation de `gts-print` n'est nécessaire pour changer les couleurs.

### Tokens principaux
* **Primaire** : `--gts-primary-50`, `--gts-primary-100`, `--gts-primary-200`, `--gts-primary-300`, `--gts-primary-400`, `--gts-primary-500`, `--gts-primary-600`, `--gts-primary-700`
* **Secondaire** : `--gts-secondary`, `--gts-secondary-50` à `--gts-secondary-700`
* **Neutres** : `--gts-color-white`, `--gts-neutral-50` à `--gts-neutral-900`
* **Accents** : `--gts-accent-dark-red`, `--gts-accent-error-red`, `--gts-accent-light-red`, `--gts-accent-light-red-100`, `--gts-accent-dark-orange`, `--gts-accent-light-orange`, `--gts-accent-warning-text`, `--gts-accent-warning-bg`
* **Composants** : `--gts-barside-*`, `--gts-card-border`, `--gts-context-menu-border`, `--gts-dialog-*`, `--gts-tooltip-*`, `--gts-table-zebra-bg`, `--gts-input-disabled-bg`, `--gts-calendar-*`, `--gts-time-*`

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