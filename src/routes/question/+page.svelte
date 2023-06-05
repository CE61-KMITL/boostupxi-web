<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$/components/Card.svelte';
	import Loading from '$/components/Loading.svelte';
	import Pagination from '$/components/Pagination.svelte';
	import type { IQuestionData } from '$/interface/question';
	import { fetchQuestionData, questionDataStore, questionPage } from '$/store/question';

	let questionData: IQuestionData[] = [];
	let page: number = 1;
	let totalPages: number = 0;

	const fetchQuestions = async () => {
		await fetchQuestionData(page);
	};
	onMount(fetchQuestions);
	$: {
		questionData = $questionDataStore;
		totalPages = $questionPage;
	}
</script>

<div class="w-full justify-center flex mb-10">
	<div class="my-5 grid md:grid-cols-2 xl:grid-cols-3 gap-10">
		{#if questionData.length > 0}
			{#each questionData as question}
				<Card
					id={question._id}
					title={question.title}
					level={question.level}
					author={question.author.username}
					userPass={question.passedByUser}
					userPassCount={question.userPassCount}
				/>
			{/each}
		{:else}
			<Loading />
		{/if}
	</div>
</div>

<Pagination page={1} {totalPages} fetchBy="question" />
