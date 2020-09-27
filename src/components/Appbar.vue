<template>
	<v-container>
		<v-toolbar color="appbar" class="elevation-1 rounded">
			<div class="d-flex align-center">
				<router-link to="/">
					<slot name="logo"></slot>
				</router-link>
			</div>
			<v-spacer></v-spacer>
			<slot name="actions"></slot>
		</v-toolbar>
	</v-container>
</template>