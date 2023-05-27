<script lang="ts">
	import { onMount } from 'svelte';
	import TopCard from '../../components/TopCard.svelte';
	import type { ILeaderboardData, ILeaderboardGroup } from '../../interface/leaderboard';
	import {
		fetchLeaderboardData,
		fetchLeaderboardGroupData,
		leaderboardDataStore,
		leaderboardGroupDataStore,
		leaderboardPage
	} from '../../store/leaderboard';

	let leaderboardData: ILeaderboardData[] = [];
	let leaderboardGroupData: ILeaderboardGroup[] = [];
	let page = 1;
	let totalPages = 0;

	const fetchLeaderboard = async () => {
		await fetchLeaderboardData(page);
	};

	const fetchLeaderboardGroup = async () => {
		await fetchLeaderboardGroupData();
	};

	onMount(fetchLeaderboard);
	onMount(fetchLeaderboardGroup);

	$: {
		leaderboardData = $leaderboardDataStore;
		totalPages = $leaderboardPage;
		leaderboardGroupData = $leaderboardGroupDataStore;
	}

	const goToPage = (newPage: number) => {
		page = newPage;
		fetchLeaderboard();
	};
</script>

<section class="relative mx-auto my-12 mb-20">
	<div class="px-5 lg:px-0">
		<div class="container mx-auto my-3 pb-20 grid grid-cols-3 gap-3">
			{#each [1, 0, 2] as i}
				{#each leaderboardGroupData.slice(0, 3) as item, index}
					{#if index === i}
						<TopCard score={item.score} rank={index + 1} group={item._id} />
					{/if}
				{/each}
			{/each}
		</div>

		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" class="px-6 py-3">Username</th>
						<th scope="col" class="px-6 py-3">Score</th>
						<th scope="col" class="px-6 py-3">Group</th>
					</tr>
				</thead>
				<tbody>
					{#each leaderboardData as item (item.username)}
						<tr>
							<td class="px-6 py-4">{item.username}</td>
							<td class="px-6 py-4">{item.score}</td>
							<td class="px-6 py-4">{item.group}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<nav class="flex justify-end container mx-auto">
			<ul class="inline-flex items-center -space-x-px">
				<li>
					<button
						class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
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
							class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							class:selected={index + 1 === page}
							class:text-blue-900={index + 1 === page}
							class:bg-blue-100={index + 1 === page}
							class:hover:bg-blue-100={index + 1 === page}
							class:hover:text-blue-700={index + 1 === page}
							on:click={() => goToPage(index + 1)}
						>
							{index + 1}
						</button>
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
	</div>
</section>
