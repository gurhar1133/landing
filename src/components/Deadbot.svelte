<script>
    import interact from "interactjs";
    export let width;
    export let height;
    export let robotLive = false;
    export let headRotationalClass = "";
    export let leftArmRotationalClass = "";
    export let rightArmRotationalClass = "";
    export let leftLegRotationalClass = "";
    export let rightLegRotationalClass = "";
    export let bodyRotationalClass = "";
    export let batteryRotationalClass = "";

    let bodyConnected = false;
    let leftArmConnected = false;
    let rightArmConnected = false;
    let leftLegConnected = false;
    let rightLegConnected = false;
    let batteryConnected = false;
    let robotDialogue;
    let initialDialogue = "Put me back together please";

    let bodyLocation;
    let headLocation;
    let rightArmLocation;
    let leftArmLocation;
    let rightLegLocation;
    let leftLegLocation;
    let batteryLocation;

    setTimeout(()=>{
        initialDialogue = "Drag my head all the way up then attach my body";
    }, 9000);

    $: if (bodyConnected && leftArmConnected && rightArmConnected && leftLegConnected
        && rightLegConnected && batteryConnected){
        robotDialogue = "You've done it!! Im complete!";
        setTimeout(()=>{
        robotLive = true;
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
          { x: .5, y: 1} 
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
          { x: .5, y: 0} 
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
          { x: 1.5 , y: 0}
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
          { x: -.5 , y: 0}
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
          {x: 0, y: -1}
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
          { x: .5, y: 0} 
        ]
      })
    ]
  });

  function dragMoveListener(event) {
   
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
      
        leftArmConnected = true;

    } else if (target.classList.contains("right-arm")) {
      rightArmRotationalClass = "rotateRightArm";
      rightArmLocation = {x: x, y: y};
      
      rightArmConnected = true;

    } else if (target.classList.contains("left-leg")) {
      leftLegRotationalClass = "rotateLeftLeg";
      leftLegLocation = {x: x, y: y};
      
      leftLegConnected = true;


    } else if (target.classList.contains("right-leg")) {
      rightLegRotationalClass = "rotateRightLeg";
      rightLegLocation = {x: x, y: y};
     
      rightLegConnected = true;

    } else if (target.classList.contains("body")) {
      bodyRotationalClass = "rotateBody";
      bodyLocation = {x: x, y: y};
      
      bodyConnected = true;

    } else if (target.classList.contains("battery")) {
      batteryRotationalClass = "rotateBattery";
      batteryLocation = {x: x, y: y};
      
      batteryConnected = true;
            
    }
  
  }

</script>

<style>
    .head {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    width: 5rem;
  }

  .text-bubble {
    animation: 3s fadeInAndOut linear infinite;
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

  .typewriter h4 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    /*border-right: .15em solid orange; */ /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.1em; /* Adjust as needed */
    animation: typing 2s steps(100, end), blink-caret 3s step-end infinite;
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

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
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

</style>

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

      <div class={`head draggable`} >
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