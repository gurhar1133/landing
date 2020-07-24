<script>
    import Tailwindcss from "./Tailwindcss.svelte";
    import {createEventDispatcher} from "svelte";
    import Icon from 'svelte-awesome';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
    import { beer, refresh, comment, codeFork, camera, ban } from 'svelte-awesome/icons';
    const dispatch = createEventDispatcher();

    export let btnText = "";
    export let color = 'purple';
    export let size = "md";
    export let elevation;
    export let rounded = false;
    export let textMode = false;
    export let disabled = false;
    export let outline = false;
    export let fab = false;
    export let iconData;
    export let clickEvent = ()=>{};
    
    let mouseX;
    let mouseY;
    let backgroundColor;
    let textColor;
    let circleClass;
    let border = "border-none";
    let borderRound = (rounded || fab) ? "rounded-full" : "rounded";
    let sizeClass  = "py-2 px-6";
    let shadowClass = "shadow-xl";
    btnText = btnText.toUpperCase();

    if (elevation === "sm"){
        shadowClass = "shadow-sm";
    }
    else if(elevation === "lg"){
        shadowClass = "shadow-xl";
    }


    if(!outline && !textMode){
        textColor = 'text-white';
        if (color === "primary"){
            backgroundColor = 'bg-blue-600';
        }
        else if (color === "secondary"){
            backgroundColor = 'bg-blue-500';
        }
        else {
            backgroundColor = `bg-purple-500`;
        }
    }

    else if (outline){
        textMode = false;
        backgroundColor = "bg-white bg-opacity-0";
        if (color === "primary"){
            textColor = 'text-blue-600 hover:bg-blue-200 hover:bg-opacity-25';
            border = "border-2 border-blue-600";
        }
        else if (color === "secondary"){
            textColor = 'text-blue-500 hover:bg-blue-200 hover:bg-opacity-25';
            border = "border-2 border-blue-500";
        }
        else {
            textColor = `text-${color}-500 hover:bg-${color}-200 hover:bg-opacity-25`;
            border = `border-2 border-${color}-600`;
        }
    }
    else if (textMode){
        outline = false;
        backgroundColor = "bg-white bg-opacity-0";
        border = `border-0`;
        if (color === "primary"){
            textColor = 'text-blue-600 hover:bg-blue-200 hover:bg-opacity-5';
        }
        else if (color === "secondary"){
            textColor = 'text-blue-500 hover:bg-blue-200 hover:bg-opacity-5';
        }
        else {
            textColor = `text-${color}-500 hover:bg-${color}-200 hover:bg-opacity-5`;
            
        }
    }
    
    if (disabled){
        backgroundColor = "bg-gray-300 bg-opacity-5";
        textColor = "text-gray-600";
    }

    if (size !== "md"){
        if (size === "sm"){
            sizeClass  = "py-1 px-2";
        }
        else if (size === "lg"){
            sizeClass  = "py-3 px-5";
            if (fab) {
                sizeClass = "py-5 px-6";
            }
        }
        else if (size === "xl"){
            sizeClass  = "py-4 px-6";
            if (fab) {
                sizeClass = "py-6 px-8";
            }
        }
        else if (size === "block"){
            sizeClass = "py-3 px-5 w-full"; 
        }
        
    }
    else if (size === "md"){
        if (fab) {
            sizeClass = "py-4 px-5";
        }
    }

    

    let button_class_template = `${backgroundColor} ${textColor} ${border} ${borderRound} 
                            ${sizeClass} ${shadowClass} focus:outline-none focus:${border} 
                            relative overflow-hidden my-1 max-size text-xs`;
    
    let final_class_template;
    $: final_class_template = !disabled ? button_class_template : `${sizeClass} text-xs bg-gray-300 bg-opacity-5 text-gray-600 ${borderRound}` ;
    
    function onClick(event){
        dispatch("click");
        clickEvent();
        if (outline || textMode){
            circleClass = `circle-${color}`
        }
        else {
            circleClass = "circle";
        }
        mouseX = event.offsetX - 30;
        mouseY = event.offsetY - 25;

        setTimeout(()=>{
            circleClass = "";
        },300);

    }

</script>

<style>
    .circle{
        animation: ripple 0.4s linear;
        position: absolute;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        transform: scale(0);
        z-index: 99;
        background-color: rgba(255, 255, 255, 0.6);
        
    }

    .circle-purple{
        animation: ripple 0.3s linear;
        position: absolute;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        transform: scale(0);
        z-index: 99;
        background-color: rgba(207, 104, 238, 0.58);
    }
    .circle-primary{
        animation: ripple 0.3s linear;
        position: absolute;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        transform: scale(0);
        z-index: 99;
        background-color: rgba(85, 101, 243, 0.568);
    }
    .circle-secondary{
        animation: ripple 0.4s linear;
        position: absolute;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        transform: scale(0);
        z-index: 99;
        background-color: rgba(77, 200, 231, 0.507);
    }

    @keyframes ripple{
        to{
            transform: scale(7);
            opacity: 0;
        }
    }

   .max-size{
       max-height: 100px;
   }
</style>

<Tailwindcss />
<button id="button" on:click={onClick} disabled="{disabled}" class="{final_class_template}">
<div class="{circleClass}" style="{`top:${mouseY}px; left:${mouseX}px;`}"> </div>
    {#if iconData}
        <Icon data={iconData}/>
    {/if}
        {btnText}
    
    
    
    
</button>