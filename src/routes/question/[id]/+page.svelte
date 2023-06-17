<script lang="ts">
	import Editor from '$/components/Editor.svelte';
	import Loading from '$/components/Loading.svelte';
	import { initialSubmissionData } from '$/constants/submission.constants';
	import type { IQuestionData } from '$/interface/question';
	import type { ISubmissionsResult } from '$/interface/submission';
	import { questionService } from '$/services/question.services';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let question: IQuestionData;
	const id: string = $page.params.id;
	let result: ISubmissionsResult = initialSubmissionData;

	const fetchQuestionById = async (): Promise<void> => {
		question = await questionService.getQuestionById(id);
	};

	const getSubmissionResult = async (): Promise<void> => {
		result = await questionService.getSubmission(id);
	};

	const buyingHint = async (e: Event) => {
		e.preventDefault();
		const response = await questionService.buyingHint(id);
		if (response.status === 200) {
			toast
				.promise(Promise.resolve(), {
					loading: 'Loading...',
					success: 'Buy hint',
					error: 'Not enough score!'
				})
				.then(() => {
					const sound = document.getElementById('success-sound') as HTMLAudioElement;
					sound.play();
				});

			question = await questionService.getQuestionById(id);
		} else {
			toast.error('Not Enough Score');
		}
	};

	onMount(fetchQuestionById);
	onMount(getSubmissionResult);
</script>

{#if question?.title}
	<section class="text-white px-4">
		<audio src="/Success.mp3" id="pass-sound" />
		<audio src="/Success.mp3" id="success-sound" />
		<div class="container mx-auto glass-lightgray p-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
				<div class="overflow-auto lg:max-h-[44em] scrollable lg:pr-4">
					<div class="space-y-4 mt-8">
						<div class="flex flex-wrap justify-between items-center">
							<h1 class=" leading-[80px] text-3xl font-bold overflow-hidden">
								{question?.title}
							</h1>
							<div class="flex">
								{#each Array(question?.level) as _, i}
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
								{/each}
							</div>
						</div>
						<div class="flex justify-between">
							<h2 class="flex text-sm tracking-widest">
								by {question?.author.username}
							</h2>
							<div
								class="flex justify-center items-center px-2 py-1 bg-[#2AAC6E] rounded-xl border"
							>
								<span class="text-xl font-bold block tracking-wide mr-2 text-center">
									{question.userPassCount}
								</span>
								<span class="text-base">Passed</span>
							</div>
						</div>
						<div class="flex">
							<span class="mr-3">Tags</span>
							{#each question?.tags ?? [] as tag}
								<span
									class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold text-indigo-100 bg-indigo-600 rounded-full"
								>
									{tag}
								</span>
							{/each}
						</div>
						<div>
							{#if question.hasHint}
								{#if question.hint}
									<div class="glass text-md px-4 py-2 w-full">
										<p class="leading-relaxed">
											Hint: {question.hint}
										</p>
									</div>
								{:else}
									<div class="flex items-center space-x-2">
										<p>ทำไม่ไหวใช่ไหม? 👉</p>
										<button
											type="button"
											class="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
											on:click={buyingHint}>Buy hint</button
										>
									</div>
								{/if}
							{/if}
						</div>
						<div class="glass p-4">
							<p class="text-md font-medium leading-relaxed whitespace-pre-wrap">
								{question?.description}
							</p>
						</div>
						<div>
							{#if question?.files.length > 0}
								{#each question?.files as file}
									<a href={file.url} class="text-indigo-300" download>
										<p>
											[Click To Download]: {file.url.split('/').pop()}
										</p>
									</a>
								{/each}
							{/if}
						</div>
						<div class="text-white flex flex-col space-y-4">
							{#each question?.testcases ?? [] as testcases, index}
								{#if testcases.published}
									<h3 class="text-xl font-bold mt-4">Test Cases</h3>
									<div>
										<h2>Test Case #{index + 1}</h2>
										<div class="glass-gray flex w-full justify-evenly p-3 mt-1 space-x-2">
											<div class="w-1/2 flex flex-col">
												<p class="text-sm">
													Input {index + 1}
												</p>
												<code
													class="mt-1 h-20 overflow-auto whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100 scrollable"
												>
													{testcases.input ? testcases.input : 'No Input'}
												</code>
											</div>
											<div class="w-1/2 flex flex-col">
												<p class="text-sm">
													Output {index + 1}
												</p>
												<code
													class={`mt-1 h-20 overflow-y-scroll whitespace-pre-wrap rounded-md bg-neutral-800 px-2 py-2 text-base text-gray-100 scrollable`}
												>
													{testcases.output ? testcases.output : 'No Output'}
												</code>
											</div>
										</div>
									</div>
								{:else}
									<p class="text-sm">There is no testcases</p>
								{/if}
							{/each}
						</div>
					</div>
				</div>
				<Editor id={question._id} />
			</div>
		</div>
	</section>
{:else}
	<Loading />
{/if}
