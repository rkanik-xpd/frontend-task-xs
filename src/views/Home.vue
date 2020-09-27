<template>
	<div class="home">
		<v-card class="user-list">
			<v-card-title class="pa-8">
				XpeedStudio User's List
				<v-spacer></v-spacer>
				<v-text-field
					v-model="filterKey"
					append-icon="mdi-magnify"
					label="Search user"
					dense
					single-line
					hide-details
					filled
					@keydown="tableLoading = true"
					@keyup="tableLoading = false"
					class="user-list__searchfield rounded-pill"
				></v-text-field>
				<v-btn to="/create" color="primary" class="rounded-pill ml-5">
					<v-icon left>mdi-plus-circle-outline</v-icon>
					CREATE
				</v-btn>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="px-8">
				<v-data-table
					:headers="headers"
					:items="users"
					:search="filterKey"
					:loading="tableLoading"
					class="user-list__table"
				>
					<template v-slot:body="props">
						<draggable
							:list="props.items"
							tag="tbody"
							v-bind="dragOptions"
						>
							<tr v-for="user in props.items" :key="user.id">
								<td>
									<v-icon class="drag-icon">mdi-drag</v-icon>
								</td>
								<td
									v-for="(key, keyIndex) of headerKeys"
									:key="keyIndex"
								>
									{{
										key === "created_at"
											? date(headerKeys[key])
											: user[key]
									}}
								</td>
								<td>
									<v-btn :to="`/update/${user.id}`" icon small>
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</td>
							</tr>
						</draggable>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import api from '../api/api'
import moment from 'moment'
export default {
	name: 'Home',
	data: () => ({
		filterKey: '',
		headers: [],
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
		date(date) {
			return moment(date).calendar()
		},
		async getList() {

			let { error, list, headers, message } = await api.getList()
			console.log(error, list, headers, message);

			if (error) {
				console.log(error, message);
				return error

			}

			// Save userlist to data
			this.users = list

			// Remove hidden fields
			headers = Object
				.entries(headers)
				.reduce((acc, [key, value]) => value.hidden ? acc : { ...acc, [key]: value }, {})

			// Modify headers for vuetify data table
			headers = Object.entries(headers).map(([key, value]) => {
				return {
					text: value.title,
					sortable: value.sortable,
					value: key,
					filterable: value.searchable
				}
			})

			// Save header keys came form api
			this.headerKeys = headers.map(h => h.value)

			// Concat headers between two additional column
			this.headers = [
				{
					text: 'Reorder',
					value: 'reorder',
					sortable: false
				},
				...headers,
				{
					text: 'Edit',
					value: 'edit',
					sortable: false
				},
			]

		}
	}
}
</script>

<style lang="scss">
	.user-list {
		&__searchfield {
			max-width: 300px !important;
		}
		&__table {
			thead tr {
				th:first-child,
				th:last-child {
					max-width: 48px;
				}
			}
			.drag-icon {
				cursor: grab;
			}
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