<template>
	<div class="home">
		<v-card class="user-list">
			<v-card-title class="pa-8">
				XpeedStudio User's List
				<v-spacer></v-spacer>
				<v-text-field
					dense
					filled
					single-line
					hide-details
					label="Search user"
					append-icon="mdi-magnify"
					v-if="users.length"
					v-model="filterKey"
					@keydown="tableLoading = true"
					@keyup="tableLoading = false"
					class="user-list__searchfield rounded-pill"
				></v-text-field>
				<v-btn :to="{ name: 'Create' }" color="primary" class="rounded-pill ml-5">
					<v-icon left>mdi-plus-circle-outline</v-icon>
					CREATE
				</v-btn>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="px-8">
				<UsersTable
					v-if="users.length"
					:headers="headers"
					:items="users"
					:search="filterKey"
					:loading="tableLoading"
					:columnKeys="headerKeys"
					@reorder="handleReorder"
					class="user-list__table"
				/>
				<div class="pa-8" v-else>
					<h3 class="body-1 text-center">No Data Found!</h3>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import moment from 'moment'
import api from '../api/api'
import { sleep } from '@/helpers/helpers'
import UsersTable from '@/components/UsersTable'
export default {
	name: 'Home',
	components: {
		UsersTable
	},
	data: () => ({
		filterKey: '',
		headers: [
			{
				text: 'Reorder',
				value: 'reorder',
				sortable: false
			},
			{
				text: 'Edit',
				value: 'edit',
				sortable: false
			}
		],
		users: [],
		headerKeys: [],
		tableLoading: false
	}),
	created() {
		this.getList()

	},
	computed: {
		dragOptions() {
			return {
				animation: 200
			};
		}
	},
	methods: {

		date: date => moment(date).calendar(),

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

		async handleReorder(users) {
			this.users = users
			let { status, messages } = await api.reorder(users)

			// Show notifications
			this.notify(messages, status)

		},

		async getList() {

			let { status, messages, data } = await api.getList()

			if (status === 'error') return this.notify(messages, 'error')

			// Show notifications
			let oStatus = { success: 'success', false: 'warning', }
			this.notify(messages, oStatus[status])

			// Save userlist to data
			this.users = data.rows

			let headers = data.headers[0]

			// Remove hidden fields
			headers = Object
				.entries(headers)
				.reduce((acc, [key, value]) => value.hidden ? acc : { ...acc, [key]: value }, {})

			// Modify headers for vuetify data table
			headers = Object.entries(headers).map(([key, value]) => {
				return {
					value: key,
					text: value.title,
					sortable: value.sortable,
					filterable: value.searchable
				}
			})

			// Save header keys came form api
			this.headerKeys = headers.map(h => h.value)

			// Concat headers between two additional column
			this.headers.splice(1, 0, ...headers)

		}
	}
}
</script>

<style lang="scss">
	.user-list {
		&__searchfield {
			max-width: 300px !important;
		}
		.v-text-field > .v-input__control {
			& > .v-input__slot {
				padding: 0 24px !important;
				&:before,
				&:after {
					border: none;
				}
			}
		}
	}
</style>