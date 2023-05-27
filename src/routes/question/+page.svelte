<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import type { IQuestionData } from '../../interface/question';
	import { fetchQuestionData, questionDataStore } from '../../store/question';

	let questionData: IQuestionData[] = [];

	onMount(async () => {
		await fetchQuestionData();
	});

	$: {
		questionData = $questionDataStore;
	}
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
