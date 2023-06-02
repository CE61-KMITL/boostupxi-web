<script lang="ts">
	export let id: string, title: string, level: number, author: string, passCount: number;
</script>

<div class="w-[23rem] p-6 glass border border-gray-200 rounded-lg text-white cursor-pointer">
	<a href={`/question/${id}`}>
		{#each Array(level) as _, i}
			<div class="w-full flex justify-end">
				<svg
					aria-hidden="true"
					class="w-9 h-9 text-yellow-300"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
			</div>
		{/each}
		<a href={`/question/${id}`}>
			<h5 class="mb-2 text-3xl font-semibold tracking-tight">
				{title}
			</h5>
		</a>
		<div class="w-full flex justify-between my-2 mt-6">
			<p class="inline-flex items-center hover:underline">
				by {author}
			</p>
			<div class="flex px-4 py-2 text-center items-center bg-[#2AAC6E] rounded-xl mx-2 border">
				<span class="text-xl font-bold block tracking-wide mr-2"> {passCount} </span>
				<span class="text-base">Passed</span>
			</div>
		</div>
	</a>
</div>
