<script>
import api from "@/api/api";
import { sleep } from '@/helpers/helpers'
import UserForm from "@/components/UserForm";
export default {
	name: "UserCreateUpdate",
	components: {
		UserForm,
	},
	data: () => ({
		formfields: [],
		loading: false
	}),
	created() {
		this.getForm(this.$route.params.id);
	},
	methods: {
		async notify(msgs, type = 'success') {
			for (let msg of msgs) {
				this.$notify({
					type,
					title: msg,
					group: 'toast'
				});
				await sleep(300)
			}
		},
		handleDelRepeater([filed, valueIndex]) {
			this.formfields[filed].value.splice(valueIndex, 1);
		},
		handleAddRepeater(index) {
			let keys = Object.keys(this.formfields[index].repeater_fields);
			this.formfields[index].value.push(
				keys.reduce((a, b) => ({ ...a, [b]: "" }), {})
			);
		},
		async getForm(id) {
			this.loading = true
			let { status, messages, data } = await api.getForm(id);

			if (status === 'error') return this.notify(messages, status)

			// Show notifications
			this.notify(messages, status)

			let form = data.fields[0]

			this.formfields = Object.entries(form).map(([key, value]) => ({
				key,
				...value,
			}));

			this.formfields.forEach((field, index) => {
				if (field.type === "repeater" && field.value.length === 0) {
					this.handleAddRepeater(index);
				} else if (["radio", "select"].includes(field.type)) {
					field.value = field.default;
				}
			});
			this.loading = false
		},
		async handleCreateUser(user) {
			// Submit form and get response
			let { status, messages } = await api.createUser(user);
			//await sleep(450)
			if (status === 'error') return this.notify(messages, status)
			// Show notifications
			this.notify(messages, status)
			return status === 'success'
		},
		async handleUpdateUser(user) {
			// Submit form and get response
			let { status, messages } = await api.updateUser(user);
			//await sleep(450)
			if (status === 'error') return this.notify(messages, status)
			// Show notifications
			this.notify(messages, status)
			return status === 'success'
		},
	},
};
</script>
