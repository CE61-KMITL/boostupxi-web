<script async script lang="ts">
	import Error from '$/components/Error.svelte';
	import Loading from '$/components/Loading.svelte';
	import Navbar from '$/components/Navbar.svelte';
	import { user } from '$/store/user';
	import '$/styles/app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	let initialLoad: boolean = true;
	let showBanner: boolean = true;

	const loading = (): void => {
		initialLoad = false;
	};

	const closeฺBanner = (): void => {
		showBanner = false;
	};

	onMount(loading);
</script>

<Toaster />
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
