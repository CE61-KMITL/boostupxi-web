<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Editor from '../../../components/Editor.svelte';
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
	<section class="text-white body-font mt-5">
		<div class="container p-8 mx-auto glass-lightgray w-11/12 h-[40rem]">
			<div class="flex max-h-full">
				<Editor id={question._id} />
				<div class="w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 max-h-full overflow-auto scrollable">
					<div class="w-full flex justify-between">
						{#each Array(question?.level) as _, i}
							<svg
								aria-hidden="true"
								class="w-9 h-9 text-yellow-300"
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
						<h1 class="text-3xl title-font font-medium mb-1">{question?.title}</h1>
					</div>
					<div class="w-full flex justify-between">
						<h2 class="text-sm title-font tracking-widest">
							by {question?.author.username}
						</h2>
						<p class="leading-relaxed">
							{question?.description}
						</p>
					</div>
					<div class="flex mt-6 items-center mb-4">
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
					<h1>hint</h1>
					<button
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 mt-4"
						>Buy hint</button
					>
					<h1>description</h1>
					<div class="glass w-full p-2 my-2">
						<p class="leading-relaxed">
							{question?.description}
						</p>
					</div>
					<div class="text-white flex flex-col w-full">
						{#each question?.testcases ?? [] as testcases, index}
							{#if testcases.published}
								<h2>TestCase {index + 1}</h2>
								<div class="glass-gray flex w-full justify-evenly p-3 mt-1">
									<div class="w-1/2 flex flex-col mr-2">
										<p class="text-sm">
											Input {index + 1}
										</p>
										<code
											class="mt-1 h-20 overflow-auto whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100"
										>
											{testcases.input ? testcases.input : 'No Input'}
										</code>
									</div>
									<div class="w-1/2 flex flex-col">
										<p class="text-sm">
											Output {index + 1}
										</p>
										<code
											class={`mt-1 h-20 overflow-y-scroll whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100`}
										>
											{testcases.output ? testcases.output : 'No Output'}
										</code>
									</div>
								</div>
							{:else}
								<p class="text-sm">There is no testcases</p>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<Loading />
{/if}
