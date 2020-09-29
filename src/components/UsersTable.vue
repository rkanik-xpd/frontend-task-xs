<template>
	<v-data-table
		:headers="headers"
		:items="items"
		:search="search"
		:loading="loading"
		class="users-table"
	>
		<template v-slot:body="props">
			<draggable
				@change="handleChange"
				:list="props.items"
				tag="tbody"
				animation="200"
			>
				<tr v-for="user in props.items" :key="user.id">
					<td>
						<v-icon class="users-table__drag-icon">mdi-drag</v-icon>
					</td>
					<td v-for="(key, keyIndex) of columnKeys" :key="keyIndex">
						{{ key === "created_at" ? date(columnKeys[key]) : user[key] }}
					</td>
					<td>
						<v-btn :to="{ name: 'Update', params: { id: user.id }}" icon small>
							<v-icon small>mdi-pencil</v-icon>
						</v-btn>
					</td>
				</tr>
			</draggable>
		</template>
	</v-data-table>
</template>

<script>
import moment from 'moment'
export default {
	name: 'UsersTable',
	props: {
		headers: Array,
		items: Array,
		search: String,
		loading: Boolean,
		columnKeys: Array
	},
	methods: {
		date(date) {
			return moment(date).calendar()
		},
		handleChange({ moved }) {
			if (moved) {
				let items = [...this.items]
				items.splice(moved.oldIndex, 1)
				items.splice(moved.newIndex, 0, moved.element)
				this.$emit('reorder', items)
			}
		}
	}
}
</script>

<style lang='scss'>
	.users-table {
		thead tr {
			th:first-child,
			th:last-child {
				max-width: 48px;
			}
		}
		&__drag-icon {
			cursor: grab;
		}
	}
</style>