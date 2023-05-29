<script lang="ts">
	import type * as Monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import { afterUpdate, onMount } from 'svelte';

	let subscriptions: ((text: string) => void)[] = [];
	let content: {
		subscribe: (func: (text: string) => void) => () => void;
		set: (val: string) => void;
	};
	let divEl: HTMLDivElement;
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	export let id: string;

	const resizeEditor = () => {
		editor.layout();
	};

	const handleButtonClick = () => {
		const text = editor.getValue();
		console.log('Question : ID', id);
		console.log('Editor Value : ', text);
	};

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
		Monaco.editor.defineTheme('vs-dark', {
			base: 'vs-dark',
			inherit: true,
			rules: [],
			colors: {}
		});

		editor = Monaco.editor.create(divEl, {
			value: '/* Loading... */',
			language: 'c',
			theme: 'vs-dark',
			lineNumbers: 'on',
			automaticLayout: true,
			suggestOnTriggerCharacters: true,
			quickSuggestions: true,
			wordBasedSuggestions: true
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

		editor.updateOptions({
			fontFamily: 'Courier New, monospace',
			fontSize: 14,
			fontWeight: 'normal',
			lineHeight: 20,
			letterSpacing: 0,
			cursorStyle: 'line',
			readOnly: false,
			cursorBlinking: 'blink',
			scrollbar: {
				vertical: 'auto',
				horizontal: 'auto'
			}
		});

		afterUpdate(() => {
			resizeEditor();
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<div>
	<div
		bind:this={divEl}
		class="flex container w-[550px] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] h-[350px]"
	/>
	<div class=" flex justify-end">
		<button
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 mt-4"
			on:click={handleButtonClick}>Submit</button
		>
	</div>
</div>

<svelte:window
	on:resize={() => {
		resizeEditor();
	}}
/>
