<script lang="ts">
	import { user } from '../../store/user';
	import { generateRankSuffix } from '../../utils/generateRankSuffix';
</script>

<div>
	<div class="relative mt-36 text-white">
		<img
			class="absolute h-32 w-32 rounded-full border-4 left-1/2 -translate-x-1/2 -top-16 z-10 user-profile"
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c93uXMHa1QaeW9g4bvGhYtN92-dtsa_4KiTWomiooQ&s"
			alt="user profile"
		/>
		<div class="max-w-sm mx-auto glass user-content">
			<div class="text-center mt-20">
				<div class="py-2">
					<h3 class="font-bold text-2xl mb-1">{$user.username}</h3>
					<div class="inline-flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
							/>
						</svg>
						{$user.email}
					</div>
					<span class="text-xl font-bold block tracking-wide"
						>{$user.group !== '' ? $user.group : 'Staff'}</span
					>
				</div>
			</div>
			<div class="flex justify-center my-4">
				<div class="flex px-4 py-2 text-center items-center bg-[#4E4E4E] rounded-xl mx-2">
					<span class="text-base">Rank</span>
					<span class="text-xl font-bold block tracking-wide ml-2">
						{generateRankSuffix($user.rank)}
					</span>
				</div>
				<div class="flex px-4 py-2 text-center items-center bg-[#DCC70A] rounded-xl mx-2">
					<span class="text-base mr-2">Scores</span>
					<span class="text-xl font-bold block tracking-wide">
						{$user.score}
					</span>
				</div>
				<div class="flex px-4 py-2 text-center items-center bg-[#2AAC6E] rounded-xl mx-2">
					<span class="text-xl font-bold block tracking-wide mr-2">
						{$user.completedQuestionsCount}
					</span>
					<span class="text-base">Passed</span>
				</div>
			</div>
		</div>
	</div>
</div>
