<script lang="ts">
	import { user } from '../store/user';
	import { logoutService } from '../services/user.services';

	let showMenu: boolean = false;

	const toggleNavbar = () => {
		showMenu = !showMenu;
	};

	const logout = async () => {
		try {
			await logoutService();
		} catch (error) {
			return error;
		}
	};
</script>

<div>
	<div>
		<nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
			<div class="flex items-center justify-between">
				<a class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400" href="/"
					>CE BoostUp-XI Grader
				</a>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={toggleNavbar} class="flex md:hidden">
					<button
						type="button"
						class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
					>
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
				class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
					? 'flex'
					: 'hidden'}"
			>
				<a class="text-gray-800 hover:text-blue-400" href="/">Home</a>
				<a class="text-gray-800 hover:text-blue-400" href="/">About Us</a>
				{#if !$user}
					<a class="text-gray-800 hover:text-blue-400" href="/login">Login</a>
				{/if}
				{#if $user}
					<a class="text-gray-800 hover:text-blue-400" href="/">{$user.username}</a>
					<button class="text-gray-800 hover:text-blue-400" on:click={logout}>Logout</button>
				{/if}
			</div>
		</nav>
	</div>
</div>
