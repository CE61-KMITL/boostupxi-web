<script lang="ts">
	import Banner from '$/components/Banner.svelte';
	import Loading from '$/components/Loading.svelte';
	import Pagination from '$/components/Pagination.svelte';
	import TopCard from '$/components/TopCard.svelte';
	import type { ILeaderboardData, ILeaderboardGroup } from '$/interface/leaderboard';
	import {
		fetchLeaderboardData,
		fetchLeaderboardGroupData,
		leaderboardDataStore,
		leaderboardGroupDataStore,
		leaderboardPage
	} from '$/store/leaderboard';
	import { user } from '$/store/user';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

	let leaderboardData: ILeaderboardData[] = [];
	let leaderboardGroupData: ILeaderboardGroup[] = [];
	let leaderboardNumberPage: string | undefined = Cookies.get('leaderboardNumberPage');

	let page: number = Number(leaderboardNumberPage);
	let totalPages: number = 0;

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
				<div
					class="flip px-1 py-4 bg-gray-800 justify-around flex text-white text-xs md:text-lg rounded-2xl glass-gray m-4"
				>
					<p class="w-4 md:w-8 text-center">{$user.rank}</p>
					<p class="w-32 md:w-72">Your currently Rank</p>
					<p class="w-28 md:w-56">{$user.group}</p>
					<p class="w-10 md:w-20 text-center">{$user.score}</p>
				</div>
				{#each leaderboardData as board, index (board.username)}
					<div
						class="flip py-4 px-1 bg-gray-800 justify-around flex text-white text-xs md:text-lg rounded-2xl m-4"
						style={`--i:${index + 1}`}
					>
						<p class="w-4 md:w-8 text-center">{board.rank}</p>
						<p class="w-32 md:w-72">{board.username}</p>
						<p class="w-28 md:w-56">{board.group}</p>
						<p class="w-10 md:w-20 text-center">{board.score}</p>
					</div>
				{/each}
			</div>
			<Pagination {page} {totalPages} fetchBy="leaderboard" />
		</div>
	</section>
{:else}
	<Loading />
{/if}
