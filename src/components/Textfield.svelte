<script>
    export let outlined = false;
    export let placeHolder;
    let fill = "bg-blue-200 bg-opacity-25 text-white";
    let outline = outlined ? "" : "border-0 focus:outline-none";
    let textfield_template = `mx-3 ${outline} ${fill} py-2 px-2 w-full rounded-full`;
    let focusEffect;
    
    function onFocus(){
        focusEffect =  "focus-effect-bottom";
    }
    function onBlur(){
        focusEffect = "";
    }
</script>

<style>
    .text-input{
        width: 25rem;
    }
</style>

<div class="inline-block mx-1 text-input" >
    {#if !outlined}
        <input placeholder="{placeHolder}" on:focus={onFocus} on:blur={onBlur} class="{textfield_template}" type="text">
        
    {:else if outlined}
        <input placeholder="{placeHolder}" on:focus={onFocus} on:blur={onBlur} class="{textfield_template}" type="text"> 
    {/if}
</div>
