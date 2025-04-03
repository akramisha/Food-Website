document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle-checkbox")
    const htmlElement = document.documentElement
  
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      htmlElement.className = savedTheme
      themeToggle.checked = savedTheme === "dark"
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      htmlElement.className = prefersDark ? "dark" : ""
      themeToggle.checked = prefersDark
    }
  
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        htmlElement.className = "dark"
        localStorage.setItem("theme", "dark")
      } else {
        htmlElement.className = ""
        localStorage.setItem("theme", "")
      }
    })
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active")
  
      // Animate hamburger to X
      const spans = this.querySelectorAll("span")
      if (mobileMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          const spans = mobileMenuBtn.querySelectorAll("span")
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      }
    })
  
    // Menu Category Filter
    const categoryBtns = document.querySelectorAll(".category-btn")
    const menuItems = document.querySelectorAll(".menu-item")
  
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const category = this.getAttribute("data-category")
  
        // Show all items if 'all' category is selected
        if (category === "all") {
          menuItems.forEach((item) => {
            item.style.display = "block"
          })
        } else {
          // Show items of selected category and hide others
          menuItems.forEach((item) => {
            if (item.getAttribute("data-category") === category) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          })
        }
      })
    })
  
    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${100 * (i - index)}%)`
      })
  
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index)
      })
    }
  
    // Initialize testimonial slider
    showTestimonial(currentTestimonial)
  
    // Add click event to dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentTestimonial = i
        showTestimonial(currentTestimonial)
      })
    })
  
    // Auto slide testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      showTestimonial(currentTestimonial)
    }, 5000)
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("header a, .mobile-menu a, .footer-links a")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
  
        if (href.startsWith("#")) {
          e.preventDefault()
  
          const targetId = href
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains("active")) {
              mobileMenu.classList.remove("active")
              const spans = mobileMenuBtn.querySelectorAll("span")
              spans[0].style.transform = "none"
              spans[1].style.opacity = "1"
              spans[2].style.transform = "none"
            }
  
            // Scroll to target
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            })
  
            // Update active link
            navLinks.forEach((link) => link.classList.remove("active"))
            this.classList.add("active")
          }
        }
      })
    })
  
    // Add to cart animation
    const addToCartBtns = document.querySelectorAll(".add-to-cart")
  
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        this.innerHTML = '<i class="fas fa-check"></i>'
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-plus"></i>'
        }, 1500)
      })
    })
  
    // Scroll reveal animation
    const revealElements = document.querySelectorAll(
      ".section-header, .menu-item, .special-offer, .testimonial, .about-content, .contact-content",
    )
  
    function checkScroll() {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    revealElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(50px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    // Check on load
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  })
  
  // Add this code at the end of your existing script.js file or replace it if it already has mobile menu functionality
  
  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', function() {
              mobileMenu.classList.toggle('active');
              
              // Animate hamburger to X
              const spans = this.querySelectorAll('span');
              if (mobileMenu.classList.contains('active')) {
                  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                  spans[1].style.opacity = '0';
                  spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
              } else {
                  spans[0].style.transform = 'none';
                  spans[1].style.opacity = '1';
                  spans[2].style.transform = 'none';
              }
          });
          
          // Close mobile menu when clicking on a link
          const mobileMenuLinks = mobileMenu.querySelectorAll('a');
          mobileMenuLinks.forEach(link => {
              link.addEventListener('click', function() {
                  mobileMenu.classList.remove('active');
                  
                  // Reset hamburger icon
                  const spans = mobileMenuBtn.querySelectorAll('span');
                  spans[0].style.transform = 'none';
                  spans[1].style.opacity = '1';
                  spans[2].style.transform = 'none';
              });
          });
      }
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
          if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target) && mobileMenu.classList.contains('active')) {
              mobileMenu.classList.remove('active');
              
              // Reset hamburger icon
              const spans = mobileMenuBtn.querySelectorAll('span');
              spans[0].style.transform = 'none';
              spans[1].style.opacity = '1';
              spans[2].style.transform = 'none';
          }
      });
  });
  
// mobile menu
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const spans = mobileMenuBtn.querySelectorAll("span");

    mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
        
        if (mobileMenu.classList.contains("active")) {
            // Show Cross (X)
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0"; // Hide middle line
            spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            // Show Normal Menu Lines
            spans[0].style.transform = "rotate(0)";
            spans[1].style.opacity = "1"; // Show middle line
            spans[2].style.transform = "rotate(0)";
        }
    });
});



