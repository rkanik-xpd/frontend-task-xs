<template>
	<v-app>
		<v-app-bar app flat class="ma-3 elevation-2 rounded">
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Name"
					class="shrink"
					contain
					src="https://xpeedstudio.com/wp-content/uploads/2019/06/xpeedstudio_logo_header.png"
					height="48"
					width="128"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-btn @click="handleChangeTheme" icon>
				<v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
				<v-icon v-else>mdi-weather-night</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<perfect-scrollbar class="main-scrollbar">
				<v-container>
					<router-view></router-view>
				</v-container>
			</perfect-scrollbar>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	components: {},
	data: () => ({
		THEME_KEY: 'ft-xs-dark-theme'
	}),
	created() {
		this.syncTheme()
	},
	methods: {
		syncTheme() {
			let theme = localStorage.getItem(this.THEME_KEY)
			this.changeTheme((theme && theme === 'true') ? true : false)
		},
		handleChangeTheme() {
			this.changeTheme(!this.$vuetify.theme.dark)
		},
		changeTheme(theme) {
			console.log('changeTheme');
			this.$vuetify.theme.dark = theme
			localStorage.setItem(this.THEME_KEY, theme)
		}
	}
};
</script>
<style lang="scss">
	.main-scrollbar {
		height: calc(100vh - 76px);
		padding: 2rem;
	}
</style>