<template>
  <div class="limiter">

		<div class="container-login100" style="background-image: url('./assets/bg-01.jpg');">
			<div class="wrap-login100 p-t-30 p-b-50">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'

const store = useAuthStore()

</script>

<style lang="scss">
    @import '../css/auth.css';
    @import '../css/util.css';
</style>