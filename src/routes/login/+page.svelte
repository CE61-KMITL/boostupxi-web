<script lang="ts">
	import { loginService } from '../../services/user.services';

	let email: string = '';
	let password: string = '';

	$: submit = async () => {
		try {
			await loginService(email, password);
		} catch (error) {
			return error;
		}
	};
</script>

<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={submit}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
							>Your email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							bind:value={email}
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="name@gmail.com"
							required
						/>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
							>Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							bind:value={password}
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
