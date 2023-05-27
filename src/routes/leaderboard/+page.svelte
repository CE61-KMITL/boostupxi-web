<script lang="ts">
	import { onMount } from 'svelte';
	import type { ILeaderboardData } from '../../interface/leaderboard';
	import { fetchLeaderboardData, leaderboardDataStore } from '../../store/leaderboard';

	let leaderboardData: ILeaderboardData[] = [];

	onMount(async () => {
		await fetchLeaderboardData();
	});

	$: {
		leaderboardData = $leaderboardDataStore;
	}
</script>

<div class="relative overflow-x-auto">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
