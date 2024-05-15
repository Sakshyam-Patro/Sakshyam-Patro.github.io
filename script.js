document.addEventListener('DOMContentLoaded', function() {
    // Get the menu icon and navigation menu elements
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.querySelector('.navbar');
  
    // Add a click event listener to the menu icon
    menuIcon.addEventListener('click', function() {
      // Toggle the 'active' class on the navigation menu
      navMenu.classList.toggle('active');
    });
  
    // Close the menu when a navigation link is clicked (optional)
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  });