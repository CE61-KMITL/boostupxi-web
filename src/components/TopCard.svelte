<script lang="ts">
	export let score: number;
	export let rank: number;
	export let group: string;
</script>

<div>
	<div class="flex flex-col items-center mt-4 text-white w-full h-full mb-5">
		<div
			class={`${
				rank === 1 ? 'w-44 h-44 lg:w-80 lg:h-80' : 'w-28 h-28 lg:w-56 lg:h-56'
			} relative overflow-hidden`}
		>
			<div
				class={`absolute left-1/2 transform -translate-x-1/2 ${
					rank === 1 ? 'lg:bottom-[2.7rem] bottom-5' : 'bottom-2 lg:bottom-[1.7rem]'
				} font-medium z-10`}
			>
				<p
					class="text-white text-center bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
				>
					{rank}
				</p>
			</div>
			<img
				src={group === 'ระฆังทอง'
					? `/home/goldbell.png`
					: group === 'ประถมบรรเทิงศิลป์'
					? `/home/pratom.png`
					: group === 'โปงลางสะออน'
					? `/home/ponglang.png`
					: group === 'เพชรสยาม'
					? `/home/diamond.png`
					: group === 'คณะระเบียบวาทะศิลป์'
					? `/home/rabibe.png`
					: `/home/newbro.png`}
				alt="group"
				class="absolute border-red border-4 p-1 rounded-full w-2/3 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<img
				src={`/paint-splash-01.svg`}
				class={`${rank !== 1 && 'hidden'} absolute -z-10 h-full w-full`}
				alt="paing-splash"
			/>
		</div>
		<h2 class="text-center md:text-lg text-xs">{group}</h2>
		<h1 class="text-center md:text-3xl text-2xl font-bold">{score}</h1>
	</div>
</div>
