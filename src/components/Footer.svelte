<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  export let footerList = {};
</script>

<style>
  footer {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    
  }
  a{color: white}
</style>

<Tailwindcss />

<footer>
  <ul class="flex items-center bg-blue-600 justify-center w-full h-full">
    {#each footerList as item}
      <li class="px-4 py-2 uppercase ">
        <a
          on:click
          href={item.url}
          class="text-white text-sm tracking-widest no-underline
          hover:no-underline hover:text-gray-300">
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</footer>
