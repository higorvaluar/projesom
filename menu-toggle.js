document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
        }
      });
    });
  }
});

document.addEventListener('click', function (e) {
  const mainNav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !toggle.contains(e.target)) {
    mainNav.classList.remove('active');
  }
});
