function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loaderanimaton() {
  var tl = gsap.timeline();
  var h2 = document.querySelector(".line2 h2");
  var grow = 0;

  tl.from(".line h1", {
    y: 150,
    stagger: 0.2,
  });
  tl.from(".line2", {
    opacity: 0,
    onStart: function () {
      const clrinterval = setInterval(function () {
        if (grow < 100) {
          h2.innerHTML = grow++;
        } else {
          h2.innerHTML = grow;
          clearInterval(clrinterval);
        }
        console.log("JJ");
      }, 30);
    },
  });
  tl.to("#loader", {
    delay: 4,
    opacity: 0,
    duration: 0.2,
  });
  tl.from(".page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    duration: 1,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from(".nav", {
    opacity: 0,
    y: -100,
  });
  tl.from(".page1 .line", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
  });
}
function cursor() {
  document.addEventListener("mousemove", function (dets) {
    console.log(dets);
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet(".nav i,a" /* Element to target.*/, {
    //Parameters are optional.
  });



  
}
function shery(){
  Shery.imageEffect(".image-div", {
    style: 5,
    slideStyle: (setScroll) => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY / innerHeight); //Updating the scroll
      });
    },
  });
}

gsap.to("#circle-container",{
  x:-300,
  duration:5,
  ease:`none`,
  scrollTrigger:{
    trigger:"#page5",
    start:"400% top",
    end:"500% 50%",
    scrub:5,
  }
 })

 
const gallery  = document.querySelector("#gallery");

gallery.addEventListener("mousemove",function(dets){
     var x = dets.clientX/window.innerWidth;
     var y = dets.clientY/window.innerHeight;
     var finalx = gallery.offsetWidth * x;
     var finaly = gallery.offsetHeight * y;
   gallery.style.transform = `translate(${finalx*-0.5}px,${finaly*-0.4}px)`
}) 

 var  circ = document.querySelectorAll("#page5-bottom button")
 circ.forEach(function(circle){
   circle.addEventListener("mousemove",function(dets){
        var dim = circle.getBoundingClientRect();
      var  x = dets.pageX - dim.left - dim.width / 2 ;
      var y = dets.clientY - dim.top - dim.height / 2 ;
          console.log(x,y);
         circle.style.transform = `translate(${x*1}px,${y*1}px)`;
         circle.children[0].style.transform = `translate(${x*0.3}px,${y*0.3}px)`;
      })
 
      circle.addEventListener("mouseleave",function(dets){
         circle.style.transform = `translate(0px,0px)`;
         circle.children[0].style.transform =  `translate(0px,0px)`;
 
      })
 })



var track = document.querySelector("#img-container");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${80 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
document.querySelector("#page6").onmousedown = e => handleOnDown(e);
  
  document.querySelector("#page6").ontouchstart = e => handleOnDown(e.touches[0]);
  
  document.querySelector("#page6").onmouseup = e => handleOnUp(e);
  
  document.querySelector("#page6").ontouchend = e => handleOnUp(e.touches[0]);
  
  document.querySelector("#page6").onmousemove = e => handleOnMove(e);
  
  document.querySelector("#page6").ontouchmove = e => handleOnMove(e.touches[0]);
  

loaderanimaton();
cursor();
locomotiveAnimation();
shery();
