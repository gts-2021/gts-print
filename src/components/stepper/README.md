# StepperComponent Documentation

## Introduction

The `StepperComponent` displays a progress stepper, indicating the current step in a multi-step process. It allows users to navigate between steps by clicking on them.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | `Array` | Yes | `[]` | Array of step objects `{ id: '...', title: '...' }`. |
| `selectedSteps` | `Array` | Yes | `[]` | Array of IDs of the currently selected/completed steps. |
| `className` | `String` | No | - | Custom CSS class for the container. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onStepClicked` | `Object` | Emitted when a step is clicked. Payload: `{ index, ...stepObject }`. |

## Usage Example

```vue
<template>
  <StepperComponent 
    :steps="steps" 
    :selectedSteps="completedSteps"
    @onStepClicked="handleStepClick"
  />
</template>

<script>
import StepperComponent from '@/components/stepper/StepperComponent.vue';

export default {
  components: { StepperComponent },
  data() {
    return {
      steps: [
        { id: 'step1', title: 'Personal Info' },
        { id: 'step2', title: 'Address' },
        { id: 'step3', title: 'Payment' }
      ],
      completedSteps: ['step1']
    };
  },
  methods: {
    handleStepClick(step) {
      console.log('Clicked step:', step);
      // Logic to update current step or validate navigation
    }
  }
};
</script>
```