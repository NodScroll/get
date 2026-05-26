// Fade in logo after load to prevent white-background flash
window.addEventListener('load', () => {
  const logo = document.querySelector('.hero-logo');
  if (logo) logo.style.opacity = '1';
});

document.addEventListener("DOMContentLoaded", () => {

  // --- section fade reveals ---
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(40px)';
    sec.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(sec);
  });
  
  const style = document.createElement('style');
  style.innerHTML = `
    section.visible { opacity: 1 !important; transform: translateY(0) !important; }
    .testimonial { transform: rotate(-1deg) translateY(40px); }
    .testimonial.visible { transform: rotate(-1deg) translateY(0) !important; }
    .testimonial.visible:hover { transform: rotate(0deg) scale(1.02) !important; }
  `;
  document.head.appendChild(style);


  // --- scrollymation for testimonial --- 
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof SplitType !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Split text into words
    const textElement = new SplitType('#testimonial-text', { types: 'words' });

    // GSAP ScrollTrigger animation for the words (using native scroll)
    gsap.from(textElement.words, {
      scrollTrigger: {
        trigger: '.testimonial',
        start: 'top 85%',
        end: 'bottom 50%',
        scrub: true,
      },
      opacity: 0.1,
      y: 10,
      stagger: 0.05,
      ease: 'power1.out',
    });
  }

  // --- Interactive Head-Controlled Logo (#2) ---
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation based on cursor position (-15 to 15 degrees)
      const rotateX = ((clientY / innerHeight) - 0.5) * -30;
      const rotateY = ((clientX / innerWidth) - 0.5) * 30;
      
      // Apply the 3D tilt effect to simulate "following" the user
      heroLogo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Reset when mouse leaves window
    document.addEventListener('mouseleave', () => {
      heroLogo.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }
});
