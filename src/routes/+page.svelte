<script lang="ts">
	import { userService } from '../services/user.services';

	let email: string = '';
	let password: string = '';

	$: submit = async () => {
		try {
			await userService.login(email, password);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<section class="gradient-animation text-white">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<div class="w-full glass md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">CE BOOSTUP XI</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={submit}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium">Your email</label>
						<input
							type="email"
							name="email"
							id="email"
							bind:value={email}
							class="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="name@gmail.com"
							required
						/>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							bind:value={password}
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full text-gray-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
