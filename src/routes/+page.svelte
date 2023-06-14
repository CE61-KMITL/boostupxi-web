<script lang="ts">
	import toast from 'svelte-french-toast';
	import { userService } from '$/services/user.services';

	let email: string = '';
	let password: string = '';

	$: submit = async () => {
		try {
			toast
				.promise(userService.login(email, password), {
					loading: 'Loading...',
					success: 'Login Success!',
					error: 'Login Failed!'
				})
				.then(() => {
					const sound = document.getElementById('success-sound') as HTMLAudioElement;
					sound.play();
				});
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	};

	let a = 0;
	function mouseHover(): boolean {
		const tick = document.getElementById('check') as HTMLInputElement;

		if (tick.checked === false && a === 0) {
			buttonMoveLeft();
			a = 1;
			return false;
		}
		if (tick.checked === false && a === 1) {
			buttonMoveRight();
			a = 2;
			return false;
		}
		if (tick.checked === false && a === 2) {
			buttonMoveLeft();
			a = 1;
			return false;
		}
		return true;
	}

	function buttonMoveLeft(): void {
		const button: HTMLElement | null = document.getElementById('login-b');
		if (button) {
			button.style.transform = 'translateX(160%)';
		}
	}

	function buttonMoveRight(): void {
		const button: HTMLElement | null = document.getElementById('login-b');
		if (button) {
			button.style.transform = 'translateX(0%)';
		}
	}

	function resetBtn(): void {
		const button: HTMLElement | null = document.getElementById('login-b');
		if (button) {
			button.style.transform = 'translateX(0%)';
		}
	}
</script>

<section class="gradient-animation text-white">
	<audio src="/Success.mp3" id="success-sound" />
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
		<div class="w-full glass md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">CE BOOSTUP XI</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={submit}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium">Email</label>
						<div class="flex">
							<div
								class="w-10 z-10 pl-2 text-center pointer-events-none flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-gray-400"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
							</div>
							<input
								type="email"
								name="email"
								class="w-full -ml-10 pl-12 pr-3 py-2 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-[#ff8686]"
								bind:value={email}
								placeholder="name@kmitl.ac.th"
								required
							/>
						</div>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium">Password</label>
						<div class="flex">
							<div
								class="w-10 z-10 pl-2 text-center pointer-events-none flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-gray-400"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							</div>
							<input
								type="password"
								class="w-full -ml-10 pl-12 text-gray-500 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#ff8686]"
								placeholder="••••••••"
								bind:value={password}
								required
							/>
						</div>
					</div>
					<div class="flex">
						<input type="checkbox" name="check01" id="check" on:change={resetBtn} class="mr-2" />
						<p>ห้ามกดนะจ๊ะ</p>
					</div>
					<div class="flex w-full">
						<button
							type="submit"
							class="w-36 text-gray-600 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							id="login-b"
							on:focus={mouseHover}
							on:mouseover={mouseHover}>Sign in</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
