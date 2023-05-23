<script lang="ts">
	let src = '/process.jpg';
</script>

<div>
	<main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
		<img src={'/process.jpg'} class="h-32 w-32" alt="process" />
		<h1 class="text-7xl font-extrabold text-white tracking-widest">Coming Soon</h1>
		<button class="mt-5">
			<a
				class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
				href="/"
			>
				<span
					class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
				/>

				<span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
					<router-link to="/">Go Home</router-link>
				</span>
			</a>
		</button>
	</main>
</div>
