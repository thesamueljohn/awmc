// Get elements
const aboutNavLink = document.getElementById("nav-item-about");
const programNavLink = document.getElementById("nav-item-program");
const resourcesNavLink = document.getElementById("nav-item-resources");
const aboutDropdown = document.getElementById("dropdown-about");
const programDropdown = document.getElementById("dropdown-program");
const resourcesDropdown = document.getElementById("dropdown-resources");

// Header Shadow Effect on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Dropdown functionality
function showDropdown(trigger, dropdown) {
  if (dropdown) {
    dropdown.style.opacity = "1";
    dropdown.style.visibility = "visible";
    dropdown.style.transform = "translateY(0)";
  }
}

function hideDropdown(dropdown) {
  if (dropdown) {
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";
    dropdown.style.transform = "translateY(-10px)";
  }
}

// Add hover events for dropdowns
if (aboutNavLink && aboutDropdown) {
  aboutNavLink.addEventListener("mouseenter", () =>
    showDropdown(aboutNavLink, aboutDropdown)
  );
  aboutNavLink.addEventListener("mouseleave", () =>
    hideDropdown(aboutDropdown)
  );
  aboutDropdown.addEventListener("mouseenter", () =>
    showDropdown(aboutNavLink, aboutDropdown)
  );
  aboutDropdown.addEventListener("mouseleave", () =>
    hideDropdown(aboutDropdown)
  );
}

if (programNavLink && programDropdown) {
  programNavLink.addEventListener("mouseenter", () =>
    showDropdown(programNavLink, programDropdown)
  );
  programNavLink.addEventListener("mouseleave", () =>
    hideDropdown(programDropdown)
  );
  programDropdown.addEventListener("mouseenter", () =>
    showDropdown(programNavLink, programDropdown)
  );
  programDropdown.addEventListener("mouseleave", () =>
    hideDropdown(programDropdown)
  );
}

if (resourcesNavLink && resourcesDropdown) {
  resourcesNavLink.addEventListener("mouseenter", () =>
    showDropdown(resourcesNavLink, resourcesDropdown)
  );
  resourcesNavLink.addEventListener("mouseleave", () =>
    hideDropdown(resourcesDropdown)
  );
  resourcesDropdown.addEventListener("mouseenter", () =>
    showDropdown(resourcesNavLink, resourcesDropdown)
  );
  resourcesDropdown.addEventListener("mouseleave", () =>
    hideDropdown(resourcesDropdown)
  );
}

// FAQ Toggle Functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0.1s";
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".speaker-feature, .feature-card, .testimonial-card, .pricing-card, .speaker-feature"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Mobile Menu Functionality
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileDropdownLinks = document.querySelectorAll(
  ".mobile-nav-link.has-dropdown"
);

// Toggle mobile menu
function toggleMobileMenu() {
  const isActive = mobileMenu.classList.contains("active");

  if (isActive) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// Open mobile menu
function openMobileMenu() {
  mobileMenu.classList.add("active");
  mobileMenuOverlay.classList.add("active");
  hamburgerMenu.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  hamburgerMenu.classList.remove("active");
  document.body.style.overflow = "auto";

  // Close all dropdowns
  document.querySelectorAll(".mobile-nav-item").forEach((item) => {
    item.classList.remove("active");
  });
}

// Event listeners
hamburgerMenu.addEventListener("click", toggleMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Mobile dropdown functionality
mobileDropdownLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const navItem = link.closest(".mobile-nav-item");
    const isActive = navItem.classList.contains("active");

    // Close all other dropdowns
    document.querySelectorAll(".mobile-nav-item").forEach((item) => {
      if (item !== navItem) {
        item.classList.remove("active");
      }
    });

    // Toggle current dropdown
    if (isActive) {
      navItem.classList.remove("active");
    } else {
      navItem.classList.add("active");
    }
  });
});

// Close mobile menu when clicking on non-dropdown links
document
  .querySelectorAll(
    ".mobile-nav-link:not(.has-dropdown), .mobile-dropdown-item, .mobile-watch-live, .mobile-register-btn"
  )
  .forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

// Close mobile menu on window resize if screen becomes large
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});


// Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

 // Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target);
    }
  });
});