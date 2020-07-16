<script>
  import interact from "interactjs";
  import { fly } from "svelte/transition";
  import Tailwindcss from "./components/Tailwindcss.svelte";
  import Icon from "svelte-awesome";
  import Button from "./components/Button.svelte";
  import Textfield from "./components/Textfield.svelte";
  import Footer from "./components/Footer.svelte";
  import Overlay from "./components/Overlay.svelte";
  import BuiltRobot from "./components/BuiltRobot.svelte";
  import Flybot from "./components/Flybot.svelte";

  let width;
  let height;
  let robotOn = false;
  let robotFly = false;
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
    if (width < 600) {
      backgroundRightLimit = "700";
      backgroundLeftLimit = "300";
    } else if (width >= 600) {
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

  let headRotationalClass = "";
  let leftArmRotationalClass = "";
  let rightArmRotationalClass = "";
  let leftLegRotationalClass = "";
  let rightLegRotationalClass = "";
  let bodyRotationalClass = "";
  let batteryRotationalClass = "";

  let headLocation;
  let bodyLocation;
  let leftArmLocation;
  let rightArmLocation;
  let leftLegLocation;
  let rightLegLocation;
  let batteryLocation;

 
  let bodyConnected = false;
  let leftArmConnected = false;
  let rightArmConnected = false;
  let leftLegConnected = false;
  let rightLegConnected = false;
  let batteryConnected = false;
  let robotDialogue;
  let initialDialogue = "Put me back together please";
  setTimeout(()=>{
    initialDialogue = "Drag my head all the way up then attach my body";
  }, 9000);

  $: if (bodyConnected && leftArmConnected && rightArmConnected && leftLegConnected
      && rightLegConnected && batteryConnected){
    robotDialogue = "You've done it!! Im complete!";
    setTimeout(()=>{
      turnRobotOn();
      robotDialogue = "Time to fly away now!!";
    }, 3000);
    
  }
  else if (bodyConnected && leftArmConnected && rightArmConnected &&leftLegConnected
      && rightLegConnected && !batteryConnected){
        robotDialogue = "Plug my battery into my body";
  }
  else if (bodyConnected) {
        robotDialogue = "Now attach my limbs please";
  }
  else if (!bodyConnected && !leftArmConnected && !rightArmConnected && !leftLegConnected
      && !rightLegConnected && !batteryConnected){
    robotDialogue = initialDialogue;
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
      formEnter = "fadeOut";
      formSubmitted = "fadeIn";
      setTimeout(() => {
        showForm = false;
        showResendOption = true;
      }, 1000);
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

  function onDoubleClicked() {
    // showInitialText = true;
  }

  function getDistance(pointA, pointB){

    return Math.sqrt(((pointA.x - pointB.x)**2) + ((pointA.y - pointB.y)**2));
  }
  
  //let position = { x: 0, y: 0 };
  interact(".head").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          { x: .5, y: 1} 
          // { x: -.5 , y: 0}, 
          // { x: 1.5 , y: 0},
          // { x: .5, y: 0}
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  interact(".body").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          // { x: -.5 , y: 0}, 
          // { x: 1.5 , y: 0},
          { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  interact(".left-arm").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          // { x: -.5 , y: 0}, 
          { x: 1.5 , y: 0}
          // { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  interact(".right-arm").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          { x: -.5 , y: 0} 
          // { x: 1.5 , y: 0},
          // { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1}
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  interact(".right-leg").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          // { x: -.5 , y: 0}, 
          // { x: 1.5 , y: 0},
          // { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          {x: 1.3, y: -1}
        ]
      })
    ]
  });

  interact(".left-leg").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          // { x: -.5 , y: 0}, 
          // { x: 1.5 , y: 0},
          // { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          {x: 0, y: -1}
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  interact(".battery").draggable({
    autoScroll: true,
    listeners: {
      move: dragMoveListener
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [ 
          function(){
            if (width >= 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2) }
            }
            else if (width > 800 && width < 1000){
              return { x: Math.floor(width/2), y: Math.floor(height/2.8) } 
            }
            else if (width > 600 && width < 800){
              return { x: Math.floor(width/2), y: Math.floor(height/3.6) } 
            } else {
              return { x: Math.floor(width/2), y: Math.floor(height/2) } 
            }  
          }
        ],
        relativePoints: [
          // { x: 0  , y: 0},
          // { x: .5, y: 1}
          // { x: -.5 , y: 0}, 
          // { x: 1.5 , y: 0},
          { x: .5, y: 0} 
          // { x: 1  , y: 1},
          // { x: 0, y: 1},
          // { x: 1, y: 0} ,
          // {x: 0, y: -1},
          // {x: 1.3, y: -1}, 
        ]
      })
    ]
  });

  function dragMoveListener(event) {
    // event.preventDefault();
    var target = event.target;
    console.log("dragged");
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    let absY = event.clientY;
  
    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    if (target.classList.contains("head")) {
      headRotationalClass = "rotateHead";
      headLocation = {x: x, y: y};

    } else if (target.classList.contains("left-arm")) {
      leftArmRotationalClass = "rotateLeftArm";
      leftArmLocation = {x: x, y: y};
      // console.log("distance from head to left arm:");
      // console.log(Math.floor(getDistance(leftArmLocation, headLocation)));
      // if (Math.floor(getDistance(leftArmLocation, headLocation)) == 46 || 
      //       Math.floor(getDistance(leftArmLocation, headLocation)) == 42){
              
      //       }
      //       // else{
      //       //   leftArmConnected = false;
      //       // }
        leftArmConnected = true;

    } else if (target.classList.contains("right-arm")) {
      rightArmRotationalClass = "rotateRightArm";
      rightArmLocation = {x: x, y: y};
      // console.log("distance from head to right arm:");
      // console.log(Math.floor(getDistance(rightArmLocation, headLocation)));
      // if (Math.floor(getDistance(rightArmLocation, headLocation)) == 93 || 
      //       Math.floor(getDistance(rightArmLocation, headLocation)) == 81){
              
      //       // }
      //       // else{
      //       //   rightArmConnected = false;
      //       // }
      rightArmConnected = true;

    } else if (target.classList.contains("left-leg")) {
      leftLegRotationalClass = "rotateLeftLeg";
      leftLegLocation = {x: x, y: y};
      // console.log("distance from head to left leg:");
      // console.log(Math.floor(getDistance(leftLegLocation, headLocation)));
      // if (Math.floor(getDistance(leftLegLocation, headLocation)) == 156 || 
      //       Math.floor(getDistance(leftLegLocation, headLocation)) == 179){
      //         leftLegConnected = true;
      //       }
      //       else {
      //         leftLegConnected = false;
      //       }
      leftLegConnected = true;


    } else if (target.classList.contains("right-leg")) {
      rightLegRotationalClass = "rotateRightLeg";
      rightLegLocation = {x: x, y: y};
      // console.log("distance from head to right leg:");
      // console.log(Math.floor(getDistance(rightLegLocation, headLocation)));
      // if (Math.floor(getDistance(rightLegLocation, headLocation)) === 159 || 
      //       Math.floor(getDistance(rightLegLocation, headLocation)) === 178){
      //         rightLegConnected = true;
      //       }
      //       else {
      //         rightLegConnected = false;
      //       }
      rightLegConnected = true;

    } else if (target.classList.contains("body")) {
      bodyRotationalClass = "rotateBody";
      bodyLocation = {x: x, y: y};
      // console.log("location body:", bodyLocation);
      // console.log("TESTING DISTANCE FROM HEAD TO BODY");
      // console.log(getDistance(bodyLocation, headLocation));
      // if (Math.floor(getDistance(bodyLocation, headLocation)) == 71 || 
      //       Math.floor(getDistance(bodyLocation, headLocation)) == 78){
      //         bodyConnected = true;
      //       }
      //       else{
      //         bodyConnected = false;
      //       }
      bodyConnected = true;

    } else if (target.classList.contains("battery")) {
      batteryRotationalClass = "rotateBattery";
      batteryLocation = {x: x, y: y};
      // console.log("TESTING DISTANCE FROM HEAD TO BATTERY");
      // console.log(getDistance(batteryLocation, headLocation));
      // if (Math.floor(getDistance(batteryLocation, headLocation)) == 216 || 
      //       Math.floor(getDistance(batteryLocation, headLocation)) == 187){
      //         batteryConnected = true;
      //       }
      //       else{
      //         batteryConnected = false;
      //       }
      batteryConnected = true;
            
    }
  
  }


</script>

<style>
  @media (max-width: 800px) {
    #main-container {
      overflow: hidden;
    }
  }

  #main-content {
    position: absolute;
    bottom: 4%;
    left: 1rem;
    right: 1rem;
  }
  
  #background{
   
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
    margin-bottom: -0.6rem;
  }

  .head {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 5rem;
  }

  .text-bubble {
    position: absolute;
    top: -60%;
  }

  .diagonal {
    transform: rotate(-45deg) translateY(4rem) translateX(2rem);
    width: 2.5rem;
  }

  .body {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 3rem;
  }
  .right-leg {
    padding-top: .115rem;
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 1rem;
    
  }
  .right-leg-inner{
    
  }
  .left-leg {
    margin-right: 0.25rem;
    margin-left: 0.25rem;

    width: 1.65rem;
  }
  .left-leg-inner{
    margin-top: .45rem;
    
  }
  .right-arm {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 2.3rem;
  }
  .left-arm {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 2.3rem;
  }
  .battery {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 1rem;
  }
  .battery-inner{
    margin-top: .46rem;
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
    .head {
      margin-right: 0rem;
      margin-left: 0rem;
    }

    .body {
      margin-right: 0.1rem;
      margin-left: 0rem;
    }
    .right-leg {
      margin-right: 0.1rem;
      margin-left: 0rem;
    }
    .left-leg {
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }
    .right-arm {
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }
    .left-arm {
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }
    .battery {
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }
    /* .diagonal{
        transform: rotate(-45deg);
        margin-left: 2.5rem;
        margin-top: .5rem;
        width: 1rem;
      } */
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

  .rotateHead {
    transform: rotate(44deg);
  }
  .rotateLeftArm {
    transform: rotate(-18deg);
  }
  .rotateRightArm {
    transform: rotate(-145deg);
  }
  .rotateLeftLeg {
    transform: rotate(-89.5deg);
  }
  .rotateRightLeg {
    transform: rotate(-1deg);
  }
  .rotateBody {
    transform: rotate(-6deg);
  }
  .rotateBattery {
  }

  .fadeOut {
    animation: 1s fadeOut both;
    -webkit-animation: 1s fadeOut both;
    -moz-animation: 1s fadeOut both;
  }
  .fadeInOut {
    animation: 3s fadeInAndOut linear infinite;
  }
  
  /* .inPill{
  margin-left: -5.7rem;
} */

  /* @keyframes headRotation{
    
    100% {
        transition: transform;
        transform: rotate(45deg);
    }
  } */

  .head-drop {
    position: absolute;
    top: 50%;
    left: 50%;
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

  @keyframes fadeInAndOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
    /* 0%{
      margin-left: 0%;
      width: 100%
    }
    100% {
        margin-left: 100%;
        width: 100%;
    } */

    0% {
      transform: translate3d(-900px, 0, 0);
    }
    100% {
      transform: translate3d(1920px, 0, 0);
    }
  }
</style>

<Tailwindcss />

<div id="main-container" class="overflow-hidden">

  <div class="relative w-screen">

    <div class="clouds relative">

      <div class="flySlow absolute cloud1">
        <svg
          viewBox="0 0 262 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.4"
            d="M256.8 63H242.8H240.2C230.4 63 233.7 50.9 233.7 50.9C236.5 45.9
            238.1 40.2 238.1 34.1C238.1 15.3 223 0.0999756 204.4 0.0999756C188.9
            0.0999756 175.8 10.7 171.9 25.1C168.6 23.2 164.7 22.1 160.7
            22.1C150.9 22.1 142.5 28.4 139.3 37.2C137.7 36.7 135.9 36.4 134.1
            36.4C124.5 36.4 116.7 44.3 116.7 53.9C116.7 54.1 116.7 54.2 116.7
            54.4C116.7 56.3 116.3 63 107.9 63H105.3H64.8C62 63 59.7 65.3 59.7
            68.1C59.7 70.9 62 73.2 64.8 73.2H256.8C259.6 73.2 261.9 70.9 261.9
            68.1C261.9 65.2 259.6 63 256.8 63ZM119.1 62.9C119.2 62.9 119.2 62.9
            119.1 62.9V62.9Z"
            fill="#E5EDEF" />
          <path
            opacity="0.4"
            d="M48.4 73.0999H23.6C21.8 73.0999 20.2 71.6 20.2 69.7V66.2C20.2
            64.4 21.7 62.7999 23.6 62.7999H48.4C50.2 62.7999 51.8 64.3 51.8
            66.2V69.7C51.8 71.6 50.3 73.0999 48.4 73.0999Z"
            fill="#E5EDEF" />
          <path
            opacity="0.4"
            d="M7.30005 73.0999H3.80005C2.00005 73.0999 0.400024 71.6 0.400024
            69.7V66.2C0.400024 64.4 1.90005 62.7999 3.80005
            62.7999H7.30005C9.10005 62.7999 10.7 64.3 10.7 66.2V69.7C10.6 71.6
            9.10005 73.0999 7.30005 73.0999Z"
            fill="#E5EDEF" />
        </svg>
      </div>

      <div class="flyFaster absolute cloud2">
        <svg
          viewBox="0 0 334 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M327 81H309.1H305.8C293.3 81 297.6 65.6 297.6 65.6C301.2 59.3
            303.2 52 303.2 44.2C303.2 20.3 284 0.900024 260.3 0.900024C240.5
            0.900024 223.9 14.4 218.9 32.7C214.7 30.3 209.8 28.9 204.6
            28.9C192.1 28.9 181.5 36.9 177.4 48.1C175.3 47.4 173.1 47.1 170.8
            47.1C158.6 47.1 148.6 57.1 148.6 69.4C148.6 69.6 148.6 69.8 148.6
            70.1C148.7 72.5 148.1 81 137.3 81H134H82.5C78.9 81 76 83.9 76
            87.5C76 91.1 78.9 94 82.5 94H327C330.6 94 333.5 91.1 333.5
            87.5C333.5 83.9 330.6 81 327 81Z"
            fill="#E5EDEF" />
          <path
            d="M59.6 93.9H32.4C28.8 93.9 25.9 91 25.9 87.4C25.9 83.8 28.8 80.9
            32.4 80.9H59.6C63.2 80.9 66.1 83.8 66.1 87.4C66 90.9 63.1 93.9 59.6
            93.9Z"
            fill="#E5EDEF" />
          <path
            d="M7.20001 93.9C3.60001 93.9 0.700012 91 0.700012 87.4C0.700012
            83.8 3.60001 80.9 7.20001 80.9C10.8 80.9 13.7 83.8 13.7 87.4C13.6
            90.9 10.7 93.9 7.20001 93.9Z"
            fill="#E5EDEF" />
        </svg>
      </div>

      <div class="flyRealSlow absolute cloud3">
        <svg
          viewBox="0 0 174 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              opacity="0.4"
              d="M26.6 47H9.2C4.1 47 0 42.9 0 37.8C0 32.7 4.1 28.6 9.2
              28.6H26.5C31.6 28.6 35.7 32.7 35.7 37.8C35.7 42.9 31.6 47 26.6 47Z"
              fill="#E5EDEF" />
            <path
              opacity="0.4"
              d="M173.9 37.8C173.9 42.8 169.8 47 164.7 47H51.3C46.3 47 42.1 42.9
              42.1 37.8C42.1 32.7 46.2 28.6 51.3 28.6H98.5C100.9 12.6 114.7
              0.200012 131.5 0.200012C148.2 0.200012 162 12.5 164.5
              28.6H164.9C169.8 28.6 173.9 32.8 173.9 37.8Z"
              fill="#E5EDEF" />
          </g>
        </svg>
      </div>

      <div class="flyMed absolute cloud4">
        <svg
          viewBox="0 0 261 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.7"
            d="M236.8 69.1H221.5H218.7C208 69.1 211.7 55.9 211.7 55.9C214.8 50.5
            216.5 44.2 216.5 37.6C216.5 17.1 200 0.5 179.8 0.5C162.9 0.5 148.6
            12 144.4 27.7C140.8 25.6 136.6 24.4 132.1 24.4C121.4 24.4 112.3 31.2
            108.8 40.8C107 40.2 105.1 39.9 103.1 39.9C92.6 39.9 84.1 48.5 84.1
            59C84.1 59.2 84.1 59.4 84.1 59.6C84.1 61.7 83.6 68.9 74.5
            68.9H71.7H27.6C24.5 68.9 22 71.4 22 74.5C22 77.6 24.5 80.1 27.6
            80.1H236.9C240 80.1 242.5 77.6 242.5 74.5C242.4 71.6 239.9 69.1
            236.8 69.1Z"
            fill="#E5EDEF" />
          <path
            opacity="0.7"
            d="M5.80005 80.2C2.70005 80.2 0.300049 77.7 0.300049 74.7C0.300049
            71.6 2.80005 69.2 5.80005 69.2C8.90005 69.2 11.3 71.7 11.3 74.7C11.3
            77.7 8.80005 80.2 5.80005 80.2Z"
            fill="#E5EDEF" />
          <path
            opacity="0.7"
            d="M254.9 80.2C251.8 80.2 249.4 77.7 249.4 74.7C249.4 71.6 251.9
            69.2 254.9 69.2C258 69.2 260.4 71.7 260.4 74.7C260.5 77.7 258 80.2
            254.9 80.2Z"
            fill="#E5EDEF" />
        </svg>
      </div>

    </div>

    <div class="absolute logo top-0 left-0">

      <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.5 25.6H4.30002C2.20002 25.6 0.400024 23.9 0.400024
          21.7V4.70004C0.400024 2.60004 2.10002 0.800049 4.30002
          0.800049H21.5C23.6 0.800049 25.4 2.50004 25.4 4.70004V21.7C25.4 23.9
          23.7 25.6 21.5 25.6Z"
          fill="url(#paint0_linear)" />
        <g opacity="0.05">
          <g opacity="0.05">
            <g opacity="0.05">
              <path
                opacity="0.05"
                d="M3.80002 2L2 3.70001V2H3.80002Z"
                fill="white" />
            </g>
            <g opacity="0.05">
              <path
                opacity="0.05"
                d="M23.9 15.9L15.4 24.5H2V3.70001L3.80002 2H23.9V15.9Z"
                fill="white" />
            </g>
            <g opacity="0.05">
              <path
                opacity="0.05"
                d="M15.4 24.4999L23.9 15.8999V24.4999H15.4Z"
                fill="white" />
            </g>
          </g>
        </g>
        <path
          d="M13.4001 18.4998L19.1 15.1998C19.2 15.0998 19.3 14.9999 19.3
          14.7999V8.39986C19.3 8.19986 19.2 8.09984 19.1 7.99984L13.6
          4.79985C13.5 4.69985 13.3 4.69985 13.1 4.79985L7.50003 7.99984C7.40003
          8.09984 7.30005 8.19986 7.30005 8.39986V15.0998V21.2999C7.30005
          21.5999 7.70003 21.8998 8.00003 21.6998L13.4001 18.4998ZM18.3
          14.1998L14.5 11.9998C14.2 11.7998 14.2 11.3998 14.5 11.1998L18.4001
          8.99984C18.7001 8.79984 19.1 8.99986 19.1 9.39986V13.8999C18.9 14.1999
          18.6 14.3998 18.3 14.1998ZM14.2 5.59984L18 7.79985C18.3 7.99985 18.3
          8.39984 18 8.59984L14.1 10.7999C13.8 10.9999 13.4001 10.7999 13.4001
          10.3999V5.89986C13.6001 5.69986 13.9 5.49984 14.2 5.59984ZM14.2
          12.2999L18 14.4998C18.3 14.6998 18.3 15.0999 18 15.2999L14.1
          17.4998C13.8 17.6998 13.4001 17.4998 13.4001 17.0998V12.6998C13.5001
          12.3998 13.9 12.1999 14.2 12.2999ZM12.4001 17.4998L8.60004
          15.2999C8.30004 15.0999 8.30004 14.6998 8.60004 14.4998L12.5
          12.2999C12.8 12.0999 13.2 12.2998 13.2 12.6998V17.0998C13.1 17.4998
          12.7001 17.6998 12.4001 17.4998ZM13.2 5.99984V10.4998C13.2 10.7998
          12.8 11.0999 12.5 10.8999L8.70004 8.69985C8.40004 8.49985 8.40004
          8.09986 8.70004 7.89986L12.6 5.69985C12.8 5.49985 13.2 5.69984 13.2
          5.99984ZM8.40005 8.99984L12.2 11.1998C12.5 11.3998 12.5 11.7998 12.2
          11.9998L8.30005 14.1998C8.00005 14.3998 7.60004 14.1999 7.60004
          13.7999V9.29985C7.80004 8.99985 8.10005 8.79984 8.40005
          8.99984ZM8.40005 15.6998L12.2 17.8999C12.5 18.0999 12.5 18.4998 12.2
          18.6998L8.30005 20.8999C8.00005 21.0999 7.60004 20.8998 7.60004
          20.4998V15.9998C7.70004 15.6998 8.10005 15.4998 8.40005 15.6998Z"
          fill="white" />
        <path
          d="M7.80002 21.8999C7.70002 21.8999 7.60002 21.8999 7.40002
          21.7999C7.20002 21.6999 7 21.3999 7 21.1999V8.39992C7 8.19992 7.10002
          7.89991 7.40002 7.79991L13 4.5999C13.2 4.4999 13.5 4.4999 13.7
          4.5999L19.2 7.79991C19.4 7.89991 19.5 8.19992 19.5
          8.39992V14.7999C19.5 15.0999 19.4 15.2999 19.1 15.3999L13.4 18.6999L8
          21.7999C8 21.8999 7.90002 21.8999 7.80002 21.8999ZM7.60001
          20.8999V21.1999C7.60001 21.2999 7.70001 21.3999 7.70001
          21.3999C7.70001 21.3999 7.80002 21.4999 7.90002 21.3999L8.20001
          21.1999C8.10001 21.1999 7.90002 21.1999 7.80002 21.0999C7.70002
          20.9999 7.60001 20.9999 7.60001 20.8999ZM8.20001
          15.7999H8.10001C8.10001 15.7999 8 15.8999 8 15.9999V20.4999C8 20.5999
          8.10001 20.6999 8.10001 20.6999C8.10001 20.6999 8.20002 20.7999
          8.30002 20.6999L12.2 18.4999C12.3 18.3999 12.3 18.3999 12.3
          18.2999C12.3 18.2999 12.3 18.1999 12.2 18.0999L8.40002 15.8999C8.20002
          15.8999 8.20001 15.7999 8.20001 15.7999ZM12.6 17.8999C12.7 17.9999
          12.7 18.1999 12.7 18.2999C12.7 18.3999 12.7 18.4999 12.6 18.5999L13.9
          17.7999C13.8 17.7999 13.7 17.7999 13.6 17.6999C13.5 17.5999 13.4
          17.4999 13.3 17.3999C13.2 17.4999 13.1 17.6999 13 17.6999C12.9 17.7999
          12.7 17.8999 12.6 17.8999ZM14 12.4999H13.9C13.9 12.4999 13.8 12.5999
          13.8 12.6999V17.0999C13.8 17.1999 13.9 17.2999 13.9 17.2999C13.9
          17.2999 14 17.3999 14.1 17.2999L18 15.0999C18.1 14.9999 18.1 14.9999
          18.1 14.8999C18.1 14.8999 18.1 14.7999 18 14.6999L14.2 12.4999C14.1
          12.4999 14 12.4999 14 12.4999ZM12.7 12.4999C12.7 12.4999 12.6 12.4999
          12.7 12.4999L8.70001 14.6999C8.60001 14.7999 8.60001 14.7999 8.60001
          14.8999C8.60001 14.8999 8.60001 14.9999 8.70001 15.0999L12.5
          17.2999C12.6 17.3999 12.7 17.2999 12.7 17.2999C12.7 17.2999 12.8
          17.1999 12.8 17.0999V12.6999C12.8 12.5999 12.7 12.4999 12.7
          12.4999C12.8 12.4999 12.7 12.4999 12.7 12.4999ZM7.60001
          14.1999V15.6999C7.70001 15.5999 7.70002 15.4999 7.80002
          15.4999C7.90002 15.3999 8.10002 15.3999 8.30002 15.3999C8.20002
          15.2999 8.20001 15.0999 8.20001 14.9999C8.20001 14.8999 8.30002
          14.6999 8.30002 14.5999C8.10002 14.5999 8.00002 14.5999 7.80002
          14.4999C7.70002 14.2999 7.70001 14.2999 7.60001 14.1999ZM18.4
          14.4999C18.5 14.5999 18.5 14.7999 18.5 14.8999C18.5 14.9999 18.5
          15.0999 18.4 15.2999L19 14.9999C19.1 14.9999 19.1 14.8999 19.1
          14.7999V14.1999C19 14.2999 18.9 14.3999 18.8 14.4999C18.7 14.4999 18.5
          14.5999 18.4 14.4999ZM18.5 9.19991C18.5 9.19991 18.4 9.19991 18.5
          9.19991L14.5 11.3999C14.4 11.4999 14.4 11.4999 14.4 11.5999C14.4
          11.5999 14.4 11.6999 14.5 11.7999L18.3 13.9999C18.4 14.0999 18.5
          13.9999 18.5 13.9999C18.5 13.9999 18.6 13.8999 18.6
          13.7999V9.29991C18.6 9.19991 18.5 9.09991 18.5 9.19991C18.6 9.19991
          18.5 9.19991 18.5 9.19991ZM8.20001 9.0999H8.10001C8.10001 9.0999 8
          9.19991 8 9.29991V13.7999C8 13.8999 8.10001 13.9999 8.10001
          13.9999C8.10001 13.9999 8.20002 14.0999 8.30002 13.9999L12.2
          11.7999C12.3 11.6999 12.3 11.6999 12.3 11.5999C12.3 11.5999 12.3
          11.4999 12.2 11.3999L8.40002 9.19991C8.30002 9.09991 8.20001 9.0999
          8.20001 9.0999ZM12.7 11.9999C12.8 11.9999 12.9 11.9999 13.1
          12.0999C13.2 12.1999 13.3 12.2999 13.4 12.3999C13.5 12.2999 13.6
          12.0999 13.7 12.0999C13.8 11.9999 14 11.9999 14.1 11.9999C14 11.8999
          14 11.6999 14 11.5999C14 11.3999 14.1 11.2999 14.1 11.1999C14 11.1999
          13.8 11.1999 13.7 11.0999C13.6 10.9999 13.5 10.8999 13.4 10.7999C13.3
          10.8999 13.2 11.0999 13.1 11.0999C13 11.0999 12.8 11.1999 12.7
          11.1999C12.8 11.2999 12.8 11.4999 12.8 11.5999C12.8 11.7999 12.7
          11.8999 12.7 11.9999C12.6 11.9999 12.7 11.9999 12.7 11.9999ZM14
          5.79991H13.9C13.9 5.79991 13.8 5.8999 13.8 5.9999V10.4999C13.8 10.5999
          13.9 10.6999 13.9 10.6999C13.9 10.6999 14 10.7999 14.1 10.6999L18
          8.4999C18.1 8.3999 18.1 8.39991 18.1 8.29991C18.1 8.29991 18.1 8.1999
          18 8.0999L14.2 5.89992C14.1 5.79992 14 5.79991 14 5.79991ZM12.7
          5.79991L8.70001 7.9999C8.60001 8.0999 8.60001 8.09991 8.60001
          8.19991C8.60001 8.19991 8.60001 8.29992 8.70001 8.39992L12.5
          10.5999C12.6 10.6999 12.7 10.5999 12.7 10.5999C12.7 10.5999 12.8
          10.4999 12.8 10.3999V5.89992C12.8 5.79992 12.7 5.69991 12.7
          5.79991C12.8 5.79991 12.8 5.79991 12.7 5.79991ZM18.5 8.69991C18.6
          8.69991 18.7 8.69991 18.9 8.79991C19 8.89991 19.1 8.8999 19.1
          8.9999V8.39992C19.1 8.29992 19.1 8.29991 19 8.19991L18.5 7.89992C18.6
          7.99992 18.6 8.09991 18.6 8.19991C18.6 8.39991 18.5 8.59991 18.5
          8.69991C18.4 8.69991 18.5 8.69991 18.5 8.69991ZM8.20001
          7.89992L7.70001 8.19991C7.60001 8.19991 7.60001 8.29992 7.60001
          8.39992V8.9999C7.70001 8.8999 7.70002 8.79991 7.80002 8.79991C7.90002
          8.69991 8.10001 8.69991 8.20001 8.69991C8.10001 8.59991 8.10001
          8.39991 8.10001 8.29991C8.20001 8.09991 8.20001 7.99992 8.20001
          7.89992ZM12.8 5.29991C12.9 5.29991 13 5.29992 13.1 5.39992C13.2
          5.49992 13.3 5.59991 13.4 5.69991C13.5 5.59991 13.6 5.39992 13.7
          5.39992C13.8 5.29992 13.9 5.29991 14 5.29991L13.5 4.9999C13.4 4.9999
          13.4 4.9999 13.3 4.9999L12.8 5.29991Z"
          fill="white" />
        <path
          d="M21.9 25.9H4.10001C1.90001 25.9 0 24.1 0 21.8V4.10001C0 1.90001
          1.80001 0 4.10001 0H21.8C24 0 25.9 1.80001 25.9 4.10001V21.8C25.9 24.1
          24.1 25.9 21.9 25.9ZM4.10001 1.10001C2.40001 1.10001 1 2.50001 1
          4.20001V21.9C1 23.6 2.40001 25 4.10001 25H21.8C23.5 25 24.9 23.6 24.9
          21.9V4.20001C24.9 2.50001 23.5 1.10001 21.8 1.10001H4.10001Z"
          fill="#5F5F57" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="-2.71808"
            y1="25.4307"
            x2="73.0877"
            y2="-33.7435"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#2988FE" />
            <stop offset="0.1292" stop-color="#3175F1" />
            <stop offset="0.2775" stop-color="#5C71EE" />
            <stop offset="0.5331" stop-color="#BB45CF" />
            <stop offset="0.573" stop-color="#BC85CF" />
            <stop offset="0.6173" stop-color="#BEC7CE" />
            <stop offset="0.6496" stop-color="#BFEFCE" />
            <stop offset="0.6663" stop-color="#BFFFCE" />
          </linearGradient>
        </defs>
      </svg>

    </div>

    
    <div class="flex justify-center items-end " id="robot-container">
      {#if !robotOn && !robotFly}
      <div class={`left-arm draggable`}>
        <svg
          class={`${leftArmRotationalClass}`}
          viewBox="0 0 59 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M49.9177 13.0333L48.0193 12.404C36.3442 8.5333 19.9086 13.6197
            16.038 25.2948C15.9121 25.6744 15.8177 25.9592 15.6918
            26.3389L15.3771 27.2881L23.5402 29.9944L23.8549 29.0452L23.8863
            28.9503C27.3164 18.604 40.1538 17.6977 50.5001 21.1278L50.6899
            21.1908L53.0501 14.0718L49.9177 13.0333Z"
            fill="#D5D5D5" />
          <path
            d="M24.1747 31.2582L14.1132 27.9225L14.7426 26.0241C14.837 25.7394
            14.9629 25.3597 15.0887 24.98C19.2111 12.5456 36.3741 7.48967 48.334
            11.4547L54.3139 13.4372L51.3244 22.4546L50.0905 22.0455C40.3137
            18.8042 28.488 19.5192 24.9294 28.6639L24.1747 31.2582ZM16.7359
            26.685L22.9057 28.7304L22.9371 28.6355C26.4931 17.9096 39.3615
            16.5922 50.1503 19.9583L51.8811 14.7377L47.7995 13.3846C36.8838
            9.76568 20.7954 14.4404 17.0821 25.6409C16.8613 25.9891 16.7669
            26.2738 16.7359 26.685Z"
            fill="#5F5F57" />
          <path
            d="M9.95524 37.9221C10.9622 34.8846 14.2169 33.3298 17.1594
            34.3053L18.0137 34.5886C21.0511 35.5956 22.6059 38.8502 21.6303
            41.7927L19.8681 47.1082L26.8921 49.4369C27.7418 46.8741 27.8677
            46.4944 28.4026 44.8807C30.7628 37.7618 26.8923 30.0521 19.7733
            27.6919C12.6544 25.3318 4.94468 29.2023 2.58452 36.3212C2.04956
            37.9349 1.89169 38.0933 1.07402 40.8774L8.09806 43.2061L9.86031
            37.8906L9.95524 37.9221Z"
            fill="#8D82BF" />
          <path
            d="M27.6216 50.7322L18.6991 47.7741L20.7761 41.5094C21.5943 39.0415
            20.2618 36.3874 17.7939 35.5692L16.9396 35.286C14.4717 34.4678
            11.8176 35.8002 10.9994 38.2682L8.92244 44.5329L-4.23764e-06
            41.5748L0.314683 40.6256C0.912588 38.8221 1.16434 38.0627 1.38463
            37.3983C1.5105 37.0186 1.63637 36.639 1.82519 36.0694C4.34268
            28.4759 12.5894 24.2566 20.2779 26.8056C27.9664 29.3546 32.0907
            37.5698 29.5417 45.2583C29.3214 45.9227 29.1641 46.3974 28.9752
            46.9669C28.755 47.6313 28.5032 48.3907 28.0312 49.8145L27.7165
            50.7637L27.6216 50.7322ZM21.2269 46.5051L26.3526 48.2044C26.6358
            47.3501 26.8246 46.7806 26.9819 46.306C27.1708 45.7365 27.2966
            45.3568 27.5484 44.5975C29.7197 38.048 26.1979 30.8753 19.5536
            28.6725C13.0041 26.5012 5.83147 30.023 3.62867 36.6673C3.43985
            37.2369 3.31398 37.6165 3.18811 37.9962C2.99929 38.5657 2.81047
            39.1353 2.43285 40.2743L7.5585 41.9736L9.00606 37.6073C10.1704
            34.0953 13.9621 32.1918 17.4741 33.3561L18.3284 33.6393C21.8404
            34.8037 23.7439 38.5953 22.5796 42.1073L21.132 46.4736L21.2269
            46.5051Z"
            fill="#5F5F57" />
          <path
            d="M16.8501 23.2906L24.4429 27.3291L25.1473 26.0048L17.5545
            21.9663L16.8501 23.2906Z"
            fill="#5F5F57" />
          <path
            d="M21.8172 17.2893L27.5262 23.3137L28.615 22.282L22.9059
            16.2576L21.8172 17.2893Z"
            fill="#5F5F57" />
          <path
            d="M28.4918 13.3947L31.8762 20.7539L33.239 20.1272L29.8546
            12.768L28.4918 13.3947Z"
            fill="#5F5F57" />
          <path
            d="M35.3899 11.2022L36.7974 19.4839L38.2763 19.2326L36.8688
            10.9508L35.3899 11.2022Z"
            fill="#5F5F57" />
          <path
            d="M42.3429 10.7258L41.1546 19.3445L42.6406 19.5494L43.8288
            10.9307L42.3429 10.7258Z"
            fill="#5F5F57" />
          <path
            d="M57.1042 18.0495L52.3582 16.4761L51.603 18.7541L56.3489
            20.3276L57.1042 18.0495Z"
            fill="#5F5F57" />
        </svg>
      </div>

      <div class={`head draggable`} on:dblclick={onDoubleClicked}>
        <div class="typewriter text-bubble fadeInOut">
          <h4 class="text-white text-xs">{robotDialogue}</h4>
          <hr class="diagonal" />
        </div>
        <div class={`${headRotationalClass} -mb-4`}>
          <svg
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M110.439 108.981L108.72 110.657L112.211 114.237L113.929
              112.561L110.439 108.981Z"
              fill="#5F5F57" />
            <path
              d="M108.736 98.2111L97.4951 109.172L104.686 116.546L115.927
              105.585L108.736 98.2111Z"
              fill="#8D82BF" />
            <path
              d="M117.41 105.675L104.738 118.032L96.081 109.154L108.753
              96.797L117.41 105.675ZM104.774 115.204L114.582 105.639L108.718
              99.6252L98.9092 109.19L104.774 115.204Z"
              fill="#5F5F57" />
            <path
              d="M46.7212 126L37.9039 129.849C36.5525 130.468 35.0006 130.166
              33.9533 129.092L23.132 117.995C22.0847 116.921 21.8215 115.362
              22.4748 114.027L26.5446 105.309C27.5629 103.059 30.4681 102.6
              32.2135 104.39L47.7124 120.284C49.4578 122.074 48.9264 124.967
              46.7212 126Z"
              fill="#8D82BF" />
            <path
              d="M48.5577 126.165C48.1282 126.583 47.7004 126.861 47.1312
              127.137L38.3139 130.986C36.5365 131.741 34.3491 131.36 33.0226
              130L22.2013 118.903C20.805 117.471 20.4074 115.344 21.3488
              113.588L25.4187 104.871C26.1435 103.465 27.4287 102.492 28.9179
              102.157C30.477 101.893 31.9556 102.407 33.0726 103.553L48.5716
              119.447C49.6886 120.592 50.0933 122.153 49.8625 123.635C49.7086
              124.623 49.2737 125.466 48.5577 126.165ZM46.2414 124.792C46.952
              124.518 47.455 123.888 47.5354 123.111C47.6858 122.406 47.4834
              121.625 46.9947 121.124L31.4259 105.158C30.9372 104.657 30.1621
              104.435 29.4533 104.568C28.7445 104.7 28.1019 105.187 27.7404
              105.819L23.6705 114.537C23.2356 115.38 23.4344 116.443 24.0627
              117.087L34.8841 128.185C35.5124 128.829 36.5703 129.054 37.4241
              128.641L46.2414 124.792Z"
              fill="#5F5F57" />
            <path
              d="M126.639 46.6721L130.709 37.9545C131.362 36.6191 131.099 35.06
              130.052 33.9861L119.23 22.8889C118.183 21.815 116.631 21.5126
              115.28 22.132L106.462 25.9812C104.187 26.9426 103.656 29.8352
              105.401 31.6251L120.9 47.5192C122.644 49.4505 125.621 48.9222
              126.639 46.6721Z"
              fill="#8D82BF" />
            <path
              d="M126.755 48.6537C126.04 49.3519 125.186 49.7654 124.264
              49.966C122.705 50.2292 121.226 49.7156 120.109 48.5701L104.61
              32.676C103.493 31.5305 103.089 29.9696 103.319 28.4875C103.622
              26.9355 104.628 25.6753 106.12 25.0576L114.938 21.2085C116.715
              20.453 118.902 20.8341 120.229 22.1944L130.981 33.22C132.377
              34.6519 132.774 36.7784 131.833 38.5345L127.763 47.2521C127.473
              47.8141 127.113 48.3046 126.755 48.6537ZM106.3 27.6764C106.013
              27.9557 105.725 28.3763 105.648 28.8704C105.498 29.5756 105.7
              30.356 106.189 30.8572L121.688 46.7513C122.177 47.2525 122.952
              47.4744 123.66 47.3419C124.369 47.2093 125.012 46.7224 125.373
              46.0905L129.443 37.3729C129.878 36.5298 129.679 35.4666 129.051
              34.8222L118.23 23.725C117.601 23.0807 116.543 22.8552 115.69
              23.2687L106.872 27.1179C106.727 27.3989 106.514 27.467 106.3
              27.6764Z"
              fill="#5F5F57" />
            <path
              d="M143.429 66.7547L65.6051 142.644C63.5289 144.669 60.2764
              144.628 58.2518 142.551L15.455 98.6636C13.4304 96.5874 13.4713
              93.3349 15.5476 91.3103L93.3713 15.4212C95.4475 13.3965 98.7
              13.4375 100.725 15.5137L143.521 59.4014C145.546 61.4777 145.433
              64.7999 143.429 66.7547Z"
              fill="#A3BCD3" />
            <path
              d="M144.336 67.6855L66.5127 143.575C64.0068 146.018 59.9059
              145.967 57.4624 143.461L14.6657 99.5731C12.2222 97.0672 12.2738
              92.9663 14.7796 90.5228L92.6033 14.6337C95.1091 12.1901 99.21
              12.2418 101.654 14.7476L144.45 58.6353C146.965 61.0713 146.842
              65.242 144.336 67.6855ZM16.4552 92.2411C14.8801 93.777 14.9196
              96.2526 16.3858 97.7561L59.1825 141.644C60.7184 143.219 63.194
              143.179 64.6975 141.713L142.521 65.8241C144.096 64.2881 144.057
              61.8125 142.591 60.3091L99.7939 16.4214C98.258 14.8463 95.7824
              14.8858 94.2789 16.352L16.4552 92.2411Z"
              fill="#5F5F57" />
            <path
              d="M124.464 67.7891L66.7582 124.06C63.3217 127.411 57.8067 127.342
              54.4556 123.905L28.4145 97.2004L98.5776 28.7815L124.619
              55.4864C127.898 58.9928 127.9 64.438 124.464 67.7891Z"
              fill="#D5D5D5" />
            <path
              d="M125.302 68.6482L67.596 124.919C63.6583 128.759 57.3665 128.609
              53.5964 124.743L26.6478 97.1074L98.6007 26.9431L125.549
              54.5788C129.246 58.6561 129.239 64.8084 125.302 68.6482ZM30.1114
              97.2217L55.3147 123.068C58.1771 126.003 62.8437 126.062 65.7791
              123.199L123.485 66.9282C126.42 64.0657 126.479 59.3992 123.616
              56.4638L98.413 30.618L30.1114 97.2217Z"
              fill="#5F5F57" />
            <path
              d="M124.464 67.7889L66.7583 124.06C63.3217 127.411 57.8067 127.342
              54.4556 123.905L28.4146 97.2002L98.5776 28.7813L124.619
              55.4862C127.898 58.9926 127.9 64.4378 124.464 67.7889Z"
              fill="#5F5F57" />
            <g opacity="0.03">
              <g opacity="0.03">
                <g opacity="0.03">
                  <path
                    opacity="0.03"
                    d="M76.5979 50.2147L71.5519 74.6898L61.7778 64.6665L76.5979
                    50.2147Z"
                    fill="white" />
                </g>
                <g opacity="0.03">
                  <path
                    opacity="0.03"
                    d="M127.27 58.3484L125.538 66.7419L93.8928 97.6002L71.5519
                    74.6898L76.5979 50.2147L98.506 28.8513L127.27 58.3484Z"
                    fill="white" />
                </g>
                <g opacity="0.03">
                  <path
                    opacity="0.03"
                    d="M125.538 66.7417L127.27 58.3483L130.621 61.7849L125.538
                    66.7417Z"
                    fill="white" />
                </g>
              </g>
            </g>
            <path
              d="M65.5479 46.0449L45.7877 65.3139L42.7857 62.2353C41.1101 60.517
              41.1439 57.8302 42.8622 56.1547L56.4653 42.8898C58.1835 41.2142
              60.8703 41.248 62.5459 42.9663L65.5479 46.0449Z"
              fill="#8D82BF" />
            <path
              d="M67.3863 46.068L45.8362 67.0824L41.9266 63.073C39.7623 60.8536
              39.8068 57.3184 42.0262 55.1541L55.6292 41.8892C57.8487 39.7249
              61.384 39.7694 63.5482 41.9889L67.3863 46.068ZM45.8091
              63.6169L63.7795 46.0933L61.6152 43.8739C60.4283 42.6567 58.4486
              42.6318 57.2315 43.8187L43.6284 57.0836C42.4113 58.2704 42.3864
              60.2502 43.5732 61.4673L45.8091 63.6169Z"
              fill="#5F5F57" />
            <g opacity="0.5">
              <g opacity="0.5">
                <path
                  opacity="0.5"
                  d="M95.1673 24.4248L24.0736 93.7513C23.8588 93.9607 23.8552
                  94.2435 24.0647 94.4583L26.5082 96.9641L98.3895 26.8697L95.946
                  24.3639C95.6649 24.2189 95.3821 24.2153 95.1673 24.4248Z"
                  fill="#97AFC1" />
              </g>
            </g>
            <path
              d="M27.9335 79.2322L27.6471 79.5115L36.7929 88.8904L37.0793
              88.6112L27.9335 79.2322Z"
              fill="#D5D5D5" />
            <path
              d="M27.9549 77.5354L25.8786 79.5601L36.7698 90.7289L38.846
              88.7042L27.9549 77.5354Z"
              fill="#5F5F57" />
            <path
              d="M81.1286 27.3594L80.8422 27.6387L89.988 37.0176L90.2744
              36.7383L81.1286 27.3594Z"
              fill="#D5D5D5" />
            <path
              d="M81.1499 25.6626L79.0737 27.6873L89.9648 38.8561L92.0411
              36.8314L81.1499 25.6626Z"
              fill="#5F5F57" />
            <g opacity="0.5">
              <g opacity="0.5">
                <path
                  opacity="0.5"
                  d="M70.4389 129.41L132.655 68.7408C135.734 65.7387 135.724
                  60.8592 132.792 57.8522L101.375 25.6345C100.537 24.7753
                  100.127 23.6387 100.142 22.5074L100.213 16.851L142.451
                  60.166C143.987 61.7411 143.955 64.2864 142.38 65.8224L67.9927
                  138.36L68.6295 132.711C68.7851 131.582 69.4366 130.388 70.4389
                  129.41Z"
                  fill="#97AFC1" />
              </g>
            </g>
            <path
              d="M76.8517 69.382C76.4453 67.9626 76.0371 66.6845 75.6288
              65.4065C75.3567 64.5545 75.3567 64.5545 74.5763 64.7568C74.0089
              64.8911 73.5828 65.0272 73.0154 65.1615C72.661 65.2277 72.6592
              65.3691 72.7971 65.6537C73.3396 67.4992 73.8821 69.3447 74.4246
              71.1901C74.4908 71.5445 74.4175 71.7557 74.2027 71.9652C70.5514
              75.5258 66.9716 79.0165 63.3203 82.5771C62.9623 82.9262 62.9605
              83.0676 63.3096 83.4256C67.1494 87.3633 70.9194 91.2294 74.7593
              95.1671C75.1083 95.5251 75.2498 95.5269 75.6077 95.1778C77.1112
              93.7117 78.6147 92.2456 80.1182 90.7794C80.3295 90.8528 80.2561
              91.064 80.3259 91.1356C80.7341 92.4137 81.1405 93.8331 81.5488
              95.1111C81.615 95.4656 81.7564 95.4673 82.1108 95.4011C82.7498
              95.197 83.3889 94.9929 84.0977 94.8603C84.4521 94.7941 84.5255
              94.5829 84.4592 94.2285C83.9167 92.383 83.3724 90.679 82.8299
              88.8335C82.6939 88.4075 82.7672 88.1963 83.0536 87.917C86.6334
              84.4263 90.2847 80.8657 93.8644 77.3749C94.294 76.956 94.1544
              76.8128 93.8053 76.4549C92.6883 75.3093 91.5712 74.1638 90.4542
              73.0183C90.2447 72.8035 90.2465 72.6621 90.4613 72.4527C90.9625
              71.964 91.4636 71.4753 91.9648 70.9866C92.1796 70.7771 92.1813
              70.6357 91.9719 70.4209C90.785 69.2038 89.5982 67.9867 88.3415
              66.698C88.1321 66.4832 88.0605 66.553 87.9173 66.6926C87.4161
              67.1813 86.8434 67.7399 86.3422 68.2286C86.0558 68.5078 85.9144
              68.506 85.6351 68.2197C84.5181 67.0741 83.4011 65.9286 82.284
              64.7831C82.0048 64.4967 81.7935 64.4234 81.4355 64.7724C79.8587
              66.4498 78.4268 67.8461 76.8517 69.382ZM81.4603 85.2805C81.4621
              85.1391 81.3923 85.0674 81.3225 84.9959C80.1712 80.9505 78.9483
              76.9751 77.7273 72.8581C77.6592 72.6451 77.7326 72.4339 77.8758
              72.2943C79.0213 71.1772 80.1668 70.0602 81.3123 68.9431C81.5271
              68.7337 81.6686 68.7355 81.878 68.9503C84.3914 71.5277 86.9745
              74.1767 89.4879 76.7541C89.6973 76.9689 89.6955 77.1103 89.4807
              77.3198C88.908 77.8783 88.3352 78.4368 87.7624 78.9953C85.756
              81.0916 83.6082 83.186 81.4603 85.2805ZM75.4398 74.8094C76.7307
              78.9979 77.9518 83.1148 79.103 87.1601C79.2409 87.4447 79.0977
              87.5844 78.9545 87.724C77.809 88.841 76.6635 89.9581 75.5895
              91.0053C75.3031 91.2846 75.2333 91.213 74.9541 90.9266C72.4407
              88.3492 69.9274 85.7718 67.414 83.1943C67.1348 82.908 67.1365
              82.7666 67.4229 82.4873C69.4276 80.5325 71.3607 78.6474 73.3653
              76.6926C73.8647 76.3453 74.5806 75.6472 75.4398 74.8094Z"
              fill="#FCFCFC" />
          </svg>
        </div>

      </div>

      <div class="body draggable">
        <svg
          class={`${bodyRotationalClass}`}
          viewBox="0 0 74 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M61.3381 46.3589L8.03329 39.8561C5.15463 39.5049 3.06293 36.8319
            3.41411 33.9533L6.61101 7.74756C6.96218 4.8689 9.63513 2.7772
            12.5138 3.12837L65.8186 9.63116C68.6973 9.98234 70.789 12.6553
            70.4378 15.5339L67.2409 41.7397C66.989 44.6304 64.2168 46.7101
            61.3381 46.3589Z"
            fill="#A3BCD3" />
          <path
            d="M61.217 47.3515L7.91216 40.8487C4.43791 40.4249 1.9976 37.3064
            2.42143 33.8321L5.61833 7.62643C6.04216 4.15219 9.16061 1.71187
            12.6349 2.1357L65.9397 8.63849C69.4139 9.06232 71.8542 12.1808
            71.4304 15.655L68.2335 41.8607C67.9211 45.2478 64.6912 47.7753
            61.217 47.3515ZM12.3927 4.12098C10.0103 3.83035 7.89424 5.48628
            7.60361 7.86862L4.40671 34.0743C4.11608 36.4567 5.77201 38.5728
            8.15435 38.8634L61.4592 45.3662C63.8415 45.6568 65.9576 44.0009
            66.2482 41.6185L69.4451 15.4128C69.7358 13.0305 68.0798 10.9144
            65.6975 10.6238L12.3927 4.12098Z"
            fill="#5F5F57" />
          <path
            d="M14.9923 19.1463C16.8563 19.3737 18.5517 18.047 18.7791
            16.183C19.0064 14.3191 17.6797 12.6237 15.8158 12.3963C13.9518
            12.169 12.2565 13.4956 12.0291 15.3596C11.8017 17.2235 13.1284
            18.9189 14.9923 19.1463Z"
            fill="#FF4324" />
          <path
            d="M14.9318 19.6426C12.7479 19.3762 11.2784 17.3836 11.5327
            15.299C11.787 13.2145 13.7918 11.6457 15.8763 11.9C17.9608 12.1543
            19.5297 14.159 19.2754 16.2436C19.0211 18.3281 16.917 19.8848
            14.9318 19.6426ZM15.7552 12.8926C14.167 12.6989 12.7191 13.8319
            12.5254 15.4201C12.3316 17.0083 13.4646 18.4562 15.0529
            18.65C16.6411 18.8437 18.089 17.7107 18.2827 16.1225C18.4765 14.5342
            17.2442 13.0743 15.7552 12.8926Z"
            fill="#5F5F57" />
          <path
            d="M42.4904 35.6981L29.6853 34.1359C27.6008 33.8816 26.3055 32.1118
            26.5477 30.1265L28.0977 17.4207C28.3399 15.4354 30.1219 14.0409
            32.1072 14.2831L44.813 15.8331C46.7983 16.0753 48.1928 17.8573
            47.9506 19.8426L46.4006 32.5484C46.0591 34.5216 44.3764 35.9281
            42.4904 35.6981Z"
            fill="#5F5F57" />
          <path
            d="M35.1503 19.893L33.8599 19.7356L33.206 25.0959L34.4964
            25.2533L35.1503 19.893Z"
            fill="#A3BCD3" />
          <path
            d="M41.8009 20.7043L40.5105 20.5469L39.8566 25.9071L41.147
            26.0646L41.8009 20.7043Z"
            fill="#A3BCD3" />
          <path
            d="M37.997 30.415L35.4161 30.1002L35.5735 28.8097C35.6583 28.1149
            36.3266 27.5919 37.0214 27.6767C37.7163 27.7615 38.2392 28.4297
            38.1544 29.1246L37.997 30.415Z"
            fill="#A3BCD3" />
          <g opacity="0.5">
            <path
              opacity="0.5"
              d="M7.15215 35.5175L8.04313 34.8203L59.5612 41.1051C60.9509
              41.2746 62.2874 40.2288 62.4569 38.8391L65.0726 17.398L69.082
              14.2604L65.7277 41.7566C65.4734 43.8412 63.58 45.3228 61.4955
              45.0685L7.89289 38.5294C6.61457 38.2727 6.03842 36.389 7.15215
              35.5175Z"
              fill="#97AFC1" />
          </g>
          <path
            d="M14.5847 40.6553L9.62146 40.0498L9.33083 42.4321L14.294
            43.0376L14.5847 40.6553Z"
            fill="#5F5F57" />
          <path
            d="M6.5481 7.4376L4.16577 7.14697L3.5603 12.1102L5.94263
            12.4008L6.5481 7.4376Z"
            fill="#5F5F57" />
          <path
            d="M72.8951 16.0353L70.5128 15.7446L69.9073 20.7078L72.2897
            20.9985L72.8951 16.0353Z"
            fill="#5F5F57" />
          <path
            d="M43.6513 4.7107L38.6881 4.10522L38.3975 6.48756L43.3607
            7.09303L43.6513 4.7107Z"
            fill="#5F5F57" />
          <path
            d="M60.7667 46.0877L55.8035 45.4822L55.5128 47.8645L60.476
            48.47L60.7667 46.0877Z"
            fill="#5F5F57" />
        </svg>

      </div>

      <div class="right-arm draggable">
        <svg
          class={`${rightArmRotationalClass}`}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M56.4432 39.5319L54.8309 40.7154C44.9156 47.9938 27.7124 48.2171
            20.4339 38.3017C20.1972 37.9793 20.0197 37.7375 19.783
            37.415L19.1913 36.6089L26.1239 31.5199L26.7157 32.326L26.7748
            32.4066C33.2249 41.1933 45.7173 38.1016 54.5041 31.6515L54.6653
            31.5332L59.1034 37.5791L56.4432 39.5319Z"
            fill="#D5D5D5" />
          <path
            d="M17.874 36.3353L26.4189 30.0628L28.1941 32.4811C34.3586 39.8649
            45.7704 36.822 53.9929 30.7862L55.0409 30.0169L60.6625
            37.675L55.5839 41.4031C45.4267 48.8591 27.5409 49.3353 19.789
            38.7751C19.5523 38.4526 19.3156 38.1302 19.0789 37.8077L17.874
            36.3353ZM25.9095 32.9177L20.6697 36.764C20.9064 37.0865 21.0839
            37.3283 21.3206 37.6507C28.3032 47.163 45.0493 46.6551 54.3198
            39.85L57.7055 37.3647L54.4509 32.931C45.2233 39.4565 32.6554 42.1075
            25.9095 32.9177Z"
            fill="#5F5F57" />
          <path
            d="M10.8382 28.1027C12.7318 30.6823 16.3071 31.1591 18.8061
            29.3246L19.5316 28.7921C22.1112 26.8985 22.5879 23.3232 20.7535
            20.8242L17.4397 16.3099L23.4051 11.931C25.0028 14.1075 25.2395 14.43
            26.2454 15.8004C30.6836 21.8463 29.3759 30.3733 23.3299
            34.8114C17.284 39.2495 8.8376 37.8827 4.39949 31.8367C3.39352
            30.4663 3.19455 30.3643 1.5591 27.9673L7.52443 23.5884L10.8382
            28.1027Z"
            fill="#8D82BF" />
          <path
            d="M0.0806395 27.812L7.6582 22.2496L11.5637 27.57C13.1023 29.6659
            16.0378 30.1161 18.1337 28.5776L18.8592 28.045C20.9552 26.5065
            21.4053 23.5709 19.8668 21.475L15.9613 16.1546L23.5388
            10.5922L24.1306 11.3983C25.0182 12.6075 25.4916 13.2524 25.9058
            13.8167C26.2017 14.2197 26.4976 14.6228 26.971 15.2677C31.7049
            21.7167 30.3707 30.8835 23.8411 35.6766C17.3115 40.4698 8.22532
            39.0763 3.43217 32.5467C3.07712 32.063 2.84042 31.7406 2.60372
            31.4181C2.13033 30.7732 1.71609 30.2089 0.591769 28.6773L0.0806395
            27.812ZM7.31006 24.9861L2.95697 28.1816C3.66707 29.1489 4.02213
            29.6326 4.37718 30.1163C4.61388 30.4388 4.85058 30.7612 5.20562
            31.2449C9.28868 36.8071 17.1759 38.0882 22.8188 33.946C28.4617
            29.8038 29.6622 21.9757 25.5199 16.3328C25.1057 15.7686 24.8098
            15.3655 24.4548 14.8818C24.1589 14.4787 23.8039 13.9951 23.2713
            13.2696L18.9182 16.465L21.6403 20.1732C23.8297 23.1558 23.1866
            27.3494 20.204 29.5389L19.4784 30.0715C16.4958 32.2609 12.3022
            31.6178 10.1127 28.6352L7.31006 24.9861Z"
            fill="#5F5F57" />
          <path
            d="M30.1864 34.8031L29.1083 33.7603L22.3642 40.7324L23.4424
            41.7753L30.1864 34.8031Z"
            fill="#5F5F57" />
          <path
            d="M34.0482 37.4297L32.6686 36.8408L29.4103 44.4744L30.7899
            45.0633L34.0482 37.4297Z"
            fill="#5F5F57" />
          <path
            d="M39.848 38.2503L38.3578 38.0791L37.4674 45.8281L38.9576
            45.9993L39.848 38.2503Z"
            fill="#5F5F57" />
          <path
            d="M44.4394 36.7637L42.9877 37.1409L45.0497 45.0771L46.5015
            44.6999L44.4394 36.7637Z"
            fill="#5F5F57" />
          <path
            d="M49.3481 34.8682L47.9864 35.4973L51.3417 42.7599L52.7034
            42.1307L49.3481 34.8682Z"
            fill="#5F5F57" />
          <path
            d="M57.9036 35.6067L61.9342 32.6479L60.514 30.7133L56.4834
            33.672L57.9036 35.6067Z"
            fill="#5F5F57" />
        </svg>

      </div>

      <div class="right-leg draggable">

        <svg
          class={`${rightLegRotationalClass}  right-leg-inner`}
          viewBox="0 0 29 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6 4.69995H10.2V17.8H17.6V4.69995Z" fill="#D5D5D5" />
          <path
            d="M18.7 18.8H9.29999V3.69995H18.7V18.8ZM11.2
            16.8H16.6V5.69995H11.2V16.8Z"
            fill="#5F5F57" />
          <path
            d="M13.9 16.3C7.50002 16.3 2.40002 21.5 2.40002
            27.8V39H25.4V27.8C25.4 21.4 20.4 16.3 13.9 16.3Z"
            fill="#A3BCD3" />
          <path
            d="M26.4 40H1.40002V27.8C1.40002 20.9 7.00002 15.3 13.9 15.3C20.8
            15.3 26.4 20.9 26.4 27.8V40ZM3.40002 38H24.4V27.8C24.4 22 19.7 17.3
            13.9 17.3C8.10002 17.3 3.40002 22 3.40002 27.8V38Z"
            fill="#5F5F57" />
          <path
            d="M24.5 38.8H3.60001C2.10001 38.8 0.799988 40 0.799988
            41.6V44.9001H27.2V41.6C27.4 40 26.2 38.8 24.5 38.8Z"
            fill="#8D82BF" />
          <path
            d="M28.4 45.9001H0V41.6C0 39.5 1.69999 37.8 3.79999 37.8H24.7C26.8
            37.8 28.5 39.5 28.5 41.6L28.4 45.9001ZM1.89999
            43.9001H26.3V41.6C26.3 40.6 25.5 39.8 24.5 39.8H3.60001C2.60001 39.8
            1.79999 40.6 1.79999 41.6L1.89999 43.9001Z"
            fill="#5F5F57" />
          <path d="M18.1 8.30005H10.7V9.80005H18.1V8.30005Z" fill="#5F5F57" />
          <path d="M18.1 12.5H10.7V14H18.1V12.5Z" fill="#5F5F57" />
          <g opacity="0.5">
            <path
              opacity="0.5"
              d="M24.4 27C24.4 27.3 24.4 37.8 24.4 37.8H17.1V17.8C17.2 17.8 23.9
              19.7 24.4 27Z"
              fill="#97AFC1" />
          </g>
          <path d="M15.1 0H12.7V5H15.1V0Z" fill="#5F5F57" />
        </svg>

      </div>

      <div class="left-leg draggable">
        <svg
          class={`${leftLegRotationalClass} left-leg-inner`}
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42.1471 18.0386L41.7256 10.6506L28.6468 11.3968L29.0683
            18.7848L42.1471 18.0386Z"
            fill="#D5D5D5" />
          <path
            d="M28.1212 19.7404L27.5858 10.3557L42.6613 9.49561L43.1967
            18.8803L28.1212 19.7404ZM29.7021 12.3383L30.0097 17.7296L41.0917
            17.0973L40.7841 11.7061L29.7021 12.3383Z"
            fill="#5F5F57" />
          <path
            d="M30.3552 15.0055C29.9907 8.61589 24.5086 3.82036 18.2189
            4.1792L7.03707 4.81713L8.34712 27.7798L19.5289 27.1419C25.9185
            26.7773 30.7141 21.2953 30.3552 15.0055Z"
            fill="#A3BCD3" />
          <path
            d="M7.40569 28.835L5.98172 3.87563L18.1619 3.18073C25.0507 2.78772
            30.9606 8.05966 31.3536 14.9485C31.7466 21.8373 26.4747 27.7471
            19.5859 28.1401L7.40569 28.835ZM8.08669 5.65862L9.28283
            26.6245L19.4662 26.0436C25.2568 25.7132 29.6815 20.7531 29.3511
            14.9625C29.0208 9.17195 24.0607 4.74728 18.2701 5.07764L8.08669
            5.65862Z"
            fill="#5F5F57" />
          <path
            d="M8.48973 26.7702L7.30499 6.00395C7.21955 4.50639 5.94747 3.27685
            4.35007 3.36798L1.0554 3.55594L2.55912 29.9131L5.85378
            29.7251C7.45118 29.634 8.57517 28.2678 8.48973 26.7702Z"
            fill="#8D82BF" />
          <path
            d="M1.61769 30.9683L5.79277e-05 2.61444L4.2931 2.36952C6.38969
            2.24991 8.18374 3.85032 8.30336 5.94691L9.4938 26.813C9.61341
            28.9096 8.01301 30.7036 5.91642 30.8233L1.62338 31.0682L1.61769
            30.9683ZM2.11073 4.49728L3.50052 28.8577L5.79681 28.7267C6.79518
            28.6697 7.54831 27.8254 7.49135 26.8271L6.3066 6.06083C6.24965
            5.06245 5.40539 4.30931 4.40701 4.36627L2.11073 4.49728Z"
            fill="#5F5F57" />
          <path
            d="M38.553 18.2437L38.1315 10.8557L36.6339 10.9412L37.0554
            18.3292L38.553 18.2437Z"
            fill="#5F5F57" />
          <path
            d="M34.3597 18.483L33.9382 11.095L32.4407 11.1804L32.8622
            18.5684L34.3597 18.483Z"
            fill="#5F5F57" />
          <g opacity="0.5">
            <path
              opacity="0.5"
              d="M20.2707 26.0978C19.9712 26.1149 9.48818 26.713 9.48818
              26.713L9.07239 19.4248L29.0399 18.2856C29.0456 18.3855 27.5189
              24.9831 20.2707 26.0978Z"
              fill="#97AFC1" />
          </g>
          <path
            d="M46.697 15.2753L46.5603 12.8792L41.5684 13.1639L41.7051
            15.5601L46.697 15.2753Z"
            fill="#5F5F57" />
        </svg>

      </div>

      <div class="battery draggable">
        <svg
          class={`${batteryRotationalClass} battery-inner`}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.5 25.6H4.30002C2.20002 25.6 0.400024 23.9 0.400024
            21.7V4.70004C0.400024 2.60004 2.10002 0.800049 4.30002
            0.800049H21.5C23.6 0.800049 25.4 2.50004 25.4 4.70004V21.7C25.4 23.9
            23.7 25.6 21.5 25.6Z"
            fill="url(#paint0_linear)" />
          <g opacity="0.05">
            <g opacity="0.05">
              <g opacity="0.05">
                <path
                  opacity="0.05"
                  d="M3.80002 2L2 3.70001V2H3.80002Z"
                  fill="white" />
              </g>
              <g opacity="0.05">
                <path
                  opacity="0.05"
                  d="M23.9 15.9L15.4 24.5H2V3.70001L3.80002 2H23.9V15.9Z"
                  fill="white" />
              </g>
              <g opacity="0.05">
                <path
                  opacity="0.05"
                  d="M15.4 24.4999L23.9 15.8999V24.4999H15.4Z"
                  fill="white" />
              </g>
            </g>
          </g>
          <path
            d="M13.4001 18.4998L19.1 15.1998C19.2 15.0998 19.3 14.9999 19.3
            14.7999V8.39986C19.3 8.19986 19.2 8.09984 19.1 7.99984L13.6
            4.79985C13.5 4.69985 13.3 4.69985 13.1 4.79985L7.50003
            7.99984C7.40003 8.09984 7.30005 8.19986 7.30005
            8.39986V15.0998V21.2999C7.30005 21.5999 7.70003 21.8998 8.00003
            21.6998L13.4001 18.4998ZM18.3 14.1998L14.5 11.9998C14.2 11.7998 14.2
            11.3998 14.5 11.1998L18.4001 8.99984C18.7001 8.79984 19.1 8.99986
            19.1 9.39986V13.8999C18.9 14.1999 18.6 14.3998 18.3 14.1998ZM14.2
            5.59984L18 7.79985C18.3 7.99985 18.3 8.39984 18 8.59984L14.1
            10.7999C13.8 10.9999 13.4001 10.7999 13.4001 10.3999V5.89986C13.6001
            5.69986 13.9 5.49984 14.2 5.59984ZM14.2 12.2999L18 14.4998C18.3
            14.6998 18.3 15.0999 18 15.2999L14.1 17.4998C13.8 17.6998 13.4001
            17.4998 13.4001 17.0998V12.6998C13.5001 12.3998 13.9 12.1999 14.2
            12.2999ZM12.4001 17.4998L8.60004 15.2999C8.30004 15.0999 8.30004
            14.6998 8.60004 14.4998L12.5 12.2999C12.8 12.0999 13.2 12.2998 13.2
            12.6998V17.0998C13.1 17.4998 12.7001 17.6998 12.4001 17.4998ZM13.2
            5.99984V10.4998C13.2 10.7998 12.8 11.0999 12.5 10.8999L8.70004
            8.69985C8.40004 8.49985 8.40004 8.09986 8.70004 7.89986L12.6
            5.69985C12.8 5.49985 13.2 5.69984 13.2 5.99984ZM8.40005 8.99984L12.2
            11.1998C12.5 11.3998 12.5 11.7998 12.2 11.9998L8.30005
            14.1998C8.00005 14.3998 7.60004 14.1999 7.60004
            13.7999V9.29985C7.80004 8.99985 8.10005 8.79984 8.40005
            8.99984ZM8.40005 15.6998L12.2 17.8999C12.5 18.0999 12.5 18.4998 12.2
            18.6998L8.30005 20.8999C8.00005 21.0999 7.60004 20.8998 7.60004
            20.4998V15.9998C7.70004 15.6998 8.10005 15.4998 8.40005 15.6998Z"
            fill="white" />
          <path
            d="M7.80002 21.8999C7.70002 21.8999 7.60002 21.8999 7.40002
            21.7999C7.20002 21.6999 7 21.3999 7 21.1999V8.39992C7 8.19992
            7.10002 7.89991 7.40002 7.79991L13 4.5999C13.2 4.4999 13.5 4.4999
            13.7 4.5999L19.2 7.79991C19.4 7.89991 19.5 8.19992 19.5
            8.39992V14.7999C19.5 15.0999 19.4 15.2999 19.1 15.3999L13.4
            18.6999L8 21.7999C8 21.8999 7.90002 21.8999 7.80002 21.8999ZM7.60001
            20.8999V21.1999C7.60001 21.2999 7.70001 21.3999 7.70001
            21.3999C7.70001 21.3999 7.80002 21.4999 7.90002 21.3999L8.20001
            21.1999C8.10001 21.1999 7.90002 21.1999 7.80002 21.0999C7.70002
            20.9999 7.60001 20.9999 7.60001 20.8999ZM8.20001
            15.7999H8.10001C8.10001 15.7999 8 15.8999 8 15.9999V20.4999C8
            20.5999 8.10001 20.6999 8.10001 20.6999C8.10001 20.6999 8.20002
            20.7999 8.30002 20.6999L12.2 18.4999C12.3 18.3999 12.3 18.3999 12.3
            18.2999C12.3 18.2999 12.3 18.1999 12.2 18.0999L8.40002
            15.8999C8.20002 15.8999 8.20001 15.7999 8.20001 15.7999ZM12.6
            17.8999C12.7 17.9999 12.7 18.1999 12.7 18.2999C12.7 18.3999 12.7
            18.4999 12.6 18.5999L13.9 17.7999C13.8 17.7999 13.7 17.7999 13.6
            17.6999C13.5 17.5999 13.4 17.4999 13.3 17.3999C13.2 17.4999 13.1
            17.6999 13 17.6999C12.9 17.7999 12.7 17.8999 12.6 17.8999ZM14
            12.4999H13.9C13.9 12.4999 13.8 12.5999 13.8 12.6999V17.0999C13.8
            17.1999 13.9 17.2999 13.9 17.2999C13.9 17.2999 14 17.3999 14.1
            17.2999L18 15.0999C18.1 14.9999 18.1 14.9999 18.1 14.8999C18.1
            14.8999 18.1 14.7999 18 14.6999L14.2 12.4999C14.1 12.4999 14 12.4999
            14 12.4999ZM12.7 12.4999C12.7 12.4999 12.6 12.4999 12.7
            12.4999L8.70001 14.6999C8.60001 14.7999 8.60001 14.7999 8.60001
            14.8999C8.60001 14.8999 8.60001 14.9999 8.70001 15.0999L12.5
            17.2999C12.6 17.3999 12.7 17.2999 12.7 17.2999C12.7 17.2999 12.8
            17.1999 12.8 17.0999V12.6999C12.8 12.5999 12.7 12.4999 12.7
            12.4999C12.8 12.4999 12.7 12.4999 12.7 12.4999ZM7.60001
            14.1999V15.6999C7.70001 15.5999 7.70002 15.4999 7.80002
            15.4999C7.90002 15.3999 8.10002 15.3999 8.30002 15.3999C8.20002
            15.2999 8.20001 15.0999 8.20001 14.9999C8.20001 14.8999 8.30002
            14.6999 8.30002 14.5999C8.10002 14.5999 8.00002 14.5999 7.80002
            14.4999C7.70002 14.2999 7.70001 14.2999 7.60001 14.1999ZM18.4
            14.4999C18.5 14.5999 18.5 14.7999 18.5 14.8999C18.5 14.9999 18.5
            15.0999 18.4 15.2999L19 14.9999C19.1 14.9999 19.1 14.8999 19.1
            14.7999V14.1999C19 14.2999 18.9 14.3999 18.8 14.4999C18.7 14.4999
            18.5 14.5999 18.4 14.4999ZM18.5 9.19991C18.5 9.19991 18.4 9.19991
            18.5 9.19991L14.5 11.3999C14.4 11.4999 14.4 11.4999 14.4
            11.5999C14.4 11.5999 14.4 11.6999 14.5 11.7999L18.3 13.9999C18.4
            14.0999 18.5 13.9999 18.5 13.9999C18.5 13.9999 18.6 13.8999 18.6
            13.7999V9.29991C18.6 9.19991 18.5 9.09991 18.5 9.19991C18.6 9.19991
            18.5 9.19991 18.5 9.19991ZM8.20001 9.0999H8.10001C8.10001 9.0999 8
            9.19991 8 9.29991V13.7999C8 13.8999 8.10001 13.9999 8.10001
            13.9999C8.10001 13.9999 8.20002 14.0999 8.30002 13.9999L12.2
            11.7999C12.3 11.6999 12.3 11.6999 12.3 11.5999C12.3 11.5999 12.3
            11.4999 12.2 11.3999L8.40002 9.19991C8.30002 9.09991 8.20001 9.0999
            8.20001 9.0999ZM12.7 11.9999C12.8 11.9999 12.9 11.9999 13.1
            12.0999C13.2 12.1999 13.3 12.2999 13.4 12.3999C13.5 12.2999 13.6
            12.0999 13.7 12.0999C13.8 11.9999 14 11.9999 14.1 11.9999C14 11.8999
            14 11.6999 14 11.5999C14 11.3999 14.1 11.2999 14.1 11.1999C14
            11.1999 13.8 11.1999 13.7 11.0999C13.6 10.9999 13.5 10.8999 13.4
            10.7999C13.3 10.8999 13.2 11.0999 13.1 11.0999C13 11.0999 12.8
            11.1999 12.7 11.1999C12.8 11.2999 12.8 11.4999 12.8 11.5999C12.8
            11.7999 12.7 11.8999 12.7 11.9999C12.6 11.9999 12.7 11.9999 12.7
            11.9999ZM14 5.79991H13.9C13.9 5.79991 13.8 5.8999 13.8
            5.9999V10.4999C13.8 10.5999 13.9 10.6999 13.9 10.6999C13.9 10.6999
            14 10.7999 14.1 10.6999L18 8.4999C18.1 8.3999 18.1 8.39991 18.1
            8.29991C18.1 8.29991 18.1 8.1999 18 8.0999L14.2 5.89992C14.1 5.79992
            14 5.79991 14 5.79991ZM12.7 5.79991L8.70001 7.9999C8.60001 8.0999
            8.60001 8.09991 8.60001 8.19991C8.60001 8.19991 8.60001 8.29992
            8.70001 8.39992L12.5 10.5999C12.6 10.6999 12.7 10.5999 12.7
            10.5999C12.7 10.5999 12.8 10.4999 12.8 10.3999V5.89992C12.8 5.79992
            12.7 5.69991 12.7 5.79991C12.8 5.79991 12.8 5.79991 12.7
            5.79991ZM18.5 8.69991C18.6 8.69991 18.7 8.69991 18.9 8.79991C19
            8.89991 19.1 8.8999 19.1 8.9999V8.39992C19.1 8.29992 19.1 8.29991 19
            8.19991L18.5 7.89992C18.6 7.99992 18.6 8.09991 18.6 8.19991C18.6
            8.39991 18.5 8.59991 18.5 8.69991C18.4 8.69991 18.5 8.69991 18.5
            8.69991ZM8.20001 7.89992L7.70001 8.19991C7.60001 8.19991 7.60001
            8.29992 7.60001 8.39992V8.9999C7.70001 8.8999 7.70002 8.79991
            7.80002 8.79991C7.90002 8.69991 8.10001 8.69991 8.20001
            8.69991C8.10001 8.59991 8.10001 8.39991 8.10001 8.29991C8.20001
            8.09991 8.20001 7.99992 8.20001 7.89992ZM12.8 5.29991C12.9 5.29991
            13 5.29992 13.1 5.39992C13.2 5.49992 13.3 5.59991 13.4 5.69991C13.5
            5.59991 13.6 5.39992 13.7 5.39992C13.8 5.29992 13.9 5.29991 14
            5.29991L13.5 4.9999C13.4 4.9999 13.4 4.9999 13.3 4.9999L12.8
            5.29991Z"
            fill="white" />
          <path
            d="M21.9 25.9H4.10001C1.90001 25.9 0 24.1 0 21.8V4.10001C0 1.90001
            1.80001 0 4.10001 0H21.8C24 0 25.9 1.80001 25.9 4.10001V21.8C25.9
            24.1 24.1 25.9 21.9 25.9ZM4.10001 1.10001C2.40001 1.10001 1 2.50001
            1 4.20001V21.9C1 23.6 2.40001 25 4.10001 25H21.8C23.5 25 24.9 23.6
            24.9 21.9V4.20001C24.9 2.50001 23.5 1.10001 21.8 1.10001H4.10001Z"
            fill="#5F5F57" />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-2.71808"
              y1="25.4307"
              x2="73.0877"
              y2="-33.7435"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#2988FE" />
              <stop offset="0.1292" stop-color="#3175F1" />
              <stop offset="0.2775" stop-color="#5C71EE" />
              <stop offset="0.5331" stop-color="#BB45CF" />
              <stop offset="0.573" stop-color="#BC85CF" />
              <stop offset="0.6173" stop-color="#BEC7CE" />
              <stop offset="0.6496" stop-color="#BFEFCE" />
              <stop offset="0.6663" stop-color="#BFFFCE" />
            </linearGradient>
          </defs>
        </svg>

      </div>
      {:else if robotOn}
        <div>
          <div class="typewriter text-bubble fadeInOut">
            <h4 class="text-white text-xs">{robotDialogue}</h4>
            <hr class="diagonal" />
          </div>
          
          <BuiltRobot />
          
        </div>
      {:else if robotFly}
        <div>
        <Flybot touched={false}
          />
        </div>
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
          <!-- formspree url to be replaced - free account does not allow custom thank you redirect -->
          <form action="https://formspree.io/xoqkkgzd" method="POST">
            <Textfield
              placeHolder="What's your email address?"
              on:input={
                (event) => {
                    formInput = event.target.value;
                  }
                } />
            <input type="hidden" name="_subject" value="New submission!" />
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
        <div class={`${formSubmitted} form`}>
          <h1 class="text-white md:text-2xl text-xl">
            Lets build something wonderful!
          </h1>
          <Button
            rounded={true}
            color="primary"
            btnText="Re-send form"
            on:click={backToForm}
            elevation="xl" />
        </div>
      {/if}
    </div>

    <div id="background">
      <svg
        viewBox={`${backgroundLeftLimit} 0 ${backgroundRightLimit} 1040`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet">

        <g id="InitialWelcomeScreen" clip-path="url(#clip0)">
          <g id="Background1">
            <path id="Vector" d="M1920 0H0.2V1080H1920V0Z" fill="#01B4FD" />
            <path
              id="Vector_2"
              opacity="0.1"
              d="M1920 0H0.2V1080H1920V0Z"
              fill="url(#paint0_radial)" />
          </g>
          <g id="Skyline">
            <path
              id="Vector_3"
              opacity="0.1"
              d="M1920 -0.299988H0.2V225.2H1920V-0.299988Z"
              fill="#E5EDEF" />
            <path
              id="Vector_4"
              opacity="0.1"
              d="M1920 238.5H0V258H1920V238.5Z"
              fill="#E5EDEF" />
            <path
              id="Vector_5"
              opacity="0.1"
              d="M1920 277.2H0V286.9H1920V277.2Z"
              fill="#E5EDEF" />
          </g>
          <g id="Frame">

            <g class="fly" id="Buildings">

              <path
                id="Vector_6"
                d="M674.1 614H575.1C568.5 614 563.1 608.6 563.1 602V367C563.1
                360.4 568.5 355 575.1 355H674.1C680.7 355 686.1 360.4 686.1
                367V602C686.1 608.6 680.7 614 674.1 614Z"
                fill="#06A7FF" />
              <path
                id="Vector_7"
                d="M1218 743.5H1075.1C1047.9 743.5 1025.7 721.3 1025.7
                694.1V533.9C1025.7 506.7 1047.9 484.5 1075.1 484.5H1218C1245.2
                484.5 1267.4 506.7 1267.4 533.9V694.1C1267.4 721.3 1245.2 743.5
                1218 743.5Z"
                fill="#06A7FF" />
              <path
                id="Vector_8"
                opacity="0.9"
                d="M409.3 791.2H296.8V392.5C296.8 361.4 322 336.3 353
                336.3C384.1 336.3 409.2 361.5 409.2 392.5V791.2H409.3Z"
                fill="#06A7FF" />
              <path
                id="Vector_9"
                d="M360.6 778.1H248.1V572.3C248.1 541.2 273.3 516.1 304.3
                516.1C335.4 516.1 360.5 541.3 360.5 572.3V778.1H360.6Z"
                fill="#0CACFE" />
              <path
                id="Vector_10"
                opacity="0.9"
                d="M1490.5 745H1378V539.2C1378 508.1 1403.2 483 1434.2
                483C1465.3 483 1490.4 508.2 1490.4 539.2V745H1490.5Z"
                fill="#06A7FF" />
              <path
                id="Vector_11"
                d="M1138.2 647.1H1025.7V441.3C1025.7 410.2 1050.9 385.1 1081.9
                385.1C1113 385.1 1138.1 410.3 1138.1 441.3V647.1H1138.2Z"
                fill="#06A7FF" />
              <path
                id="Vector_12"
                opacity="0.5"
                d="M359.6 419.5H296.8V404.3H359.6C363.8 404.3 367.2 407.7 367.2
                411.9C367.2 416.1 363.8 419.5 359.6 419.5Z"
                fill="#26BDF9" />
              <path
                id="Vector_13"
                opacity="0.5"
                d="M359.6 448.6H296.8V433.4H359.6C363.8 433.4 367.2 436.8 367.2
                441C367.2 445.2 363.8 448.6 359.6 448.6Z"
                fill="#26BDF9" />
              <path
                id="Vector_14"
                opacity="0.5"
                d="M359.6 477.7H296.8V462.5H359.6C363.8 462.5 367.2 465.9 367.2
                470.1C367.2 474.3 363.8 477.7 359.6 477.7Z"
                fill="#26BDF9" />
              <path
                id="Vector_15"
                opacity="0.5"
                d="M310.9 641.3H248.1V626.1H310.9C315.1 626.1 318.5 629.5 318.5
                633.7C318.5 637.9 315.1 641.3 310.9 641.3Z"
                fill="#26BDF9" />
              <path
                id="Vector_16"
                opacity="0.5"
                d="M342.9 419.5H332.8C328.6 419.5 325.2 416.1 325.2 411.9C325.2
                407.7 328.6 404.3 332.8 404.3H342.9C347.1 404.3 350.5 407.7
                350.5 411.9C350.5 416.1 347.1 419.5 342.9 419.5Z"
                fill="#1AC6FF" />
              <path
                id="Vector_17"
                opacity="0.5"
                d="M342.9 448.6H332.8C328.6 448.6 325.2 445.2 325.2 441C325.2
                436.8 328.6 433.4 332.8 433.4H342.9C347.1 433.4 350.5 436.8
                350.5 441C350.5 445.2 347.1 448.6 342.9 448.6Z"
                fill="#1AC6FF" />
              <path
                id="Vector_18"
                opacity="0.5"
                d="M342.9 477.7H332.8C328.6 477.7 325.2 474.3 325.2 470.1C325.2
                465.9 328.6 462.5 332.8 462.5H342.9C347.1 462.5 350.5 465.9
                350.5 470.1C350.5 474.3 347.1 477.7 342.9 477.7Z"
                fill="#1AC6FF" />
              <path
                id="Vector_19"
                opacity="0.5"
                d="M292.9 641.3H282.8C278.6 641.3 275.2 637.9 275.2 633.7C275.2
                629.5 278.6 626.1 282.8 626.1H292.9C297.1 626.1 300.5 629.5
                300.5 633.7C300.6 637.9 297.1 641.3 292.9 641.3Z"
                fill="#1AC6FF" />
              <path
                id="Vector_20"
                d="M402.9 694.4V266.8C402.9 257.1 410.8 249.2 420.5
                249.2H565.4C575.1 249.2 583 257.1 583
                266.8V451.6H698V383.6H766V234.6C766 234.6 934.4 213.6 934.4
                234.6C934.4 255.6 934.4 388.4 934.4
                388.4H968.4V305.8H987.9C1008.4 305.8 1025 322.4 1025
                342.9V365.7H1059V543.8H1337.5V526H1326C1324.5 526 1323.4 524.8
                1323.4 523.4V510.9C1323.4 509.4 1324.6 508.3 1326
                508.3H1337.5V502.6C1337.5 487 1350.2 474.3 1365.8 474.3C1381.4
                474.3 1394.1 487 1394.1 502.6V508H1406C1407.5 508 1408.6 509.2
                1408.6 510.6V523.5C1408.6 525 1407.4 526.1 1406
                526.1H1395.7V540.5H1457.2V618.2H1513.9V478.3C1513.9 460.9 1528
                446.7 1545.5 446.7C1562.9 446.7 1577.1 460.8 1577.1
                478.3V768.9H413H402.8V694.4H402.9Z"
                fill="#0CACFE" />
              <path
                id="Vector_21"
                d="M1654.7 768.9H1542.2V553.3C1542.2 522.2 1567.4 497.1 1598.4
                497.1C1629.5 497.1 1654.6 522.3 1654.6 553.3V768.9H1654.7Z"
                fill="#0CACFE" />
              <path
                id="Vector_22"
                d="M1581.1 645.3H1458.4V768.9H1581.1V645.3Z"
                fill="#0CACFE" />
              <path
                id="Vector_23"
                opacity="0.25"
                d="M935.3 769.1H780.8V570.4C780.8 559.8 789.4 551.2 800
                551.2H916.2C926.8 551.2 935.4 559.8 935.4 570.4V769.1H935.3Z"
                fill="#11BCFD" />
              <path
                id="Vector_24"
                opacity="0.25"
                d="M1434.3 769.1H1343.2V705.7C1343.2 680.6 1363.6 660.2 1388.7
                660.2C1413.8 660.2 1434.2 680.6 1434.2 705.7V769.1H1434.3Z"
                fill="#11BCFD" />
              <path
                id="Vector_25"
                d="M538.3 768.9H447.2V705.5C447.2 680.4 467.6 660 492.7
                660C517.8 660 538.2 680.4 538.2 705.5V768.9H538.3Z"
                fill="#11BCFD" />
              <path
                id="Vector_26"
                d="M1353.5 769.1H1304.4V684.7C1304.4 671.1 1315.4 660.2 1328.9
                660.2C1342.5 660.2 1353.4 671.2 1353.4 684.7V769.1H1353.5Z"
                fill="#11BCFD" />
              <path
                id="Vector_27"
                d="M1316.5 769.1H1267.4V727.2C1267.4 713.6 1278.4 702.7 1291.9
                702.7C1305.5 702.7 1316.4 713.7 1316.4 727.2V769.1H1316.5Z"
                fill="#11BCFD" />
              <path
                id="Vector_28"
                opacity="0.25"
                d="M591 769.1H499.9V648.9C499.9 623.8 520.3 603.4 545.4
                603.4C570.5 603.4 590.9 623.8 590.9 648.9V769.1H591Z"
                fill="#11BCFD" />
              <path
                id="Vector_29"
                opacity="0.25"
                d="M903.6 551.5H812.5V488.1C812.5 463 832.9 442.6 858
                442.6C883.1 442.6 903.5 463 903.5 488.1V551.5H903.6Z"
                fill="#11BCFD" />
              <path
                id="Vector_30"
                d="M805.6 681.9V769.1H790.4V681.9C790.4 677.7 793.8 674.3 798
                674.3C802.2 674.3 805.6 677.7 805.6 681.9Z"
                fill="#0CACFE" />
              <path
                id="Vector_31"
                d="M838 681.9V769.1H822.8V681.9C822.8 677.7 826.2 674.3 830.4
                674.3C834.6 674.3 838 677.7 838 681.9Z"
                fill="#0CACFE" />
              <path
                id="Vector_32"
                d="M873.2 681.9V769.1H858V681.9C858 677.7 861.4 674.3 865.6
                674.3C869.8 674.3 873.2 677.7 873.2 681.9Z"
                fill="#0CACFE" />
              <path
                id="Vector_33"
                d="M908.8 681.9V769.1H893.6V681.9C893.6 677.7 897 674.3 901.2
                674.3C905.4 674.3 908.8 677.7 908.8 681.9Z"
                fill="#0CACFE" />
              <path
                id="Vector_34"
                d="M805.6 636.6V657.1C805.6 661.3 802.2 664.7 798 664.7C793.8
                664.7 790.4 661.3 790.4 657.1V636.6C790.4 632.4 793.8 629 798
                629C802.2 629 805.6 632.4 805.6 636.6Z"
                fill="#0CACFE" />
              <path
                id="Vector_35"
                d="M838 636.6V657.1C838 661.3 834.6 664.7 830.4 664.7C826.2
                664.7 822.8 661.3 822.8 657.1V636.6C822.8 632.4 826.2 629 830.4
                629C834.6 629 838 632.4 838 636.6Z"
                fill="#0CACFE" />
              <path
                id="Vector_36"
                d="M873.2 636.6V657.1C873.2 661.3 869.8 664.7 865.6 664.7C861.4
                664.7 858 661.3 858 657.1V636.6C858 632.4 861.4 629 865.6
                629C869.8 629 873.2 632.4 873.2 636.6Z"
                fill="#0CACFE" />
              <path
                id="Vector_37"
                d="M908.8 636.6V657.1C908.8 661.3 905.4 664.7 901.2 664.7C897
                664.7 893.6 661.3 893.6 657.1V636.6C893.6 632.4 897 629 901.2
                629C905.4 629 908.8 632.4 908.8 636.6Z"
                fill="#0CACFE" />
              <path
                id="Vector_38"
                opacity="0.25"
                d="M1648.7 558.9V579.4C1648.7 583.6 1645.3 587 1641.1 587C1636.9
                587 1633.5 583.6 1633.5 579.4V558.9C1633.5 554.7 1636.9 551.3
                1641.1 551.3C1645.3 551.2 1648.7 554.7 1648.7 558.9Z"
                fill="#11BCFD" />
              <path
                id="Vector_39"
                opacity="0.25"
                d="M1626.1 558.9V579.4C1626.1 583.6 1622.7 587 1618.5 587C1614.3
                587 1610.9 583.6 1610.9 579.4V558.9C1610.9 554.7 1614.3 551.3
                1618.5 551.3C1622.7 551.2 1626.1 554.7 1626.1 558.9Z"
                fill="#11BCFD" />
              <path
                id="Vector_40"
                opacity="0.5"
                d="M508.1 313H402.9V297.8H508.1C512.3 297.8 515.7 301.2 515.7
                305.4C515.7 309.6 512.3 313 508.1 313Z"
                fill="#26BDF9" />
              <path
                id="Vector_41"
                opacity="0.5"
                d="M796 320.6H766V305.4H796C800.2 305.4 803.6 308.8 803.6
                313C803.6 317.2 800.2 320.6 796 320.6Z"
                fill="#26BDF9" />
              <path
                id="Vector_42"
                opacity="0.5"
                d="M796 342.5H766V327.3H796C800.2 327.3 803.6 330.7 803.6
                334.9C803.6 339.1 800.2 342.5 796 342.5Z"
                fill="#26BDF9" />
              <path
                id="Vector_43"
                d="M1404.3 712.4H1434.2V727.6H1404.3C1400.1 727.6 1396.7 724.2
                1396.7 720C1396.7 715.8 1400.1 712.4 1404.3 712.4Z"
                fill="#0CACFE" />
              <path
                id="Vector_44"
                opacity="0.25"
                d="M477 313H466.9C462.7 313 459.3 309.6 459.3 305.4C459.3 301.2
                462.7 297.8 466.9 297.8H477C481.2 297.8 484.6 301.2 484.6
                305.4C484.6 309.5 481.2 313 477 313Z"
                fill="#1AC6FF" />
              <path
                id="Vector_45"
                opacity="0.5"
                d="M1349.1 684.8V694.9C1349.1 697 1347.4 698.7 1345.3
                698.7C1343.2 698.7 1341.5 697 1341.5 694.9V684.8C1341.5 682.7
                1343.2 681 1345.3 681C1347.4 680.9 1349.1 682.7 1349.1 684.8Z"
                fill="#2CCDFF" />
              <path
                id="Vector_46"
                opacity="0.5"
                d="M1332.8 684.8V694.9C1332.8 697 1331.1 698.7 1329 698.7C1326.9
                698.7 1325.2 697 1325.2 694.9V684.8C1325.2 682.7 1326.9 681 1329
                681C1331.1 680.9 1332.8 682.7 1332.8 684.8Z"
                fill="#2CCDFF" />
              <path
                id="Vector_47"
                opacity="0.5"
                d="M1316.5 684.8V694.9C1316.5 697 1314.8 698.7 1312.7
                698.7C1310.6 698.7 1308.9 697 1308.9 694.9V684.8C1308.9 682.7
                1310.6 681 1312.7 681C1314.8 680.9 1316.5 682.7 1316.5 684.8Z"
                fill="#2CCDFF" />
              <path
                id="Vector_48"
                d="M1087.1 551.2H996.2C985 551.2 975.9 542.1 975.9 530.9C975.9
                519.7 985 510.6 996.2 510.6H1087.1C1098.3 510.6 1107.4 519.7
                1107.4 530.9C1107.4 542.2 1098.4 551.2 1087.1 551.2Z"
                fill="#0CACFE" />
            </g>
          </g>
          <g id="Ground">
            <path
              id="Vector_49"
              d="M1919.8 768.9H0V1080H1919.8V768.9Z"
              fill="#00A3FB" />
            <path
              id="Vector_50"
              d="M1919.8 871.9H0V1080H1919.8V871.9Z"
              fill="#009AF9" />
            <path
              id="Vector_51"
              d="M1919.8 837.4H0V851.1H1919.8V837.4Z"
              fill="#009AF9" />
            <path
              id="Vector_52"
              d="M1774.6 810.4H176.9C161.4 810.4 148.7 797.7 148.7 782.2C148.7
              766.7 161.4 754 176.9 754H1774.7C1790.2 754 1802.9 766.7 1802.9
              782.2C1802.8 797.7 1790.1 810.4 1774.6 810.4Z"
              fill="#00A3FB" />
            <path
              id="Vector_53"
              d="M314.9 802.2H256.8C230.2 802.2 208.6 780.6 208.6 754C208.6
              727.4 230.2 705.8 256.8 705.8H314.9C341.5 705.8 363.1 727.4 363.1
              754C363.1 780.6 341.5 802.2 314.9 802.2Z"
              fill="#00A3FB" />
            <path
              id="Vector_54"
              d="M1626.5 787.5H1463.2C1456.6 787.5 1451.2 782.1 1451.2
              775.5V757C1451.2 750.4 1456.6 745 1463.2 745H1626.5C1633.1 745
              1638.5 750.4 1638.5 757V775.5C1638.5 782.1 1633.1 787.5 1626.5
              787.5Z"
              fill="#00A3FB" />
          </g>

          <!-- <path id="text" d="M586.623 922H581.291L576.205 904.117C575.986 903.338 575.713 902.217 575.385 900.754C575.057 899.277 574.858 898.252 574.79 897.678C574.653 898.553 574.428 899.688 574.113 901.082C573.812 902.477 573.56 903.516 573.354 904.199L568.392 922H563.06L559.184 906.988L555.246 892.018H560.25L564.536 909.49C565.206 912.293 565.685 914.768 565.972 916.914C566.122 915.752 566.348 914.453 566.648 913.018C566.949 911.582 567.223 910.42 567.469 909.531L572.35 892.018H577.21L582.214 909.613C582.692 911.24 583.198 913.674 583.731 916.914C583.937 914.959 584.429 912.471 585.208 909.449L589.474 892.018H594.437L586.623 922ZM612.381 922L611.417 918.842H611.253C610.159 920.223 609.059 921.166 607.951 921.672C606.844 922.164 605.422 922.41 603.686 922.41C601.457 922.41 599.714 921.809 598.456 920.605C597.212 919.402 596.59 917.7 596.59 915.499C596.59 913.161 597.458 911.397 599.194 910.208C600.931 909.019 603.576 908.369 607.131 908.26L611.048 908.137V906.927C611.048 905.478 610.706 904.397 610.022 903.687C609.353 902.962 608.307 902.6 606.885 902.6C605.723 902.6 604.608 902.771 603.542 903.112C602.476 903.454 601.45 903.857 600.466 904.322L598.907 900.877C600.138 900.234 601.484 899.749 602.947 899.421C604.41 899.079 605.791 898.908 607.09 898.908C609.975 898.908 612.148 899.537 613.611 900.795C615.088 902.053 615.826 904.028 615.826 906.722V922H612.381ZM605.203 918.719C606.953 918.719 608.354 918.233 609.407 917.263C610.474 916.278 611.007 914.904 611.007 913.141V911.172L608.095 911.295C605.825 911.377 604.171 911.76 603.132 912.443C602.106 913.113 601.594 914.146 601.594 915.54C601.594 916.552 601.895 917.338 602.496 917.898C603.098 918.445 604 918.719 605.203 918.719ZM642.507 922H637.667V908.055C637.667 906.305 637.312 904.999 636.601 904.138C635.903 903.276 634.789 902.846 633.258 902.846C631.221 902.846 629.73 903.447 628.787 904.65C627.844 905.854 627.372 907.87 627.372 910.7V922H622.553V899.318H626.326L627.003 902.292H627.249C627.933 901.212 628.903 900.378 630.161 899.79C631.419 899.202 632.813 898.908 634.345 898.908C639.786 898.908 642.507 901.677 642.507 907.214V922ZM657.662 918.514C658.838 918.514 660.014 918.329 661.189 917.96V921.59C660.656 921.822 659.966 922.014 659.118 922.164C658.284 922.328 657.416 922.41 656.514 922.41C651.947 922.41 649.664 920.004 649.664 915.191V902.969H646.567V900.836L649.89 899.072L651.53 894.273H654.504V899.318H660.964V902.969H654.504V915.109C654.504 916.271 654.791 917.133 655.365 917.693C655.953 918.24 656.719 918.514 657.662 918.514ZM690.844 922L689.88 918.842H689.716C688.622 920.223 687.521 921.166 686.414 921.672C685.307 922.164 683.885 922.41 682.148 922.41C679.92 922.41 678.177 921.809 676.919 920.605C675.675 919.402 675.053 917.7 675.053 915.499C675.053 913.161 675.921 911.397 677.657 910.208C679.394 909.019 682.039 908.369 685.594 908.26L689.511 908.137V906.927C689.511 905.478 689.169 904.397 688.485 903.687C687.815 902.962 686.77 902.6 685.348 902.6C684.186 902.6 683.071 902.771 682.005 903.112C680.938 903.454 679.913 903.857 678.929 904.322L677.37 900.877C678.601 900.234 679.947 899.749 681.41 899.421C682.873 899.079 684.254 898.908 685.553 898.908C688.438 898.908 690.611 899.537 692.074 900.795C693.551 902.053 694.289 904.028 694.289 906.722V922H690.844ZM683.666 918.719C685.416 918.719 686.817 918.233 687.87 917.263C688.937 916.278 689.47 914.904 689.47 913.141V911.172L686.558 911.295C684.288 911.377 682.634 911.76 681.595 912.443C680.569 913.113 680.057 914.146 680.057 915.54C680.057 916.552 680.357 917.338 680.959 917.898C681.561 918.445 682.463 918.719 683.666 918.719ZM721.072 922.41C717.641 922.41 715.029 921.412 713.238 919.416C711.461 917.406 710.572 914.528 710.572 910.782C710.572 906.968 711.502 904.035 713.361 901.984C715.234 899.934 717.935 898.908 721.462 898.908C723.854 898.908 726.008 899.353 727.922 900.241L726.466 904.117C724.429 903.324 722.747 902.928 721.421 902.928C717.497 902.928 715.535 905.532 715.535 910.741C715.535 913.284 716.021 915.198 716.991 916.483C717.976 917.755 719.411 918.391 721.298 918.391C723.444 918.391 725.475 917.857 727.389 916.791V920.995C726.527 921.501 725.604 921.863 724.62 922.082C723.649 922.301 722.467 922.41 721.072 922.41ZM752.839 910.618C752.839 914.323 751.889 917.215 749.988 919.293C748.088 921.371 745.442 922.41 742.052 922.41C739.933 922.41 738.06 921.932 736.433 920.975C734.806 920.018 733.555 918.644 732.68 916.853C731.805 915.062 731.367 912.983 731.367 910.618C731.367 906.94 732.311 904.069 734.197 902.005C736.084 899.94 738.743 898.908 742.175 898.908C745.456 898.908 748.054 899.968 749.968 902.087C751.882 904.192 752.839 907.036 752.839 910.618ZM736.33 910.618C736.33 915.854 738.265 918.473 742.134 918.473C745.962 918.473 747.876 915.854 747.876 910.618C747.876 905.437 745.948 902.846 742.093 902.846C740.069 902.846 738.6 903.516 737.684 904.855C736.781 906.195 736.33 908.116 736.33 910.618ZM778.515 910.618C778.515 914.323 777.564 917.215 775.664 919.293C773.764 921.371 771.118 922.41 767.728 922.41C765.608 922.41 763.735 921.932 762.108 920.975C760.481 920.018 759.23 918.644 758.355 916.853C757.48 915.062 757.043 912.983 757.043 910.618C757.043 906.94 757.986 904.069 759.873 902.005C761.76 899.94 764.419 898.908 767.851 898.908C771.132 898.908 773.729 899.968 775.644 902.087C777.558 904.192 778.515 907.036 778.515 910.618ZM762.006 910.618C762.006 915.854 763.94 918.473 767.81 918.473C771.638 918.473 773.552 915.854 773.552 910.618C773.552 905.437 771.624 902.846 767.769 902.846C765.745 902.846 764.275 903.516 763.359 904.855C762.457 906.195 762.006 908.116 762.006 910.618ZM788.892 922H784.072V890.09H788.892V922ZM811.532 922H806.713V890.09H811.532V922ZM838.562 910.618C838.562 914.323 837.611 917.215 835.711 919.293C833.811 921.371 831.165 922.41 827.774 922.41C825.655 922.41 823.782 921.932 822.155 920.975C820.528 920.018 819.277 918.644 818.402 916.853C817.527 915.062 817.09 912.983 817.09 910.618C817.09 906.94 818.033 904.069 819.92 902.005C821.807 899.94 824.466 898.908 827.897 898.908C831.179 898.908 833.776 899.968 835.69 902.087C837.604 904.192 838.562 907.036 838.562 910.618ZM822.053 910.618C822.053 915.854 823.987 918.473 827.856 918.473C831.685 918.473 833.599 915.854 833.599 910.618C833.599 905.437 831.671 902.846 827.815 902.846C825.792 902.846 824.322 903.516 823.406 904.855C822.504 906.195 822.053 908.116 822.053 910.618ZM863.273 899.318V901.964L859.397 902.682C859.753 903.16 860.047 903.748 860.279 904.445C860.512 905.143 860.628 905.881 860.628 906.66C860.628 908.998 859.821 910.837 858.208 912.177C856.595 913.517 854.373 914.187 851.543 914.187C850.818 914.187 850.162 914.132 849.574 914.022C848.535 914.665 848.016 915.417 848.016 916.278C848.016 916.798 848.255 917.188 848.733 917.447C849.226 917.707 850.121 917.837 851.42 917.837H855.378C857.88 917.837 859.78 918.37 861.079 919.437C862.378 920.503 863.027 922.041 863.027 924.051C863.027 926.621 861.968 928.604 859.849 929.998C857.729 931.393 854.667 932.09 850.661 932.09C847.571 932.09 845.213 931.543 843.586 930.449C841.959 929.355 841.146 927.797 841.146 925.773C841.146 924.379 841.583 923.203 842.458 922.246C843.347 921.303 844.584 920.646 846.17 920.277C845.527 920.004 844.994 919.566 844.57 918.965C844.16 918.35 843.955 917.707 843.955 917.037C843.955 916.189 844.194 915.472 844.673 914.884C845.151 914.296 845.862 913.715 846.806 913.141C845.63 912.635 844.673 911.814 843.935 910.68C843.21 909.531 842.848 908.191 842.848 906.66C842.848 904.199 843.62 902.292 845.165 900.938C846.724 899.585 848.938 898.908 851.81 898.908C852.452 898.908 853.122 898.956 853.819 899.052C854.53 899.134 855.063 899.223 855.419 899.318H863.273ZM845.452 925.527C845.452 926.566 845.917 927.366 846.847 927.927C847.79 928.487 849.109 928.768 850.805 928.768C853.43 928.768 855.385 928.392 856.67 927.64C857.955 926.888 858.598 925.89 858.598 924.646C858.598 923.661 858.242 922.957 857.531 922.533C856.834 922.123 855.528 921.918 853.614 921.918H849.964C848.583 921.918 847.482 922.239 846.662 922.882C845.855 923.538 845.452 924.42 845.452 925.527ZM847.523 906.66C847.523 908.082 847.886 909.176 848.61 909.941C849.349 910.707 850.401 911.09 851.769 911.09C854.558 911.09 855.952 909.6 855.952 906.619C855.952 905.143 855.604 904.008 854.906 903.215C854.223 902.408 853.177 902.005 851.769 902.005C850.374 902.005 849.314 902.401 848.59 903.194C847.879 903.987 847.523 905.143 847.523 906.66ZM887.616 910.618C887.616 914.323 886.666 917.215 884.766 919.293C882.865 921.371 880.22 922.41 876.829 922.41C874.71 922.41 872.837 921.932 871.21 920.975C869.583 920.018 868.332 918.644 867.457 916.853C866.582 915.062 866.145 912.983 866.145 910.618C866.145 906.94 867.088 904.069 868.975 902.005C870.861 899.94 873.521 898.908 876.952 898.908C880.233 898.908 882.831 899.968 884.745 902.087C886.659 904.192 887.616 907.036 887.616 910.618ZM871.107 910.618C871.107 915.854 873.042 918.473 876.911 918.473C880.739 918.473 882.653 915.854 882.653 910.618C882.653 905.437 880.726 902.846 876.87 902.846C874.847 902.846 873.377 903.516 872.461 904.855C871.559 906.195 871.107 908.116 871.107 910.618ZM898.178 917.591C897.521 920.134 896.318 923.408 894.568 927.414H891.021C891.964 923.723 892.668 920.291 893.133 917.119H897.87L898.178 917.591ZM920.49 922L911.877 899.318H916.963L921.577 912.505C922.37 914.72 922.849 916.511 923.013 917.878H923.177C923.3 916.894 923.778 915.103 924.612 912.505L929.227 899.318H934.354L925.699 922H920.49ZM942.618 922H937.799V899.318H942.618V922ZM937.512 893.31C937.512 892.448 937.744 891.785 938.209 891.32C938.688 890.855 939.364 890.623 940.239 890.623C941.087 890.623 941.743 890.855 942.208 891.32C942.687 891.785 942.926 892.448 942.926 893.31C942.926 894.13 942.687 894.779 942.208 895.258C941.743 895.723 941.087 895.955 940.239 895.955C939.364 895.955 938.688 895.723 938.209 895.258C937.744 894.779 937.512 894.13 937.512 893.31ZM957.179 922.41C954.349 922.41 952.141 921.385 950.555 919.334C948.969 917.283 948.176 914.405 948.176 910.7C948.176 906.981 948.976 904.09 950.575 902.025C952.188 899.947 954.417 898.908 957.261 898.908C960.241 898.908 962.511 900.009 964.069 902.21H964.315C964.083 900.583 963.967 899.298 963.967 898.354V890.09H968.807V922H965.033L964.192 919.026H963.967C962.422 921.282 960.159 922.41 957.179 922.41ZM958.471 918.514C960.453 918.514 961.896 917.96 962.798 916.853C963.7 915.731 964.165 913.92 964.192 911.418V910.741C964.192 907.884 963.728 905.854 962.798 904.65C961.868 903.447 960.412 902.846 958.43 902.846C956.734 902.846 955.429 903.536 954.513 904.917C953.597 906.284 953.139 908.239 953.139 910.782C953.139 913.298 953.583 915.219 954.472 916.545C955.36 917.857 956.693 918.514 958.471 918.514ZM985.603 922.41C982.075 922.41 979.313 921.385 977.317 919.334C975.335 917.27 974.344 914.433 974.344 910.823C974.344 907.118 975.267 904.206 977.112 902.087C978.958 899.968 981.494 898.908 984.721 898.908C987.715 898.908 990.08 899.817 991.816 901.636C993.553 903.454 994.421 905.956 994.421 909.142V911.746H979.307C979.375 913.947 979.97 915.643 981.091 916.832C982.212 918.008 983.791 918.596 985.828 918.596C987.168 918.596 988.412 918.473 989.561 918.227C990.723 917.967 991.967 917.543 993.293 916.955V920.872C992.117 921.433 990.928 921.829 989.725 922.062C988.521 922.294 987.147 922.41 985.603 922.41ZM984.721 902.559C983.189 902.559 981.959 903.044 981.029 904.015C980.113 904.985 979.566 906.4 979.389 908.26H989.684C989.656 906.387 989.205 904.972 988.33 904.015C987.455 903.044 986.252 902.559 984.721 902.559ZM1020.01 910.618C1020.01 914.323 1019.06 917.215 1017.16 919.293C1015.26 921.371 1012.62 922.41 1009.23 922.41C1007.11 922.41 1005.24 921.932 1003.61 920.975C1001.98 920.018 1000.73 918.644 999.855 916.853C998.98 915.062 998.543 912.983 998.543 910.618C998.543 906.94 999.486 904.069 1001.37 902.005C1003.26 899.94 1005.92 898.908 1009.35 898.908C1012.63 898.908 1015.23 899.968 1017.14 902.087C1019.06 904.192 1020.01 907.036 1020.01 910.618ZM1003.51 910.618C1003.51 915.854 1005.44 918.473 1009.31 918.473C1013.14 918.473 1015.05 915.854 1015.05 910.618C1015.05 905.437 1013.12 902.846 1009.27 902.846C1007.25 902.846 1005.78 903.516 1004.86 904.855C1003.96 906.195 1003.51 908.116 1003.51 910.618ZM1030.58 917.591C1029.92 920.134 1028.72 923.408 1026.97 927.414H1023.42C1024.36 923.723 1025.07 920.291 1025.53 917.119H1030.27L1030.58 917.591ZM1066.32 922L1063.39 911.418C1063.03 910.297 1062.39 907.692 1061.46 903.604H1061.28C1060.48 907.296 1059.85 909.914 1059.39 911.459L1056.38 922H1051.04L1044.69 899.318H1049.61L1052.5 910.495C1053.16 913.257 1053.62 915.622 1053.89 917.591H1054.02C1054.15 916.593 1054.36 915.451 1054.63 914.166C1054.92 912.867 1055.17 911.896 1055.37 911.254L1058.82 899.318H1064.11L1067.45 911.254C1067.65 911.924 1067.91 912.949 1068.21 914.33C1068.52 915.711 1068.71 916.784 1068.76 917.55H1068.93C1069.13 915.868 1069.61 913.517 1070.36 910.495L1073.29 899.318H1078.13L1071.74 922H1066.32ZM1091.96 922.41C1088.43 922.41 1085.67 921.385 1083.67 919.334C1081.69 917.27 1080.7 914.433 1080.7 910.823C1080.7 907.118 1081.62 904.206 1083.47 902.087C1085.31 899.968 1087.85 898.908 1091.07 898.908C1094.07 898.908 1096.43 899.817 1098.17 901.636C1099.91 903.454 1100.77 905.956 1100.77 909.142V911.746H1085.66C1085.73 913.947 1086.32 915.643 1087.44 916.832C1088.57 918.008 1090.14 918.596 1092.18 918.596C1093.52 918.596 1094.77 918.473 1095.91 918.227C1097.08 917.967 1098.32 917.543 1099.65 916.955V920.872C1098.47 921.433 1097.28 921.829 1096.08 922.062C1094.88 922.294 1093.5 922.41 1091.96 922.41ZM1091.07 902.559C1089.54 902.559 1088.31 903.044 1087.38 904.015C1086.47 904.985 1085.92 906.4 1085.74 908.26H1096.04C1096.01 906.387 1095.56 904.972 1094.68 904.015C1093.81 903.044 1092.61 902.559 1091.07 902.559ZM1117.84 898.908C1120.67 898.908 1122.87 899.934 1124.44 901.984C1126.03 904.035 1126.82 906.913 1126.82 910.618C1126.82 914.337 1126.02 917.235 1124.42 919.313C1122.82 921.378 1120.6 922.41 1117.75 922.41C1114.88 922.41 1112.66 921.378 1111.07 919.313H1110.74L1109.86 922H1106.25V890.09H1111.07V897.678C1111.07 898.238 1111.04 899.072 1110.99 900.18C1110.93 901.287 1110.89 901.991 1110.86 902.292H1111.07C1112.6 900.036 1114.86 898.908 1117.84 898.908ZM1116.59 902.846C1114.64 902.846 1113.24 903.42 1112.38 904.568C1111.53 905.703 1111.1 907.61 1111.07 910.29V910.618C1111.07 913.38 1111.51 915.383 1112.38 916.627C1113.26 917.857 1114.69 918.473 1116.67 918.473C1118.38 918.473 1119.67 917.796 1120.54 916.442C1121.43 915.089 1121.88 913.134 1121.88 910.577C1121.88 905.423 1120.11 902.846 1116.59 902.846ZM1147.66 915.54C1147.66 917.755 1146.85 919.457 1145.24 920.646C1143.62 921.822 1141.31 922.41 1138.3 922.41C1135.28 922.41 1132.86 921.952 1131.02 921.036V916.873C1133.69 918.104 1136.17 918.719 1138.47 918.719C1141.43 918.719 1142.92 917.823 1142.92 916.032C1142.92 915.458 1142.75 914.979 1142.43 914.597C1142.1 914.214 1141.56 913.817 1140.81 913.407C1140.05 912.997 1139.01 912.532 1137.67 912.013C1135.06 911.001 1133.29 909.989 1132.36 908.978C1131.44 907.966 1130.98 906.653 1130.98 905.04C1130.98 903.099 1131.76 901.595 1133.32 900.528C1134.89 899.448 1137.03 898.908 1139.72 898.908C1142.38 898.908 1144.91 899.448 1147.29 900.528L1145.73 904.158C1143.28 903.146 1141.22 902.641 1139.55 902.641C1137.01 902.641 1135.74 903.365 1135.74 904.814C1135.74 905.525 1136.07 906.127 1136.72 906.619C1137.39 907.111 1138.84 907.788 1141.07 908.649C1142.95 909.374 1144.31 910.037 1145.15 910.639C1146 911.24 1146.63 911.938 1147.04 912.73C1147.45 913.51 1147.66 914.446 1147.66 915.54ZM1157.7 922H1152.88V899.318H1157.7V922ZM1152.6 893.31C1152.6 892.448 1152.83 891.785 1153.29 891.32C1153.77 890.855 1154.45 890.623 1155.33 890.623C1156.17 890.623 1156.83 890.855 1157.29 891.32C1157.77 891.785 1158.01 892.448 1158.01 893.31C1158.01 894.13 1157.77 894.779 1157.29 895.258C1156.83 895.723 1156.17 895.955 1155.33 895.955C1154.45 895.955 1153.77 895.723 1153.29 895.258C1152.83 894.779 1152.6 894.13 1152.6 893.31ZM1173.06 918.514C1174.24 918.514 1175.42 918.329 1176.59 917.96V921.59C1176.06 921.822 1175.37 922.014 1174.52 922.164C1173.69 922.328 1172.82 922.41 1171.92 922.41C1167.35 922.41 1165.07 920.004 1165.07 915.191V902.969H1161.97V900.836L1165.29 899.072L1166.93 894.273H1169.91V899.318H1176.37V902.969H1169.91V915.109C1169.91 916.271 1170.19 917.133 1170.77 917.693C1171.36 918.24 1172.12 918.514 1173.06 918.514ZM1191.05 922.41C1187.52 922.41 1184.76 921.385 1182.76 919.334C1180.78 917.27 1179.79 914.433 1179.79 910.823C1179.79 907.118 1180.71 904.206 1182.56 902.087C1184.41 899.968 1186.94 898.908 1190.17 898.908C1193.16 898.908 1195.53 899.817 1197.26 901.636C1199 903.454 1199.87 905.956 1199.87 909.142V911.746H1184.75C1184.82 913.947 1185.42 915.643 1186.54 916.832C1187.66 918.008 1189.24 918.596 1191.28 918.596C1192.62 918.596 1193.86 918.473 1195.01 918.227C1196.17 917.967 1197.41 917.543 1198.74 916.955V920.872C1197.56 921.433 1196.38 921.829 1195.17 922.062C1193.97 922.294 1192.59 922.41 1191.05 922.41ZM1190.17 902.559C1188.64 902.559 1187.41 903.044 1186.48 904.015C1185.56 904.985 1185.01 906.4 1184.84 908.26H1195.13C1195.1 906.387 1194.65 904.972 1193.78 904.015C1192.9 903.044 1191.7 902.559 1190.17 902.559ZM1236.37 910.618C1236.37 914.323 1235.42 917.215 1233.52 919.293C1231.62 921.371 1228.98 922.41 1225.58 922.41C1223.47 922.41 1221.59 921.932 1219.97 920.975C1218.34 920.018 1217.09 918.644 1216.21 916.853C1215.34 915.062 1214.9 912.983 1214.9 910.618C1214.9 906.94 1215.84 904.069 1217.73 902.005C1219.62 899.94 1222.28 898.908 1225.71 898.908C1228.99 898.908 1231.59 899.968 1233.5 902.087C1235.42 904.192 1236.37 907.036 1236.37 910.618ZM1219.86 910.618C1219.86 915.854 1221.8 918.473 1225.67 918.473C1229.5 918.473 1231.41 915.854 1231.41 910.618C1231.41 905.437 1229.48 902.846 1225.63 902.846C1223.6 902.846 1222.13 903.516 1221.22 904.855C1220.31 906.195 1219.86 908.116 1219.86 910.618ZM1253.43 898.908C1254.41 898.908 1255.21 898.977 1255.83 899.113L1255.36 903.604C1254.68 903.44 1253.97 903.358 1253.23 903.358C1251.3 903.358 1249.74 903.987 1248.53 905.245C1247.34 906.503 1246.75 908.137 1246.75 910.146V922H1241.93V899.318H1245.7L1246.34 903.317H1246.58C1247.34 901.964 1248.31 900.891 1249.52 900.098C1250.73 899.305 1252.04 898.908 1253.43 898.908ZM1285.16 922L1284.2 918.842H1284.03C1282.94 920.223 1281.84 921.166 1280.73 921.672C1279.62 922.164 1278.2 922.41 1276.46 922.41C1274.24 922.41 1272.49 921.809 1271.24 920.605C1269.99 919.402 1269.37 917.7 1269.37 915.499C1269.37 913.161 1270.24 911.397 1271.97 910.208C1273.71 909.019 1276.36 908.369 1279.91 908.26L1283.83 908.137V906.927C1283.83 905.478 1283.49 904.397 1282.8 903.687C1282.13 902.962 1281.09 902.6 1279.66 902.6C1278.5 902.6 1277.39 902.771 1276.32 903.112C1275.25 903.454 1274.23 903.857 1273.25 904.322L1271.69 900.877C1272.92 900.234 1274.26 899.749 1275.73 899.421C1277.19 899.079 1278.57 898.908 1279.87 898.908C1282.75 898.908 1284.93 899.537 1286.39 900.795C1287.87 902.053 1288.61 904.028 1288.61 906.722V922H1285.16ZM1277.98 918.719C1279.73 918.719 1281.13 918.233 1282.19 917.263C1283.25 916.278 1283.79 914.904 1283.79 913.141V911.172L1280.87 911.295C1278.6 911.377 1276.95 911.76 1275.91 912.443C1274.89 913.113 1274.37 914.146 1274.37 915.54C1274.37 916.552 1274.67 917.338 1275.28 917.898C1275.88 918.445 1276.78 918.719 1277.98 918.719ZM1306.84 922.41C1303.97 922.41 1301.74 921.378 1300.15 919.313H1299.86C1300.06 921.228 1300.15 922.39 1300.15 922.8V932.09H1295.33V899.318H1299.23C1299.34 899.742 1299.56 900.754 1299.91 902.354H1300.15C1301.66 900.057 1303.91 898.908 1306.92 898.908C1309.75 898.908 1311.95 899.934 1313.52 901.984C1315.11 904.035 1315.9 906.913 1315.9 910.618C1315.9 914.323 1315.09 917.215 1313.48 919.293C1311.88 921.371 1309.67 922.41 1306.84 922.41ZM1305.67 902.846C1303.75 902.846 1302.35 903.406 1301.46 904.527C1300.59 905.648 1300.15 907.439 1300.15 909.9V910.618C1300.15 913.38 1300.59 915.383 1301.46 916.627C1302.34 917.857 1303.77 918.473 1305.75 918.473C1307.42 918.473 1308.7 917.789 1309.61 916.422C1310.51 915.055 1310.96 913.106 1310.96 910.577C1310.96 908.034 1310.51 906.113 1309.61 904.814C1308.72 903.502 1307.4 902.846 1305.67 902.846ZM1333 922.41C1330.13 922.41 1327.91 921.378 1326.32 919.313H1326.03C1326.22 921.228 1326.32 922.39 1326.32 922.8V932.09H1321.5V899.318H1325.4C1325.51 899.742 1325.73 900.754 1326.07 902.354H1326.32C1327.82 900.057 1330.08 898.908 1333.09 898.908C1335.92 898.908 1338.12 899.934 1339.69 901.984C1341.28 904.035 1342.07 906.913 1342.07 910.618C1342.07 914.323 1341.26 917.215 1339.65 919.293C1338.05 921.371 1335.83 922.41 1333 922.41ZM1331.84 902.846C1329.92 902.846 1328.52 903.406 1327.63 904.527C1326.76 905.648 1326.32 907.439 1326.32 909.9V910.618C1326.32 913.38 1326.76 915.383 1327.63 916.627C1328.51 917.857 1329.94 918.473 1331.92 918.473C1333.59 918.473 1334.87 917.789 1335.77 916.422C1336.68 915.055 1337.13 913.106 1337.13 910.577C1337.13 908.034 1336.68 906.113 1335.77 904.814C1334.88 903.502 1333.57 902.846 1331.84 902.846ZM1350.03 912.895V911.582C1350.03 910.078 1350.3 908.827 1350.85 907.829C1351.39 906.831 1352.35 905.799 1353.72 904.732C1355.34 903.447 1356.39 902.449 1356.86 901.738C1357.33 901.027 1357.57 900.18 1357.57 899.195C1357.57 898.047 1357.19 897.165 1356.42 896.55C1355.66 895.935 1354.56 895.627 1353.12 895.627C1351.82 895.627 1350.62 895.812 1349.51 896.181C1348.41 896.55 1347.33 896.994 1346.27 897.514L1344.55 893.904C1347.33 892.359 1350.3 891.587 1353.47 891.587C1356.15 891.587 1358.28 892.243 1359.85 893.556C1361.42 894.868 1362.21 896.68 1362.21 898.99C1362.21 900.016 1362.06 900.932 1361.76 901.738C1361.46 902.531 1361 903.29 1360.38 904.015C1359.78 904.739 1358.74 905.683 1357.25 906.845C1355.97 907.843 1355.12 908.67 1354.68 909.326C1354.26 909.982 1354.05 910.864 1354.05 911.972V912.895H1350.03ZM1349.19 919.437C1349.19 917.372 1350.19 916.34 1352.2 916.34C1353.18 916.34 1353.94 916.613 1354.46 917.16C1354.98 917.693 1355.24 918.452 1355.24 919.437C1355.24 920.407 1354.97 921.18 1354.44 921.754C1353.92 922.314 1353.17 922.595 1352.2 922.595C1351.23 922.595 1350.48 922.321 1349.96 921.774C1349.45 921.214 1349.19 920.435 1349.19 919.437Z" fill="white" /> -->

        </g>
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(960.084 540) scale(778.794)">
            <stop stop-color="#01B4FD" />
            <stop offset="1" stop-color="#009AF9" />
          </radialGradient>
          <clipPath id="clip0">
            <rect width="1920" height="1080" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>

  </div>

  <Footer
    class="-mt-2"
    footerList={footerData}
    on:click={() => (showOverlay = true)} />

  {#if showOverlay}
    <Overlay on:click={() => (showOverlay = false)}>
      <!-- slot for content, uncomment below to see example-->
      <!-- <p>I'm a modal</p> -->
    </Overlay>
  {/if}

</div>
