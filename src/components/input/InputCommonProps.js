 
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: false,
        },
        required: {
            type: Boolean,
            default: false,
            required: false
        },
        type: {
            type: String,
            default: "text",
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        error: {
            type: String,
            required: false
        },
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {

        
        onInputValueChanged(value) {
            this.$emit('onValueChanged', value)

        }
    },
    watch: {

        inputValue(newVal) {
             this.onInputValueChanged(newVal)
        }
    },
  };
  