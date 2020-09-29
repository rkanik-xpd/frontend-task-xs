<template>
	<div class="user-form">
		<v-card>
			<v-card-title class="pt-8"
				>{{ update ? "Update" : "Create" }} User</v-card-title
			>
			<v-card-subtitle>Please fill up the form corretly</v-card-subtitle>
			<v-card-text v-if="fields.length" class="mt-10">
				<v-form ref="form" v-model="valid" lazy-validation>
					<template v-for="(field, fieldIndex) in fields">
						<!-- Start Hidden -->
						<input
							v-if="field.type === 'hidden'"
							:key="field.key"
							:type="field.type"
						/>
						<!-- End Hidden -->

						<!-- Start TextField -->
						<v-text-field
							:key="field.key"
							v-else-if="isTextField(field.type)"
							v-bind="bind(field)"
							v-model="field.value"
						></v-text-field>
						<!-- End TextField -->

						<!-- Start textarea -->
						<v-textarea
							:key="field.key"
							v-else-if="field.type === 'textarea'"
							v-bind="bind(field)"
							v-model="field.value"
						></v-textarea>
						<!-- End textarea -->

						<v-select
							v-if="field.type === 'select'"
							:key="field.key"
							:items="selectOptions(field.options)"
							v-bind="bind(field)"
							v-model="field.value"
						>
						</v-select>

						<!-- Start field type radio -->
						<div :key="field.key" v-if="field.type === 'radio'">
							<v-subheader class="pl-0">{{
								field.title.toUpperCase()
							}}</v-subheader>
							<v-radio-group
								row
								v-model="field.value"
								v-bind="field.html_attr"
								class="mt-0"
							>
								<v-radio
									v-for="(opt, optIndex) in field.options"
									:key="optIndex"
									:label="opt.label"
									:value="opt.key"
								></v-radio>
							</v-radio-group>
						</div>
						<!-- End field type radio -->

						<!-- Start repeater -->
						<div
							v-if="field.type === 'repeater'"
							:key="field.key"
							class="repeater mb-5"
						>
							<v-subheader class="pl-0">{{
								field.title.toUpperCase()
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
								<v-btn
									@click="$emit('del-repeater', [fieldIndex, vfi])"
									v-if="
										!field.required ||
										(field.required && field.value.length > 1)
									"
									icon
									color="red"
									><v-icon>mdi-close</v-icon></v-btn
								>
							</div>
							<v-card v-if="!field.value.length" flat>
								<v-card-subtitle
									>There is no {{ field.title }} field</v-card-subtitle
								>
								<v-card-text>
									<v-btn
										small
										outlined
										color="primary"
										class="rounded-pill"
										@click="$emit('add-repeater', fieldIndex)"
									>
										<v-icon left small
											>mdi-plus-circle-outline</v-icon
										>
										Add One
									</v-btn>
								</v-card-text>
							</v-card>
							<div v-else class="d-flex py-3">
								<v-spacer></v-spacer>
								<v-btn
									small
									outlined
									color="primary"
									class="rounded-pill ml-5"
									@click="$emit('add-repeater', fieldIndex)"
								>
									<v-icon left small>mdi-plus-circle-outline</v-icon>
									Add
								</v-btn>
							</div>
						</div>
						<!-- End repeater -->
					</template>

					<v-btn
						class="mr-4"
						color="success"
						:loading="loading"
						:disabled="!valid || loading"
						@click="handleValidate"
					>
						{{ update ? "Update" : "Create" }}
					</v-btn>
					<!-- <v-btn text color="error" class="mr-4" @click="handleReset">
            Reset
          </v-btn> -->
				</v-form>
			</v-card-text>
			<v-card-text class="pa-8" v-else>
				<h3 class="body-1 text-center">Error getting form data</h3>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "UserForm",
	props: {
		createUser: Function,
		updateUser: Function,
		update: {
			type: Boolean,
			default: false,
		},
		fields: Array,
	},
	data: () => ({
		valid: true,
		loading: false
	}),
	computed: {
		rRequired: () => v => !!v || "Field is required!",
		rEmail: () => v => /.+@.+\..+/.test(v) || "E-mail must be valid",
		rOnlyLetters: () => v => /^[a-z\s]+$/i.test(v) || "This field only accept characters",
		rOnlyLetterNumber: () => v => /^[a-z0-9\s]+$/i.test(v) || "This field only accept characters and numbers",
		maxRegex: () => /max:[0-9]+/,
		handleSubmit() { return this.update ? this.updateUser : this.createUser }
	},
	methods: {
		getFieldsAsObject() {
			return this.fields.reduce((data, field) => ({ ...data, [field.key]: field.value }), {})
		},
		getMax(str) {
			let match = str.match(this.maxRegex);
			if (!match) return;
			return +match[0].split(":").pop();
		},
		rMax: (max) => (v) => {
			return (
				(v || "").length <= max || `Field must be less than ${max} characters`
			);
		},
		getRules({ validate, required }) {
			let rules = [];

			// Required rule
			if (required) {
				rules.push(this.rRequired);
			}

			// Verify email
			if (validate && validate.includes("email")) {
				rules.push(this.rEmail);
			}

			// Accept only letter
			if (validate && validate === "only_letters") {
				rules.push(this.rOnlyLetters);
			}

			// Accept letter and numbers
			if (validate && validate.includes("letter_number")) {
				rules.push(this.rOnlyLetterNumber);
			}

			if (this.maxRegex.test(validate)) {
				rules.push(this.rMax(this.getMax(validate)));
			}
			return rules;
		},
		bind(field) {
			let opt = {
				dense: true,
				outlined: true,
				required: field.required,
				name: field.key,
				label: field.title,
				type: field.type,
				rules: this.getRules(field),
			};
			if (field.html_attr) {
				opt = Object.keys(field.html_attr).reduce(
					(opt, key) => ({
						...opt,
						[key]: field.html_attr[key],
					}),
					opt
				);
			}
			return opt;
		},
		repeaterBind(fieldKey, repeaterKey) {
			let field = this.fields.find((f) => f.key === fieldKey);
			let options = field.repeater_fields[repeaterKey];
			return {
				dense: true,
				outlined: true,
				type: options.type,
				label: options.title,
				required: options.required,
				rules: this.getRules(field),
				counter: this.getMax(field.validate),
			};
		},
		objectToArray(object) {
			return Object.entries(object).map(([key, value]) => ({ key, ...value }));
		},
		selectOptions(options) {
			return options.map(({ key, label }) => ({
				text: label,
				value: key,
			}));
		},
		isTextField(type) {
			return ["text", "email", "number"].includes(type);
		},
		handleValidate() {
			this.loading = true
			let valid = this.$refs.form.validate();
			if (valid) {
				let data = this.getFieldsAsObject()
				this.handleSubmit(data).then(success => {
					(success && !this.update) && this.handleReset()
					this.loading = false
					this.$router.push({ name: 'Home' })
				})
			}
			else {
				this.loading = false
			}
		},
		handleReset() {
			this.$refs.form.reset();
		},
	},
};
</script>

<style lang='scss'>
	.user-form {
		.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
			> .v-input__control
			> .v-input__slot
			fieldset {
			color: #dadce0 !important;
		}
		.theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
			> .v-input__control
			> .v-input__slot
			fieldset {
			color: #313131 !important;
		}
	}
</style>