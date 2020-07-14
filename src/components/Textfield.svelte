<script>
    export let outlined = false;
    export let placeHolder;
    

    let fill = "bg-blue-200 bg-opacity-25 text-white";
    let outline = outlined ? "" : "border-0 focus:outline-none";
    let textfield_template = `mx-3 ${outline} ${fill} py-1 px-2 w-full rounded-full`;
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
        width: 15rem;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #eee;
        font-size: .9rem;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #eee;
        font-size: .9rem;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #ccc;
        font-size: .9rem;
    }

    
</style>

<div class="inline-block mx-1 text-input" >
    {#if !outlined}
        <input placeholder="{placeHolder}" on:focus={onFocus} on:blur={onBlur} on:input class="{textfield_template}" type="text">
        
    {:else if outlined}
        <input placeholder="{placeHolder}" on:focus={onFocus} on:blur={onBlur} on:input class="{textfield_template}" type="text"> 
    {/if}
</div>
