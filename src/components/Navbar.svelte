<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { IUser } from '../interface/user';
	import { userService } from '../services/user.services';
	import { user } from '../store/user';

	let showMenu: boolean = false;

	const toggleNavbar = () => {
		showMenu = !showMenu;
	};
	const logout = async () => {
		try {
			toast.promise(userService.logout(), {
				loading: 'Loading...',
				success: 'Logout Success!',
				error: 'Logout Failed!'
			});
		} catch (error) {
			return error;
		}
	};
</script>

<div>
	<div>
		<nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center text-white">
			<div class="flex items-center justify-between">
				<a
					class="text-xl font-bold md:text-3xl"
					style="text-shadow: 2px 2px 1px black;"
					href="/question"
					>CE BoostUp-XI Grader
				</a>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={toggleNavbar} class="flex md:hidden">
					<button type="button" class=" hover:text-gray-400 focus:outline-none focus:text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div
				class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 text-lg {showMenu
					? 'flex'
					: 'hidden'}"
			>
				<a class="hover:text-blue-400" href="/question">Home</a>
				{#if !$user}
					<a class=" hover:text-blue-400" href="/login">Login</a>
				{/if}
				{#if $user}
					<a class="hover:text-blue-400" href="/leaderboard">Leaderboard</a>
					<a class="hover:text-blue-400" href="/guide">Guide</a>
					<a class="hover:text-blue-400" href="/profile">Profile</a>
					<a class="hover:text-blue-400" href="/profile">Score : {$user.score}</a>
					<button class="hover:text-blue-400" on:click={logout}>Logout</button>
				{/if}
			</div>
		</nav>
	</div>
</div>
