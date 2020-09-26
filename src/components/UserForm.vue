<template>
	<div class="user-form">
		<v-form ref="form" v-model="valid" lazy-validation>
			<template v-for="(field, fieldIndex) in fields">
				<input
					v-if="field.type === 'hidden'"
					:key="field.key"
					:type="field.type"
				/>
				<v-text-field
					:key="field.key"
					v-else-if="isTextField(field.type)"
					v-bind="bind(field)"
					v-model="field.value"
				></v-text-field>
				<v-textarea
					:key="field.key"
					v-else-if="field.type === 'textarea'"
					v-bind="bind(field)"
					v-model="field.value"
				></v-textarea>
				<v-select
					v-if="field.type === 'select'"
					:key="field.key"
					:items="selectOptions(field.options)"
					v-bind="bind(field)"
					v-model="field.value"
				>
				</v-select>
				<div
					v-if="field.type === 'repeater'"
					:key="field.key"
					class="repeater mb-5"
				>
					<v-subheader class="pl-0">{{
						field.key.toUpperCase()
					}}</v-subheader>
					<div
						class="pl-5 d-flex"
						v-for="(value, vfi) in field.value"
						:key="vfi"
					>
						<v-text-field
							:key="vi"
							v-for="(val, key, vi) in value"
							v-bind="repeaterBind(field.key, key)"
							v-model="value[key]"
							class="mx-2"
						></v-text-field>
					</div>
					<v-btn
						@click="$emit('add-repeater', fieldIndex)"
						outlined
						small
						color="primary"
						class="rounded-pill ml-5"
					>
						<v-icon left>mdi-plus-circle-outline</v-icon>
						Add
					</v-btn>
				</div>
			</template>

			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-4"
				@click="validate"
			>
				Validate
			</v-btn>

			<v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

			<v-btn color="warning" @click="resetValidation">
				Reset Validation
			</v-btn>
		</v-form>
	</div>
</template>

<script>
export default {
	name: 'UserForm',
	props: {
		fields: Array
	},
	data: () => ({
		valid: true,
		name: '',
		nameRules: [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		select: null,
		items: [
			'Item 1',
			'Item 2',
			'Item 3',
			'Item 4',
		],
		checkbox: false,
	}),
	created() {

	},
	computed: {
		rRequired: () => v => !!v,
		rOnlyLetters: () => v => /^[a-z]+$/i.test(v),
		rOnlyLetterNumber: () => v => /^[a-z0-9]+$/i.test(v)
	},
	methods: {
		rMax: (max) => v => {
			console.log('v', v, v.length);
			return (v || '').length <= max
		},
		getRules({ validate, required }) {

			let rules = []

			// Required rule
			if (required) { rules.push(this.rRequired) }

			// Accept only letter
			if (validate && validate === "only_letters") {
				rules.push(this.rOnlyLetters)
			}
			// Accept letter and numbers
			if (validate && validate.includes('letter_number')) {
				rules.push(this.rOnlyLetterNumber)
			}

			if (validate && validate.includes('max')) {
				let max = validate.split('|').find(a => a.includes('max')).split(':').pop()
				rules.push(this.rMax(+max))
			}
			return rules
		},
		bind(field) {
			let opt = {
				required: field.required,
				name: field.key,
				label: field.title,
				type: field.type,
				rules: this.getRules(field)
			}
			if (field.html_attr) {
				opt = Object
					.keys(field.html_attr)
					.reduce((opt, key) => ({
						...opt,
						[key]: field.html_attr[key]
					}), opt)
			}
			return opt
		},
		repeaterBind(fieldKey, repeaterKey) {
			let field = this.fields.find(f => f.key === fieldKey)
			let options = field.repeater_fields[repeaterKey]
			return {
				type: options.type,
				label: options.title,
				required: options.required,
				rules: this.getRules(field)
			}
		},
		objectToArray(object) {
			return Object.entries(object).map(([key, value]) => ({ key, ...value }))
		},
		selectOptions(options) {
			return options.map(({ key, label }) => ({
				text: label,
				value: key
			}))
		},
		isTextField(type) {
			return ['text', 'email', 'number'].includes(type)
		},
		validate() {
			this.$refs.form.validate()
		},
		reset() {
			this.$refs.form.reset()
		},
		resetValidation() {
			this.$refs.form.resetValidation()
		},
	},
}
</script>

<style lang='scss' scoped>
	.user-form {
	}
</style>