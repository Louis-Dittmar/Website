// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dark/Light mode toggle with localStorage support
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
let darkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode on page load if it was active before
if (darkMode) {
  document.body.classList.add('dark-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);

  if (darkMode) {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    document.body.classList.remove('dark-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const hero = document.querySelector('.hero');

  if (scrollPosition < hero.offsetHeight) {
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  }
});

// Animation for project cards
const projectCards = document.querySelectorAll('.project-card');

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Animation on scroll
function animateOnScroll() {
  projectCards.forEach((card, index) => {
    if (isInViewport(card)) {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}

// Initial styles for cards
projectCards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  // Ensure hover effects work properly
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
