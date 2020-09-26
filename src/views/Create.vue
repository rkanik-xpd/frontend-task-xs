<template>
	<div class="create">
		<UserForm
			:fields="formfields"
			@save="handleSave"
			@add-repeater="handleAddRepeater"
		/>
	</div>
</template>

<script>
import api from '../api/api'
import UserForm from '@/components/UserForm'
export default {
	name: 'Create',
	components: {
		UserForm
	},
	data: () => ({
		formfields: []
	}),
	created() {
		this.getForm()
	},
	methods: {
		handleAddRepeater(index) {
			let keys = Object.keys(this.formfields[index].repeater_fields)
			this.formfields[index].value.push(keys.reduce((a, b) => ({ ...a, [b]: '' }), {}))
		},
		async getForm() {
			let { error, form, message } = await api.getForm()
			if (error) {
				return console.log("ERROR:", message);
			}

			console.log(form);

			this.formfields = Object.entries(form).map(([key, value]) => ({ key, ...value }))

			this.formfields.forEach((field, index) => {
				if (field.type === 'repeater') {
					this.handleAddRepeater(index)
				}
				else if (field.type === 'select') {
					field.value = field.default
				}
			})
		},
		handleSave(user) {
			console.log('handleSave', user);
		}
	}
}
</script>

<style lang='scss' scoped>
	.create {
	}
</style>