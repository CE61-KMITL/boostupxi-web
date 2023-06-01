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
		console.log(leaderboardData);
	};

	const fetchLeaderboardGroup = async () => {
		await fetchLeaderboardGroupData();
		console.log(leaderboardGroupData);
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
	<section class="mx-auto mb-20">
		<div class="px-0 md:px-5 flex flex-col items-center">
			<div class="pb-5 grid grid-cols-3 items-center w-full lg:w-auto">
				{#each [1, 0, 2] as i}
					{#each leaderboardGroupData.slice(0, 3) as item, index}
						{#if index === i}
							<TopCard score={item.score} rank={index + 1} group={item._id} />
						{/if}
					{/each}
				{/each}
			</div>
			<div class="overflow-auto w-full lg:w-2/3">
				<!-- Your current rank -->
				<div
					class="py-4 px-1 bg-gray-800 justify-around flex text-white text-xs md:text-lg rounded-2xl m-4 glass-gray"
				>
					<p class="w-4 md:w-8 text-center">23</p>
					<p class="w-32 md:w-72">Your currently Rank</p>
					<p class="w-28 md:w-56">อโคจร</p>
					<p class="w-10 md:w-20 text-center">20</p>
				</div>
				{#each leaderboardData as item, index (item.username)}
					<div
						class="py-4 px-1 bg-gray-800 justify-around flex text-white text-xs md:text-lg rounded-2xl m-4"
					>
						<p class="w-4 md:w-8 text-center">{index + 1}</p>
						<p class="w-32 md:w-72">{item.username}</p>
						<p class="w-28 md:w-56">{item.group}</p>
						<p class="w-10 md:w-20 text-center">{item.score}</p>
					</div>
				{/each}
			</div>
			<!-- Pagination -->
			<Pagination page={1} {totalPages} />
		</div>
	</section>
{:else}
	<Loading />
{/if}
