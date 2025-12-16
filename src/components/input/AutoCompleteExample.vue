<template>
  <div style="padding: 20px;">
    <h2>AutoComplete Example</h2>
    <div style="width: 300px;">
      <AutoComplete
        label="Select a Fruit"
        :options="fruitOptions"
        v-model="selectedFruit"
        @onValueChanged="onFruitChanged"
      />
    </div>
    <div style="margin-top: 20px;">
      <strong>Selected Value:</strong> {{ selectedFruit }}
    </div>
  </div>
</template>

<script>
import AutoComplete from './AutoComplete.vue';

export default {
  name: 'AutoCompleteExample',
  components: {
    AutoComplete
  },
  data() {
    return {
      selectedFruit: '',
      fruitOptions: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
        { label: 'Elderberry', value: 'elderberry' },
        { label: 'Fig', value: 'fig' },
        { label: 'Grape', value: 'grape' }
      ]
    }
  },
  methods: {
    onFruitChanged(option) {
      console.log('Fruit changed:', option);
    }
  }
}
</script>
