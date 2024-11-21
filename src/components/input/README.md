# Documentation du composant `<TextInput />`

Le composant `<TextInput />` est un champ de saisie personnalisable permettant à l'utilisateur de saisir des données, notamment des textes et des dates. Ce composant prend en charge des fonctionnalités telles que les étiquettes, les messages d'erreur, et les icônes.

## Exemple d'utilisation

```vue
<TextInput 
    label="Nom" 
    v-model="userName" 
    placeholder="Entrez votre nom" 
    required 
    error="Le nom est requis" 
    type="text" 
/>
```

## Props

| Prop        | Type     | Requis | Valeur par défaut | Description                                                  |
|-------------|----------|--------|-------------------|--------------------------------------------------------------|
| `label`     | `String` | Oui    | N/A               | L'étiquette pour le champ de saisie.                         |
| `placeholder` | `String` | Non  | `""`              | Texte d'espace réservé pour le champ.                        |
| `value`     | `String` | Non    | `""`              | Valeur actuelle du champ.(deprecated)                        |
 v-model="variable"    | `String` | Oui    | `""`     | 2-way binding                                                |
| `required`  | `Boolean`| Non    | `false`           | Indique si le champ est obligatoire.                         |
| `type`      | `String` | Non    | `"text"`          | Spécifie le type de champ d'entrée (`text`, `date`, etc .).  |
| `disabled`  | `Boolean`| Non    | `false`           | Si `true`, désactive le champ de saisie.                     |
| `error`     | `String` | Non    | `""`              | Message d'erreur à afficher sous le champ de saisie.         |
| `maskPattern`| `String`| Non    | `""`              | elle prend un patten pour le mask souhaité.                  |
| `maskToken`  | `String`| Non    | `""`              | elle prend un object object pour appliquer le mask souhaité. |

## Événements

| Événement          | Description                                              |
|-------------------|----------------------------------------------------------|
| `onValueChanged`  | Émis lorsque la valeur du champ change.                  |

## Maska library
we are using maska library from : https://beholdr.github.io/maska/v3/#/install 

** mask token
{
  '#': { pattern: /[0-9]/ },       // digits
  '@': { pattern: /[a-zA-Z]/ },    // letters
  '*': { pattern: /[a-zA-Z0-9]/ }, // letters & digits
}
