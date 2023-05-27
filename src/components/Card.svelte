<script lang="ts">
	export let title: string, description: string, level: number, author: string;
</script>

<div
	class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-gray-700 cursor-pointer"
>
	{#each Array(level) as _, i}
		<svg
			aria-hidden="true"
			class="w-5 h-5 text-yellow-300"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>First star</title>
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
			/>
		</svg>
	{/each}
	<a href="/">
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
			{title}
		</h5>
	</a>
	<p class="mb-3 font-normal text-gray-500">
		{description}
	</p>
	<p class="inline-flex items-center text-blue-600 hover:underline">
		{author}
	</p>
</div>
