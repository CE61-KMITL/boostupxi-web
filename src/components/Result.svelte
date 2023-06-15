<script lang="ts">
	import { submissionResultStore } from '$/store/submission';
	import Modal from './Modal.svelte';
	let showModal: boolean = false;
</script>

<button on:click={() => (showModal = true)} class="cursor-pointer">
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
			d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
		/>
	</svg>
</button>

<Modal bind:showModal>
	<div class="flex items-start justify-between border-b rounded-t py-2">
		<h3 class="text-xl font-semibold text-gray-900">Grader Result</h3>
	</div>
	<div class="text-base py-2 leading-relaxed text-gray-500 dark:text-gray-400">
		<ul>
			{#each $submissionResultStore as result}
				<li>{result}</li>
			{/each}
		</ul>
	</div>
</Modal>
