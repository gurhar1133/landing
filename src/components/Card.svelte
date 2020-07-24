<script>
    export let title = "";
    export let subtitle = "";
    export let description = "";
    export let hasImage = false;
    export let imgSrc;
    export let elevation = "md";
    export let shaped = false;
    export let bonus = false;

    let mouseX;
    let mouseY;
    let circleClass;
    let rounding = shaped? "rounded-top-left rounded-bottom-right" :"rounded";
    let shadow = "shadow-md";
    if(elevation !== "md"){
        if (elevation === "lg"){
            shadow = "shadow-lg";
        }
        else if (elevation === "xl"){
            shadow = "shadow-xl";
        }
        else if (elevation === "sm"){
            shadow = "shadow-sm";
        }
    }
    let bonusClass = bonus ? "hover:bg-yellow-100 cursor-pointer hover:shadow-2xl" : "";

    let card_template_class = `card bg-white bg-opacity-1 border border-gray-300 ${rounding} ${shadow} overflow-auto 
                                ${bonusClass} relative max-w-xs`;

    function onClick(event){
        mouseX = event.offsetX - 30;
        mouseY = event.offsetY - 25;
        circleClass = "circle";
        
        setTimeout(()=>{
            circleClass = "";
        },300);
    }

</script>

<style>
.rounded-top-left{
    border-top-left-radius: 30px;
}
.rounded-bottom-right{
    border-bottom-right-radius: 30px;
}
.card{
    height: max-content;
}
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
@keyframes ripple{
        to{
            transform: scale(9);
            opacity: 0;
        }
    }
</style>

<div class="{card_template_class}">



    {#if hasImage}
        <img on:click={onClick} class="h-64 w-full object-cover" src="{imgSrc}" alt="image"/>
    {/if}
    
    <div class="p-4">
        <h4 class="text-xl text-gray-800 font-bold">{title}</h4>
        <h4 class="text-md text-gray-600">{subtitle}</h4>
    </div>
    <div class="pt-0 pb-2 px-4">
        <p class="text-sm text-gray-600">{description}</p>
        <slot></slot>
    </div>
    {#if bonus}
        <div class="{circleClass}" style="{`top:${mouseY}px; left:${mouseX}px;`}"> </div>
    {/if}
</div>