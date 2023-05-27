<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import type { IQuestionData } from '../../interface/question';
	import { fetchQuestionData, questionDataStore, questionPage } from '../../store/question';

	let questionData: IQuestionData[] = [];
	let page = 1;
	let totalPages = 0;

	const fetchQuestions = async () => {
		await fetchQuestionData(page);
	};

	onMount(fetchQuestions);

	$: {
		questionData = $questionDataStore;
		totalPages = $questionPage;
	}

	const goToPage = (newPage: number) => {
		page = newPage;
		fetchQuestions();
	};
</script>

<div class="container mx-auto my-4 grid grid-cols-4 gap-4">
	{#each questionData as item}
		<Card
			title={item.title}
			description={item.description}
			level={item.level}
			author={item.author.username}
		/>
	{/each}
</div>

<nav class="flex justify-end container mx-auto">
	<ul class="inline-flex items-center -space-x-px">
		<li>
			<button
				class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
				<a
					href="/question"
					class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
					class:selected={index + 1 === page}
					class:text-blue-900={index + 1 === page}
					class:border-blue-300={index + 1 === page}
					class:bg-blue-50={index + 1 === page}
					class:hover:bg-blue-100={index + 1 === page}
					class:hover:text-blue-700={index + 1 === page}
					on:click={() => goToPage(index + 1)}
				>
					{index + 1}
				</a>
			</li>
		{/each}
		<li>
			<button
				class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
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
