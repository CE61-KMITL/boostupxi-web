<script lang="ts">
  export let href: string;
  export let title: string;
  export let body: string;
</script>

<li
  class="link-card p-1 bg-white rounded-lg bg-gradient-to-r from-white via-white to-accent transition-background bg-right"
>
  <a
    class="block w-full no-underline text-black bg-opacity-80 rounded-lg p-4"
    {href}
  >
    <h2 class="mb-0 text-lg font-bold">{title} <span>&rarr;</span></h2>
    <p class="mt-2 mb-0 text-gray-600">{body}</p>
  </a>
</li>
