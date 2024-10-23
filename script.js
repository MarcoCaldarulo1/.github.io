// Navigation bar background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#2c3e50'; // Darker color when scrolling for contrast
    } else {
        nav.style.backgroundColor = '#1E90FF'; // Set to your desired color for non-scroll state
    }
});

// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});
