<script lang="ts">
	import { initialSubmissionData } from '$/constants/submission.constants';
	import type { ISubmissionsResult } from '$/interface/submission';
	import { compilerService } from '$/services/compiler.services';
	import { questionService } from '$/services/question.services';
	import { submissionDataStore } from '$/store/submission';
	import type * as Monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let subscriptions: ((text: string) => void)[] = [];
	let content: {
		subscribe: (func: (text: string) => void) => () => void;
		set: (val: string) => void;
	};
	let divEl: HTMLDivElement;
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	export let id: string;
	let loadingResult: boolean = false;
	let loading: boolean = false;
	let result: ISubmissionsResult = initialSubmissionData;

	const resizeEditor = () => {
		editor.layout();
	};
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		loadingResult = true;
		const text = editor.getValue();
		await compilerService.submitCode(text, id);
		setTimeout(async () => {
			const response = await questionService.getSubmission(id);
			if (response && response.status) {
				toast.success('ยินดีด้วยน้องผ่านแล้ว เก่งมากๆๆ');
				const sound = document.getElementById('pass-sound') as HTMLAudioElement;
				sound.play();
				submissionDataStore.set(response);
				loadingResult = false;
				loading = false;
			} else if (response && !response.status) {
				toast.error('ยังถูกไม่หมดน้า ลองใหม่ๆๆ');
				const sound = document.getElementById('fail-sound') as HTMLAudioElement;
				sound.play();
				submissionDataStore.set(response);
				loadingResult = false;
				loading = false;
			}
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}, 4000);
	};

	onMount(async () => {
		result = await questionService.getSubmission(id);
		if (result?.source_code) {
			content.set(result.source_code);
		} else {
			content.set(
				`#include <stdio.h>\n\nint main() {\n\tprintf("Hello CE Boostupxi"); \n\n\treturn 0;\n}`
			);
		}
	});

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_moduleId, label) {
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		Monaco.languages.register({ id: 'c' });
		Monaco.languages.setMonarchTokensProvider('c', {
			tokenizer: {
				root: [
					[/\/\/.*$/, 'comment'],
					[/\/\*/, 'comment', '@comment'],
					[/\#.*$/, 'keyword'],
					[/".*?"/, 'string'],
					[/\b(if|else|while|do|for|switch)\b/, 'keyword'],
					[/\b(void|int|char|float|double)\b/, 'type'],
					[/\b(return)\b/, 'keyword', '@pop'],
					[/^[a-zA-Z_][\w]*$/, 'identifier'],
					[/^\d+$/, 'number']
				],
				comment: [
					[/[^/*]+/, 'comment'],
					[/\*\//, 'comment', '@pop'],
					[/[\/*]/, 'comment']
				]
			}
		});

		Monaco.languages.setLanguageConfiguration('c', {
			comments: {
				lineComment: '//',
				blockComment: ['/*', '*/']
			},
			brackets: [
				['{', '}'],
				['[', ']'],
				['(', ')']
			],
			autoClosingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: '"', close: '"', notIn: ['string'] }
			],
		});

		editor = Monaco.editor.create(divEl, {
			value: result.source_code,
			language: 'c',
			theme: 'vs-dark',
			lineNumbers: 'on',
			automaticLayout: true,
			suggestOnTriggerCharacters: true,
			quickSuggestions: true,
			wordBasedSuggestions: true,
			ariaLabel: 'CE-BoostUp#XI',
			selectOnLineNumbers: true,
			padding: {
				top: 20,
				bottom: 10
			},
			fontLigatures: true,
			fontSize: 20,
			fontWeight: 'normal',
			lineHeight: 25,
			letterSpacing: 0,
			cursorStyle: 'line',
			readOnly: false,
			cursorBlinking: 'blink',
			scrollbar: {
				vertical: 'auto',
				horizontal: 'auto'
			},
			minimap: {
				enabled: false
			},
		});

		editor.onDidChangeModelContent(() => {
			const text = editor.getValue();
			subscriptions.forEach((sub) => sub(text));
		});

		content = {
			subscribe(func) {
				subscriptions.push(func);
				return () => {
					subscriptions = subscriptions.filter((sub) => sub !== func);
				};
			},
			set(val) {
				editor.setValue(val);
			}
		};

		return () => {
			editor.dispose();
		};
	});
</script>

<div>
	<audio src="/pass.mp3" id="pass-sound" />
	<audio src="/fail.mp3" id="fail-sound" />
	<div bind:this={divEl} class="w-full h-[40rem] rounded-lg overflow-hidden" />
	<button
		type="button"
		class="w-full text-white rgb-button mt-5"
		on:click={handleSubmit}
		disabled={loading}
	>
		{#if loading}
			<svg
				aria-hidden="true"
				class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		{:else}
			ส่งคำตอบ
		{/if}
	</button>
</div>

<svelte:window
	on:resize={() => {
		resizeEditor();
	}}
/>
