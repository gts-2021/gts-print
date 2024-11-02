
# RadioButton Component

## Description
`RadioButton` is a Vue component representing a customizable radio button with a label.

## Template Structure
```vue
<template>
  <div @click="checkRadio" class="gts-radio-container">
    <div class="gts-radio">
      <span v-if="isRadioChecked" class="gts-radio-checked"></span>
    </div>
    <span @click="checkRadio" class="gts-radio-label">{{ label }}</span>
  </div>
</template>
```

## Props
| Prop Name | Type    | Required | Default | Description                          |
|-----------|---------|----------|---------|--------------------------------------|
| id        | String  | No       | -       | Unique identifier for the radio button. |
| label     | String  | No       | ''      | The label displayed next to the radio button. |
| isChecked | Boolean | No       | false   | Indicates if the radio button is initially checked. |

## Data
| Data Property   | Type    | Description                       |
|-----------------|---------|-----------------------------------|
| isRadioChecked  | Boolean | Tracks whether the radio button is checked. |

## Methods
| Method Name | Description |
|-------------|-------------|
| checkRadio  | Sets the radio button to checked and emits the `onChecked` event with the radio button ID. |

## Events
| Event Name  | Payload   | Description                         |
|-------------|-----------|-------------------------------------|
| onChecked   | `String`  | Emitted when the radio button is checked, sending its ID. |

## Watchers
| Watcher    | Description |
|------------|-------------|
| isChecked  | Updates `isRadioChecked` when `isChecked` prop changes. |

 

# RadioGroup Component

## Description
`RadioGroup` is a Vue component that renders a group of `RadioButton` components, allowing a user to select one option from a provided list.

## Template Structure
```vue
<template>
  <div class="gts-radio-group">
      <RadioButton v-for="(item, index) in radios" :key="index" :label="item.label" @onChecked="onRadioChecked" :id="index" :isChecked="index == itemSelected" />
  </div>
</template>
```

## Props
| Prop Name   | Type    | Required | Description                                   |
|-------------|---------|----------|-----------------------------------------------|
| radios      | Array   | Yes      | An array of objects representing radio options. |
| itemChecked | Number  | No       | The index of the initially checked radio button. |

## Data
| Data Property | Type   | Description                                      |
|---------------|--------|--------------------------------------------------|
| itemSelected  | Number | The index of the currently selected radio button. |

## Methods
| Method Name      | Description |
|------------------|-------------|
| onRadioChecked   | Updates `itemSelected` with the index of the checked radio and emits `onRadioChecked` with the selected radio object. |

## Events
| Event Name     | Payload        | Description                                          |
|----------------|----------------|------------------------------------------------------|
| onRadioChecked | `Object`       | Emitted when a radio button is checked, sending the checked radio object. |

## Lifecycle Hooks
| Hook     | Description |
|----------|-------------|
| created  | Sets `itemSelected` to `itemChecked` prop on component creation. |

 