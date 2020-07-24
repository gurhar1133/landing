<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  export let footerList = {};
  export let footerRipple = false;
  

</script>

<style>
  footer {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000000;
    overflow: hidden;
    background-color: #3182ce;
  }

  a {
    color: white;
    cursor: pointer;
  }

  span:hover {
    animation: none;
  }

  .footerRipple {
    animation: ripple 2.7s infinite;
    position: absolute;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    left: 45%;
    bottom: 30%;
    transform: scale(0);
    z-index: 90;
    background-color: rgba(77, 200, 231, 0.507);
  }

  @keyframes ripple {
    0% {
    }
    25% {
    }
    50% {
    }
    75% {
      transform: scale(7);
      opacity: 0;
    }
    100% {
      transform: scale(7);
      opacity: 0;
    }
  }

</style>

<Tailwindcss />

<footer>
  <ul class="flex items-top justify-center w-full">
    {#each footerList as item}
      <li class="px-4 py-2 m-2 uppercase relative z-99">
        <a
          on:click
          href={item.url}
          class="p-5 text-white text-sm tracking-widest no-underline
          hover:no-underline hover:text-gray-300">
          {item.label}
        </a>
          <span class:footerRipple />
      </li>
    {/each}
  </ul>
</footer>
