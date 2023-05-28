<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Loading from '../../../components/Loading.svelte';
	import type { IQuestionData } from '../../../interface/question';
	import { questionService } from '../../../services/question.services';

	let question: IQuestionData;
	const id: string = $page.params.id;

	onMount(async () => {
		question = await questionService.getQuestionById(id);
	});
</script>

{#if question?.title}
	<section class="text-gray-700 body-font overflow-hidden bg-white">
		<div class="container px-5 py-24 mx-auto">
			<div class="lg:w-4/5 mx-auto flex flex-wrap">
				<div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
					<h2 class="text-sm title-font text-gray-500 tracking-widest">
						{question?.author.username}
					</h2>
					<h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{question?.title}</h1>
					<div class="flex mb-4">
						<span class="flex items-center">
							{#each Array(question?.level) as _, i}
								<svg
									fill="currentColor"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
							{/each}
						</span>
					</div>
					<p class="leading-relaxed">
						{question?.description}
					</p>
					<div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
						<div class="flex">
							<span class="mr-3">Tags</span>
							{#each question?.tags ?? [] as tag}
								<span
									class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded-full"
								>
									{tag}
								</span>
							{/each}
						</div>
						<div class="flex ml-6 items-center">
							<span class="mr-3">File</span>
							<div class="relative">
								{#if question?.files.length > 0}
									{#each question?.files as file}
										<a href={file.url} class="text-indigo-500" download>
											{file.url}
										</a>
									{/each}
								{:else}
									<p>There is no file</p>
								{/if}
							</div>
						</div>
					</div>
					<div class="grid w-full grid-cols-2 gap-2 px-2 py-4 pb-6 border-b-2 border-gray-200 mb-6">
						{#each question?.testcases ?? [] as testcases, index}
							{#if testcases.published}
								<div
									class="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none"
								>
									<p class="text-sm text-gray-600">
										Task Input {index + 1}
									</p>
									<code
										class={`mt-2 h-20 overflow-auto whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100`}
									>
										{testcases.input ? testcases.input : 'No Input'}
									</code>
								</div>
								<div
									class="shadow-3xl shadow-shadow-500 !bg-navy-700 flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-none"
								>
									<p class="text-sm text-gray-600">
										Task Output {index + 1}
									</p>
									<code
										class={`mt-2 h-20 overflow-y-scroll whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100`}
									>
										{testcases.output ? testcases.output : 'No Output'}
									</code>
								</div>
							{:else}
								<p class="text-sm text-gray-600">There is no testcases</p>
							{/if}
						{/each}
					</div>
				</div>
				<img
					alt="text-editor"
					class="w-full object-cover object-center rounded border border-gray-200"
					src="https://user-images.githubusercontent.com/3920290/81471642-6c165880-91ea-11ea-8cd1-fae7ae8f0bc4.png"
				/>
			</div>
		</div>
	</section>
{:else}
	<Loading />
{/if}
