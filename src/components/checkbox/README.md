
# CheckBox Component

Un composant VueJS réutilisable qui offre une case à cocher personnalisée avec un label associé.

## Aperçu

Le `CheckBox` est un composant simple qui permet aux utilisateurs de basculer entre un état "coché" et "non coché". Il est doté d'une icône SVG pour afficher l'état "coché".

## Fonctionnalités

- Personnalisation facile avec des props pour définir l'état initial et le label.
- Émission d'événements pour capturer l'interaction de l'utilisateur.
- Design moderne avec des styles SCSS.

## Installation

1. Copiez le fichier `CheckBox.vue` dans le répertoire de composants de votre projet.
2. Importez-le et utilisez-le dans vos composants Vue.

## Utilisation

```vue
<template>
  <CheckBox
    id="example-checkbox"
    label="Accepter les termes"
    :isChecked="true"
    @onChecked="handleCheck"
  />
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';

export default {
  components: {
    CheckBox
  },
  methods: {
    handleCheck(isChecked) {
      console.log('État de la case :', isChecked);
    }
  }
};
</script>
```

## Props

| Prop        | Type     | Description                                    | Requis | Par défaut |
|-------------|----------|------------------------------------------------|--------|------------|
| `id`        | String   | Identifiant unique pour la case à cocher       | Non    | `null`     |
| `label`     | String   | Texte affiché à côté de la case                | Non    | `''`       |
| `isChecked` | Boolean  | Définit si la case est initialement cochée     | Non    | `false`    |

## Événements

| Événement     | Description                                  | Paramètre émis        |
|---------------|----------------------------------------------|-----------------------|
| `onChecked`   | Émis lorsque la case est cochée/décochée     | `Boolean` (état actuel) |

 
