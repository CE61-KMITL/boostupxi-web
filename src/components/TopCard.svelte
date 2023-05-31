<script lang="ts">
	export let score: number;
	export let rank: number;
	export let group: string;
</script>

<div class="block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
	<div class="m-auto w-full flex justify-center align-center flex-col bg-blue-600 rounded-[6px]">
		<h2 class="mt-2.5 mb-0 mx-auto text-4xl font-medium text-white text-center tracking-[0.8px]">
			{score}
		</h2>
		<p
			class="-mt-[2px] mb-2.5 mx-auto text-lg font-medium font-mainfont text-white text-center tracking-[0.8px]"
		>
			Points
		</p>
		<span
			class="-mt-[2px] mb-2.5 mx-auto px-5 py-1 text-xl font-medium text-black bg-white text-center tracking-[0.2px] rounded-[4px]"
		>
			Rank: {rank}
		</span>
	</div>

	<div class="flex flex-col items-center mt-4">
		<div class="w-24 h-24 relative rounded-full overflow-hidden shadow lg:w-20 lg:h-20">
			<img src={`/ceboostup-xi-logo.png`} alt="john-doe" class="w-full h-full user_image" />
		</div>
		<h1
			class="my-2 mx-auto text-2xl font-medium font-codefont text-darkblack text-center tracking-[0.2px]"
		>
			{group}
		</h1>
	</div>
</div>
