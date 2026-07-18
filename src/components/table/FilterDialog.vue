<template>
  <ConfirmationDialog :isOpen="isOpen" title="Filter" titleFirstBtn="Reset Filters" titleLastBtn="Apply"
    themeFirstBtn="gts-button-primary-inverse" themeLastBtn="gts-button-primary" className="gts-filter-dialog"
    @onClosedDialog="onClose" @onFirstBtnClicked="onReset" @onLastBtnClicked="onApply">
    <div class="gts-filter-dialog-content">
      <div v-for="field in filterableFields" :key="field.name" class="gts-filter-dialog-row">
        <TextInput :label="field.title" :type="getFieldType(field.name)" :modelValue="localFilters[field.name] || ''"
          @update:modelValue="localFilters[field.name] = $event" className="gts-filter-input" />
      </div>

      <div v-if="filterableFields.length === 0" class="gts-filter-dialog-empty">
        No filterable fields available.
      </div>
    </div>
  </ConfirmationDialog>
</template>

<script>
import ConfirmationDialog from '../dialog/ConfirmationDialog.vue';
import TextInput from '../input/TextInput.vue';



export default {
  name: 'FilterDialog',

  components: {
    ConfirmationDialog,
    TextInput
  },

  props: {

    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },

    headers: {
      type: Array,
      required: true
    },

    filterConfiguration: {
      type: Array,
      required: false,
      default: () => []
    },

    currentFilters: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  emits: ['apply', 'reset', 'close'],

  data() {
    return {
      localFilters: {}
    };
  },

  computed: {

    filterableFields() {
      return this.headers.filter(header => {
        const config = this.getFieldConfig(header.name);
        return !config || config.disable !== true;
      });
    }
  },

  watch: {
    isOpen(val) {
      if (val) {
        this.localFilters = { ...this.currentFilters };
      }
    }
  },

  methods: {

    getFieldConfig(fieldName) {
      return this.filterConfiguration.find(c => c.field === fieldName);
    },

    getFieldType(fieldName) {
      const config = this.getFieldConfig(fieldName);
      return config?.isDate === true ? 'date' : 'text';
    },

    onApply() {
      this.$emit('apply', { ...this.localFilters });
    },

    onReset() {
      this.localFilters = {};
      this.$emit('reset');
    },

    onClose() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.gts-filter-dialog {
  width: 600px !important;

  .gts-filter-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .gts-filter-dialog-row {
      display: flex;
      align-items: center;

      .gts-filter-input {
        flex-grow: 1;
      }

      .gts-input-container {
        width: 100%;
      }
    }

    .gts-filter-dialog-empty {
      color: #888;
      font-style: italic;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
