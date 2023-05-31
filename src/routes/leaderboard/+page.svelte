<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from '../../components/Loading.svelte';
	import Pagination from '../../components/Pagination.svelte';
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
</script>

{#if leaderboardData.length > 0}
	<section class="relative mx-auto my-12 mb-20">
		<div class="px-5 lg:px-0">
			<div
				class="container mx-auto my-4 pb-20 grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-3"
			>
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
			<!-- Pagination -->
			<Pagination page={1} {totalPages} />
		</div>
	</section>
{:else}
	<Loading />
{/if}
