<script>
  import interact from "interactjs";
  import Tailwindcss from "./components/Tailwindcss.svelte";
  import Icon from "svelte-awesome";
  import Button from "./components/Button.svelte";
  import Textfield from "./components/Textfield.svelte";
  import Footer from "./components/Footer.svelte";
  import Overlay from "./components/Overlay.svelte";
  import BuiltRobot from "./components/BuiltRobot.svelte";
  import Flybot from "./components/Flybot.svelte";
  
  // commented out while still debugging the firebase + sendgrid email service
  import firebase from 'firebase/app';
	import { functions, auth} from './firebase';
  import Background from "./components/Background.svelte";
  import Cloudone from "./components/Cloudone.svelte";
  import Cloudtwo from "./components/Cloudtwo.svelte";
  import Cloudthree from "./components/Cloudthree.svelte";
  import Cloudfour from "./components/Cloudfour.svelte";
  import Logo from "./components/Logo.svelte";
  import Deadbot from "./components/Deadbot.svelte";

  let width;
  let height;
  let robotOn = false;
  let robotFly = false;
  let robotLive = false;
  let robotVis = true;
  let robotHasHidden = false;
  let backgroundRightLimit = "1920";
  let backgroundLeftLimit = "0";
  onresize();

  const footerData = [
    { id: 1, url: "#team", label: "team" },
    { id: 2, url: "#work", label: "work" }
  ];

  let showOverlay = false;

  function onresize() {
    // width = document.body.clientWidth;
    // height = document.body.clientHeight;
    width = window.innerWidth;
    height = window.innerHeight;
    if ((width <= 1024 && width > 650)) {
      backgroundRightLimit = "900";
      backgroundLeftLimit = "500";
    } 
    else if (width <= 650){
      backgroundRightLimit = "700";
      backgroundLeftLimit = "300";
    }
    else if (width > 1024) {
      backgroundRightLimit = "1920";
      backgroundLeftLimit = "0";
    }
  }

  window.addEventListener("resize", onresize);

  let showInitialText = false;
  let showForm = false;
  let showResendOption = false;
  let sendDisabled = true;

  let initialPromptHidden = "";
  let formEnter = "fadeIn";
  let formSubmitted = "fadeIn";
  let resendButton = 'opacity-0';


  function resetAnimation(){
    // showInitialText = false;
    // showForm = false;
    // showResendOption = false;
    // sendDisabled = true;
    if (robotFly){
      robotOn = false;
      robotFly = false;
      robotLive = false;
      robotVis = true;
      robotHasHidden = false;
    }
    
  }

  setTimeout(() => {
    if (!showInitialText && !showForm & !showResendOption){
      showInitialText = true;
    }
  }, 30000);

  function yesClicked() {
    initialPromptHidden = "fadeOut";
    setTimeout(() => {
      showInitialText = false;
      showForm = true;
      // formHidden = "fadeIn";
    }, 1000);
  }

  function turnRobotOn(){
    console.log("Powering up robot");
    robotOn = true;
    setTimeout(()=>{
      robotOn = false;
      robotFly = true;
      
    }, 4000);
    setTimeout(()=>{
      showInitialText = true;
    }, 5500);
  }

  $: if (robotLive){
    console.log("robot is on now");
    turnRobotOn();
  }
  // email validation & cookies
  document.cookie = 'visited=true; max-age=31536000; path=/';

  let formInput;

  const emailLength = val => val.trim().length > 0;

  const validateEmail = val => {
    return new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(val);
  };

  $: validEmail = validateEmail(formInput) && emailLength(formInput);
  $: if (validEmail) {
    sendDisabled = false;
  } else {
    sendDisabled = true;
  }


  function submitEmail() {
    if (validEmail) {
      document.cookie = 'emailSubmission=true; max-age=31536000; path=/';
      console.log("email: ", formInput);
      
      formEnter = "fadeOut";
      formSubmitted = "fadeIn";
      setTimeout(() => {
        showForm = false;
        showResendOption = true;
        
      }, 1000);
      
      setTimeout(()=>{
        resendButton = "fadeIn";
      }, 4000);

    
      // Email functionality commented out while debugging still in progress

      const callable = functions.httpsCallable('genericEmail');

      const data = { 
        text: 'Sending email with Svelte and SendGrid is fun!',
        subject: 'Email from Svelte', 
        email: formInput
      };

      console.log(data);
		  return callable(data).then(console.log);


    } else {
      alert("please enter a valid email address");
    }
  }
  
  // const cookies = console.log(document.cookie);

  function backToForm() {
    formSubmitted = "fadeOut";
    formEnter = "fadeIn";
    setTimeout(() => {
      showResendOption = false;
      showForm = true;
    }, 1000);
  }

</script>

<style>

  
  /*  */

  #main-content {
    position: absolute;
    bottom: 4%;
    left: 1rem;
    right: 1rem;
  }


  .logo {
    width: 3rem;
    margin: 0.5rem;
  }

  .logo:hover {
    cursor: pointer;
  }

  #robot-container {
    position: absolute;
    bottom: 20%;
    left: 1rem;
    right: 1rem;
  }

  .form {
    margin-bottom: -2.8rem;
  }
  .diagonal {
    transform: rotate(-45deg) translateY(4rem) translateX(2rem);
    width: 2.5rem;
    margin-bottom: 2.5rem;
  }

  .clouds {
    position: absolute;
    top: 1%;
    /* margin-bottom: 38%;
   margin-top: 1rem; */
  }
  .cloud1 {
    left: 45%;
    width: 10em;
  }
  .cloud2 {
    left: 17%;
    width: 20em;
  }
  .cloud3 {
    left: 2%;
    width: 12em;
  }
  .cloud4 {
    left: 70%;
    width: 16em;
  }

  @media (max-width: 850px) {
    .clouds {
      margin-bottom: 32%;
      margin-top: 1rem;
    }
    .cloud1 {
      left: 45%;
      width: 5em;
    }
    .cloud2 {
      left: 17%;
      width: 10em;
    }
    .cloud3 {
      left: 2%;
      width: 6em;
    }
    .cloud4 {
      left: 70%;
      width: 8em;
    }
    
  }

  @media (max-width: 640px) {
    .clouds {
      margin-bottom: 29%;
      margin-top: 1rem;
    }
    .cloud1 {
      left: 45%;
      width: 5em;
    }
    .cloud2 {
      left: 17%;
      width: 7em;
    }
    .cloud3 {
      left: 2%;
      width: 5em;
    }
    .cloud4 {
      left: 70%;
      width: 6em;
    }
    .initial-text {
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }
    .form-email {
      margin-left: -2rem;
    }
  }

  .flySlow {
    animation: flyRight 80s linear infinite;
  }

  .flyFaster {
    animation: flyRight 30s linear infinite;
  }
  .flyRealSlow {
    animation: flyRight 130s linear infinite;
  }
  .flyMed {
    animation: flyRight 50s linear infinite;
  }

  .draggable {
    touch-action: none;
    user-select: none;
  }

  .fadeIn {
    animation: fadeIn 1s ease-in;
    -moz-animation: fadeIn 1s ease-in; /* Firefox */
    -webkit-animation: fadeIn 1s ease-in; /* Safari and Chrome */
    -o-animation: fadeIn 1s ease-in; /* Opera */
  }

  .typewriter h1 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    /*border-right: .15em solid orange; */ /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.05em; /* Adjust as needed */
    animation: typing 3.5s steps(100, end), blink-caret 3s step-end infinite;
  }

  .typewriter h4 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    /*border-right: .15em solid orange; */ /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.1em; /* Adjust as needed */
    animation: typing 2s steps(100, end), blink-caret 3s step-end infinite;
  }

  .fadeOut {
    animation: 1s fadeOut both;
    -webkit-animation: 1s fadeOut both;
    -moz-animation: 1s fadeOut both;
  }
  .fadeInOut {
    animation: 3s fadeInAndOut linear infinite;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes flyRight {

    0% {
      transform: translate3d(-900px, 0, 0);
    }
    100% {
      transform: translate3d(1920px, 0, 0);
    }
  }

</style>

<Tailwindcss />



<div id="main-container" class="overflow-y-scroll overflow-x-hidden w-screen absolute h-screen top-0 left-0">

  <div class="relative w-screen">

    <div class="clouds relative">

      <div class="flySlow absolute cloud1">
        <Cloudone />
      </div>

      <div class="flyFaster absolute cloud2">
        <Cloudtwo />
      </div>

      <div class="flyRealSlow absolute cloud3">
          <Cloudthree />
      </div>

      <div class="flyMed absolute cloud4">
          <Cloudfour />
      </div>

    </div>

    <div class="absolute logo top-0 left-0">
      <Logo />

    </div>

    
    <div class="flex justify-center items-end " id="robot-container">
      {#if !robotOn && !robotFly}
      
        <Deadbot bind:width={width} bind:height={height} bind:robotLive={robotLive} />
      
      {:else if robotOn}

        <div>
          <div class="typewriter text-bubble fadeInOut">
            <h4 class="text-white text-xs">Time to fly away now</h4>
            <hr class="diagonal" />
          </div>
          <BuiltRobot />
        </div>

      {:else if robotFly}

        <!-- <div> -->
        {#if robotVis}

          <Flybot hasHidden={robotHasHidden} on:click={()=>{
            console.log("robot clicked");
            robotVis = false;
            robotHasHidden = true;
            console.log("robot hiding");
            setTimeout(()=>{
              robotVis = true;
            }, 4000)
          }}/>

        {/if}
        <!-- </div> -->

      {/if}

    </div>

    
    <div id="main-content" class="text-center ">

      {#if showInitialText}
        <div class={`${initialPromptHidden} form`}>
          <div class="typewriter">
            <h1 class="text-white md:text-2xl text-sm">
              Want a cool logo, video, website or app?
            </h1>
          </div>

          <div class="fadeIn">
            <Button rounded={true} btnText="yes!" on:click={yesClicked} />
          </div>
        </div>
      {:else if showForm}
        <div class={`${formEnter} sm:mt-8 form form-email`}>
          <!-- commented out formspree while experimenting with firebase + sendgrid email service -->
          <!-- formspree url action="https://formspree.io/meqrpdqd"   to be replaced - free account does not allow custom thank you redirect -->
          <form on:submit={(event) => {event.preventDefault()}} method="POST">
            <Textfield
              placeHolder="What's your email address?"
              on:input={
                (event) => {
                    formInput = event.target.value;
                  }
                } />
               
            <!-- <input type="hidden" name="_subject" value="New submission!" /> -->
            <span class="mx-2">
              {#if validEmail}
                <Button rounded={true} btnText="send" on:click={submitEmail} />
              {:else}
                <Button disabled={sendDisabled} rounded={true} btnText="send" />
              {/if}
            </span>
          </form>

        </div>
      {:else if showResendOption}
        <div class={`${formSubmitted} form `}>

          

          <h1 class="text-white md:text-2xl text-xl">
            Lets build something wonderful!
          </h1>
        <div class={`${resendButton}`}>
          <Button 
            rounded={true}
            color="primary"
            btnText="Re-send form"
            on:click={backToForm}
            elevation="xl" />
           
        </div>
          

        </div>
      {/if}

       <div class="text-right -mr-2">

        <Button on:click={resetAnimation} size="sm" color="secondary" elevation="sm" rounded={true} 
            btnText="reset animation" />

       </div>
        
          
    </div>

    <div id="background">
      <Background backgroundRightLimit="{backgroundRightLimit}" backgroundLeftLimit="{backgroundLeftLimit}" />
    </div>

  </div>

  <Footer
    class="-mt-2"
    footerList={footerData}
    on:click={() => (showOverlay = true)} />
    </div>

  {#if showOverlay}
    <Overlay on:click={() => (showOverlay = false)}>
      <!-- slot for content, uncomment below to see example-->
      <!-- <p>I'm a modal</p> -->
    </Overlay>
  {/if}




