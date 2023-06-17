<script lang="ts">
	import Modal from '$/components/Modal.svelte';
	import { initialUser } from '$/constants/user.constants';
	import type { IUser } from '$/interface/user';
	import { userService } from '$/services/user.services';
	import { updateUserProfile, user } from '$/store/user';
	import { generateRankSuffix } from '$/utils/generateRankSuffix';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { subscribe } from 'svelte/internal';

	let showModal: boolean = false;
	let loading: boolean = false;
	let id: string = $user._id;
	let username: string = $user.username;
	let email: string = $user.email;
	let password: string;
	let confirmPassword: string;

	let userData: IUser = initialUser;
	const handleUpdateProfile = async () => {
		loading = true;
		if (password !== confirmPassword) {
			toast.error('Password and confirm password not match');
			loading = false;
		} else {
			const response = await userService.editUserProfile(id, username, password);
			try {
				if (response.statusCode === 200) {
					toast.success('Update profile successfully');
					loading = false;
					setTimeout(() => {
						window.location.href = '/question';
					}, 800);
				}
			} catch (error) {
				toast.error('Update profile failed');
				loading = false;
			}
		}
	};

	subscribe(user, (value: IUser) => {
		userData = value;
	});

	onMount(updateUserProfile);
</script>

<div>
	<div class="relative mt-36 text-white">
		<img
			class="absolute h-32 w-32 rounded-full border-4 left-1/2 -translate-x-1/2 -top-16 z-10 user-profile"
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c93uXMHa1QaeW9g4bvGhYtN92-dtsa_4KiTWomiooQ&s"
			alt="user profile"
		/>
		<div class="w-fit p-4 mx-auto glass user-content">
			<div class="absolute right-7 top-2 cursor-pointer">
				<button on:click={() => (showModal = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 hover:text-gray-400"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</button>
			</div>

			<div class="text-center mt-20">
				<div class="py-2">
					<h3 class="font-bold text-2xl mb-1">{$user.username}</h3>
					<div class="inline-flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 mr-3"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>
						{$user.email}
					</div>
					<span class="text-xl font-bold block tracking-wide"
						>{$user.group !== '' ? $user.group : 'Staff'}</span
					>
				</div>
			</div>

			<div class="flex justify-center mt-4 space-x-4">
				<div class="flex px-4 py-2 text-center items-center bg-[#4E4E4E] rounded-xl">
					<span class="text-base">Rank</span>
					<span class="text-xl font-bold block tracking-wide ml-2">
						{generateRankSuffix($user.rank)}
					</span>
				</div>
				<div class="flex px-4 py-2 text-center items-center bg-[#DCC70A] rounded-xl">
					<span class="text-base mr-2">Scores</span>
					<span class="text-xl font-bold block tracking-wide">
						{$user.score}
					</span>
				</div>
				<div class="flex px-4 py-2 text-center items-center bg-[#2AAC6E] rounded-xl">
					<span class="text-xl font-bold block tracking-wide mr-2">
						{$user.completedQuestionsCount}
					</span>
					<span class="text-base">Passed</span>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal bind:showModal>
	<form class="w-full max-w-3xl" on:submit|preventDefault={handleUpdateProfile}>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="username"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					bind:value={username}
					required
				/>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					Email
				</label>
				<input
					type="email"
					name="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 cursor-not-allowed select-none"
					bind:value={email}
					disabled
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="password"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					bind:value={password}
				/>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="confirm-password"
				>
					Confirm Password
				</label>
				<input
					type="password"
					name="confirm-password"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					bind:value={confirmPassword}
				/>
			</div>
		</div>
		<div class="w-full h-[4rem]">
			<button type="submit" class="w-full text-white rgb-button mt-5" disabled={loading}>
				{#if loading}
					<svg
						aria-hidden="true"
						class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
				{:else}
					Edit Profile
				{/if}
			</button>
		</div>
	</form>
</Modal>
