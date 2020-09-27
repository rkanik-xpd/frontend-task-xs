<template>
	<notifications group="toast" position="bottom right">
		<template slot="body" slot-scope="props">
			<div class="toast" :class="classes(props.item)" :style="styles">
				<h3 class="toast__title body-2">{{ props.item.title }}</h3>
				<v-btn icon small class="toast__close" @click="props.close">
					<v-icon small>mdi-close</v-icon>
				</v-btn>
			</div>
		</template>
	</notifications>
</template>

<script>
export default {
	name: 'Notification',
	methods: {
		classes: ({ type }) => ({ [type]: true })
	},
	computed: {
		styles: () => ({
			borderLeft: '6px solid rgba(0, 0, 0, 0.2) !important'
		})
	}
}
</script>
<style lang="scss">
	.toast {
		justify-content: space-between;
		align-items: center;
		position: relative;
		display: flex;
		padding: 1rem;
		border-radius: 0.25rem;
		margin: 0 0.5rem 0.5rem 0;
		color: white;
		&__title {
			text-transform: capitalize;
		}
		&__close {
			color: rgba(white, 0.65) !important;
			margin-left: 1rem;
		}
	}
</style>