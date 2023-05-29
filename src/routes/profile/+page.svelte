<script lang="ts">
	import { user } from '../../store/user';
</script>

<div class="h-screen pt-20">
	<div>
		<div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-2xl">
			<div class="border-b px-4 pb-6">
				<div class="text-center my-4">
					<img
						class="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c93uXMHa1QaeW9g4bvGhYtN92-dtsa_4KiTWomiooQ&s"
						alt=""
					/>
					<div class="py-2">
						<h3 class="font-bold text-2xl mb-1">{$user.username}</h3>
						<div class="inline-flex text-gray-700 items-center">
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
					</div>
				</div>
				<div class="w-full text-center">
					<div class="flex justify-center space-x-4">
						<div class="p-3 text-center">
							<span class="text-xl font-bold block tracking-wide text-blueGray-600">
								{$user.score}
							</span>
							<span class="text-sm text-blueGray-400">Scores</span>
						</div>
						<div class="p-3 text-center">
							<span class="text-xl font-bold block tracking-wide text-blueGray-600">
								{$user.role}
							</span>
							<span class="text-sm text-blueGray-400">Role</span>
						</div>
						<div class="lg:p-3 text-center">
							<span class="text-xl font-bold block tracking-wide text-blueGray-600"
								>{$user.group}</span
							>
							<span class="text-sm text-blueGray-400">Groups</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
