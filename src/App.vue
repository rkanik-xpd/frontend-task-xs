<template>
	<v-app>
		<AppBar>
			<template v-slot:logo>
				<BrandLogo />
			</template>
			<template v-slot:actions>
				<SwitchTheme @change="handleChangeTheme" />
			</template>
		</AppBar>

		<RouterWrapper>
			<router-view />
		</RouterWrapper>
		<Notification />
	</v-app>
</template>

<script>
import AppBar from "@/components/Appbar";
import BrandLogo from "@/components/BrandLogo";
import SwitchTheme from "@/components/SwitchTheme";
import RouterWrapper from "@/components/RouterWrapper";
import Notification from "@/components/Notification";
export default {
	name: "App",
	components: {
		AppBar,
		BrandLogo,
		SwitchTheme,
		RouterWrapper,
		Notification
	},
	data: () => ({
		THEME_KEY: "ft-xs-dark-theme",
	}),
	created() {
		this.syncTheme();
	},
	methods: {
		syncTheme() {
			let theme = localStorage.getItem(this.THEME_KEY);
			this.changeTheme(theme && theme === "true" ? true : false);
		},
		handleChangeTheme() {
			this.changeTheme(!this.$vuetify.theme.dark);
		},
		changeTheme(theme) {
			console.log("changeTheme");
			this.$vuetify.theme.dark = theme;
			localStorage.setItem(this.THEME_KEY, theme);
		},
	},
};
</script>