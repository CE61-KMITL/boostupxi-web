<script lang="ts">
	export let score: number;
	export let rank: number;
	export let group: string;
</script>

<div>
	<div class="flex flex-col items-center mt-4 text-white w-full h-full mb-5">
		<div
			class="w-28 h-28 relative overflow-hidden lg:w-56 lg:h-56"
			class:lg:w-80={rank === 1}
			class:lg:h-80={rank === 1}
			class:w-44={rank === 1}
			class:h-44={rank === 1}
		>
			<div
				class="absolute left-1/2 transform -translate-x-1/2 bottom-2 lg:bottom-[1.7rem] font-medium z-10"
				class:lg:bottom-[2.7rem]={rank === 1}
				class:bottom-5={rank === 1}
			>
				<p
					class="text-white text-center bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
				>
					{rank}
				</p>
			</div>
			<img
				src={`/ceboostup-xi-logo.png`}
				alt="john-doe"
				class="absolute border-red border-4 p-1 rounded-full w-2/3 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<img
				src={`/paint-splash-01.svg`}
				class="absolute -z-10 h-full w-full"
				class:hidden={rank !== 1}
				alt="john-doe"
			/>
		</div>
		<h2 class="text-center md:text-lg text-xs">{group}</h2>
		<h1 class="text-center md:text-3xl text-2xl font-bold">{score}</h1>
	</div>
</div>
