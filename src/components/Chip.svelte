<script>
    import Button from "./Button.svelte";
    import Icon from 'svelte-awesome';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
    import { beer, refresh, comment, codeFork, camera, ban, user, gear } from 'svelte-awesome/icons';
    export let text;
    export let type;
    
    let iconSelection;
    if (type === "work"){ 
        iconSelection = gear;
    } else if (type === "person"){
        iconSelection = user;
    }
    
</script>


<style>

    
</style>
<Button btnText={text} size="sm" color="primary" rounded={true} iconData={iconSelection}/>

