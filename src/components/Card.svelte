<script lang="ts">
	export let id: string,
		title: string,
		level: number,
		author: string,
		userPassCount: number,
		userPass: boolean;
</script>

<a class="group" href={`/question/${id}`}>
	<div
		class={`relative w-[23rem] p-6 bg-opacity-60 ring-1  ${
			userPass ? 'bg-green-600 ring-green-400' : 'glass'
		} rounded-2xl text-white cursor-pointer  ring-4 group-hover:shadow-xl group-hover:ring-white transition-all group-hover:bg-gray-800 group-hover:bg-opacity-60`}
	>
		{#if userPass}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="absolute w-8 h-8 -right-3 -top-3 z-20 text-white bg-[#2AAC6E] border border-green-300 rounded-full"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{/if}
		<div class="flex items-center flex-row justify-end">
			<div class="flex">
				{#each Array(level) as _, i}
					<div class="">
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
			</div>
		</div>
		<h5
			class="mb-2 group-hover:text-gray-50 text-2xl font-bold tracking-tight text-ellipsis whitespace-nowrap w-72 overflow-hidden"
			style="text-shadow: 2px 2px 4px gray;"
		>
			{title}
		</h5>
		<div class="w-full flex justify-between mt-6">
			<p class="inline-flex items-center group-hover:text-gray-200 text-sm tracking-widest">
				by {author}
			</p>
			<div class="flex px-3 py-1 text-center items-center bg-green-400 bg-opacity-90 rounded-xl border">
				<span class="text-xl font-bold block tracking-wide mr-2"> {userPassCount} </span>
				<span class="text-base">Passed</span>
			</div>
		</div>
	</div>
</a>
