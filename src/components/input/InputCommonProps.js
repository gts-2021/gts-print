export default {

	props: {

		modelValue: {
			type: String,
			default: ''
		},

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
			inputValue: this.modelValue
		};
	},

	methods: {
		emitInput(event) {
			this.$emit('update:modelValue', event.target.value);  
		},

		onInputValueChanged(value) {
			this.$emit('onValueChanged', value)
			this.inputValue = value;
		}
	},

	watch: {
		modelValue(newVal) {
			this.onInputValueChanged(newVal)
		}
	},
};
