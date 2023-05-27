<script async script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';
	import Error from '../components/Error.svelte';
	import Loading from '../components/Loading.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { user } from '../store/user';

	let initialLoad = true;

	onMount(() => {
		initialLoad = false;
	});
</script>

{#if $user && (!$page.route || $page.route.id !== '/') && !initialLoad}
	<Navbar />
	<slot />
{:else if !$page.route || ($page.route.id === '/' && !initialLoad)}
	<slot />
{:else if initialLoad}
	<Loading />
{:else}
	<Error />
{/if}
