<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  export let footerList = {};
</script>

<style>
  footer {
    position: absolute;
    bottom: 2%;
    left: 1rem;
    right: 1rem;
  }
</style>

<Tailwindcss />

<footer>
  <ul class="flex items-center justify-center">
    {#each footerList as item}
      <li class="px-4 py-1 uppercase ">
        <a
          on:click
          href={item.url}
          class="text-white text-sm tracking-widest no-underline
          hover:no-underline hover:text-white">
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</footer>
