
<div id="overlay" on:click>

  <div id="content">
    <slot />
  </div>

</div>

<style>
  #overlay {
    position: fixed; 
    display: block; 
    width: 100%; 
    height: 100%; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1000001; 
    /* cursor: pointer;  */
  }

  #content {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 2rem;
    color: white;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>