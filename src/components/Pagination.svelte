<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchQuestionData } from '../store/question';

	export let page: number;
	export let totalPages: number;

	const fetchQuestions = async () => {
		await fetchQuestionData(page);
	};

	onMount(fetchQuestions);

	const goToPage = (newPage: number) => {
		page = newPage;
		fetchQuestions();
	};
</script>

<div class="w-11/12 justify-end flex">
	<nav class="inline-flex justify-end mt-10 mb-20 bg-[#303030] rounded-xl">
		<ul class="inline-flex items-center -space-x-px">
			<li>
				<button
					class={`block px-3 py-2 ml-0 leading-tight ${
						page === 1 ? 'text-gray-500' : 'text-gray-800'
					} rounded-l-lg hover:bg-gray-100 hover:text-gray-700`}
					on:click={() => goToPage(page - 1)}
					disabled={page === 1}
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</li>
			{#each Array.from({ length: totalPages }) as _, index}
				<li>
					<button
						class={`px-3 py-2 leading-tight ${
							page === index + 1
								? 'bg-blue-500 text-white'
								: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
						} rounded-xl `}
						on:click={() => goToPage(index + 1)}
					>
						{index + 1}
					</button>
				</li>
			{/each}
			<li>
				<button
					class={`block px-3 py-2 leading-tight ${
						page === totalPages ? 'text-gray-500' : 'text-gray-800'
					} rounded-r-lg hover:bg-gray-100 hover:text-gray-700`}
					on:click={() => goToPage(page + 1)}
					disabled={page === totalPages}
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</li>
		</ul>
	</nav>
</div>
