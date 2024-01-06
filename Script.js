const dropDownAnimation = `
      @keyframes dropDown {
        0% {
          transform: translateY(-50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = dropDownAnimation;
    document.head.appendChild(styleElement);

    window.addEventListener("load", () => {
      const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach((link, index) => {
        link.style.animation = `dropDown 0.5s ease-in-out ${index * 0.2}s forwards`;
      });
    });

    const typingElement = document.querySelector(".animated-text");
    const texts = [
      "Full Stack Development",
      "Java",
      "Python",
      "Data Structures",
      "Algorithms",
      "Linux",
      "SQL",
      "HTML & CSS"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentText = texts[textIndex];
      typingElement.innerHTML = `<span class="white-text">And I know </span>${currentText.substring(0, charIndex)}<span class="cursor"></span>`;
  
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
  
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }
  
      setTimeout(type, isDeleting ? 80 : 80);
    }
    type();
  
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollOffset = 60;
      
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - scrollOffset,
            behavior: 'smooth'
          });
        }
      });
    });
    
    const imageContainer = document.querySelector(".image-container");
    gsap.from(imageContainer, { duration: 2.5, opacity: 0, delay: 0.5});

    const loadingContainer = document.querySelector(".loading-container");

    setTimeout(() => {
      loadingContainer.style.opacity = "0";
      loadingContainer.style.visibility = "hidden";
    }, 3000);

    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });

    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    const particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 1 + 0.5; // Adjust speed
        this.color = this.getRandomColor(); // Random blue, light blue, or purple shade
      }

      getRandomColor() {
        const randomValue = Math.random();
        if (randomValue < 0.33) {
          return `rgba(100, 0, 245, ${Math.random() * 0.5 + 0.1})`;
        } else if (randomValue < 0.66) {
          return `rgba(135, 206, 235, ${Math.random() * 0.5 + 0.1})`;
        } else {
          return `rgba(128, 0, 128, ${Math.random() * 0.5 + 0.1})`;
        }
      }
      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      drawGlow() {
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 0.7;
        this.draw();
        ctx.globalAlpha = 1; 
        ctx.shadowBlur = 30;
      }
    }
    function init() {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.drawGlow();
      }
    }
    init();
    animate();

    document.getElementById('downloadButton').addEventListener('click', function() {
      const pdfPath = 'Resume.pdf';
      
      const link = document.createElement('a');
      link.href = pdfPath;
      link.target = '_blank';
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
    });

    function triggerSectionAnimation(sectionId) {
      const sectionLink = document.getElementById(`${sectionId}-link`);
      if (sectionLink) {
        sectionLink.click();
      }
    }
  
    window.addEventListener('load', () => {
      const sectionLinks = document.querySelectorAll('.nav-link-container');
      sectionLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substr(1); // Get the section ID
        link.addEventListener('click', () => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.classList.add('animate-section');
          }
        });
      });
    });

  
    document.addEventListener("DOMContentLoaded", function () {
      const hiddenParagraphsContainer = document.querySelector(".hidden-paragraphs");
      const showMoreButton = document.querySelector(".show-more-button");
      const showLessButton = document.querySelector(".show-less-button");
  
      showMoreButton.addEventListener("click", function () {
        hiddenParagraphsContainer.classList.add("visible");
        showMoreButton.style.display = "none";
        showLessButton.style.display = "block";
      });
  
      showLessButton.addEventListener("click", function () {
        hiddenParagraphsContainer.classList.remove("visible");
        showMoreButton.style.display = "block";
        showLessButton.style.display = "none";
      });
    });

    // Get all the donut containers
  const donutContainers = document.querySelectorAll('.donut-container');

  // Define the animation function
  function animateDonut(containerId, percentage) {
    const donutSegment = document.querySelector(`#${containerId} .donut-segment`);
    const donutText = document.querySelector(`#${containerId} .donut-text`);

    const circumference = 2 * Math.PI * donutSegment.getAttribute('r');
    const dashArray = circumference;

    donutSegment.style.strokeDasharray = `${dashArray} ${circumference}`;
    donutSegment.style.strokeDashoffset = circumference;
    donutText.textContent = `0%`;

    let currentDashOffset = circumference;
    const animationInterval = setInterval(() => {
      if (currentDashOffset <= circumference - dashArray * (percentage / 100)) {
        clearInterval(animationInterval);
      } else {
        currentDashOffset -= 0.65;
        donutSegment.style.strokeDashoffset = currentDashOffset;
        donutText.textContent = `${Math.round((1 - currentDashOffset / circumference) * 100)}%`;
      }
    }, 10);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const sectionLinks = document.querySelectorAll('.nav-link-container');
    sectionLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substr(1); // Get the section ID
      link.addEventListener('click', () => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.classList.add('animate-section');
  
          // Check if the clicked section is the "Skills" section
          if (sectionId === 'skills') {
            // Call the animation function for the donut rings
            animateSkills();
          }
        }
      });
    });
  });
  
  // Animation function for the donut rings
  function animateSkills() {
    // Call the animation function for each donut container
    animateDonut('donut-container-1', 88); // Replace with your desired percentage
    animateDonut('donut-container-2', 74); // Replace with your desired percentage
    animateDonut('donut-container-3', 94);
    animateDonut('donut-container-4', 94);
    animateDonut('donut-container-5', 76);
    animateDonut('donut-container-6', 80);
    animateDonut('donut-container-7', 94);
    animateDonut('donut-container-8', 93);
    animateDonut('donut-container-9', 74);
  }

  //calling same animation when website loads
  animateDonut('donut-container-1', 88);
  animateDonut('donut-container-2', 74); 
  animateDonut('donut-container-3', 94);
  animateDonut('donut-container-4', 94);
  animateDonut('donut-container-5', 76);
  animateDonut('donut-container-6', 80);
  animateDonut('donut-container-7', 94);
  animateDonut('donut-container-8', 93);
  animateDonut('donut-container-9', 74);

  (function () {
    'use strict';
    var items = document.querySelectorAll(".timeline li");

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.bottom - 100 > 0 && rect.top + 100 < (window.innerHeight || document.documentElement.clientHeight));
    }

    function callbackFunction() {
        for (var i = 0; i < items.length; i++) {
            if (isElementInViewport(items[i])) {
                items[i].classList.add("in-view");
            }
        }
    }

    window.addEventListener("load", callbackFunction);
    window.addEventListener("resize", callbackFunction);
    window.addEventListener("scroll", callbackFunction);
  })();

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const resetButton = document.getElementById("reset-button");
  
    resetButton.addEventListener("click", function () {
      form.reset();
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submittedPopup = document.getElementById("submitted-popup");
    const popupCloseButton = submittedPopup.querySelector(".close-button");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submittedPopup.style.display = "flex";
    });
  
    popupCloseButton.addEventListener("click", function () {
      submittedPopup.style.display = "none";
    });
  });
