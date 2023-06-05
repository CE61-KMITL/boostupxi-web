<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
	class="w-full h-[100vh] absolute top-0 backdrop-blur-sm anima duration-150"
	class:hidden={!showModal}
>
	<dialog
		class="fixed inset-0 z-10 overflow-y-auto bg-white rounded-md shadow-lg anima duration-150"
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
	>
		<div class="max-w-32em p-8">
			<div class="flex justify-end mb-5">
				<button on:click={() => dialog.close()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6 hover:text-gray-400 cursor-pointer"
					>
						<path
							fill-rule="evenodd"
							d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<slot />
		</div>
	</dialog>
</div>
