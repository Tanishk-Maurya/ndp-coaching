(function () {
  "use strict";

  /**
   * Add .scrolled class to body on scroll
   */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 100) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.body.classList.toggle("mobile-nav-active");

    if (mobileNavToggleBtn.classList.contains("fa-bars")) {
      mobileNavToggleBtn.classList.remove("fa-bars");
      mobileNavToggleBtn.classList.add("fa-xmark"); // change to "X"
    } else {
      mobileNavToggleBtn.classList.remove("fa-xmark");
      mobileNavToggleBtn.classList.add("fa-bars");
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  /**
   * Toggle dropdowns in mobile nav
   */
  document.querySelectorAll(".navmenu .dropdown > a").forEach((dropdownLink) => {
    dropdownLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 1199) {
        e.preventDefault();
        e.stopPropagation(); // prevent closing mobile menu

        let parent = this.parentElement;
        parent.classList.toggle("active");

        let submenu = parent.querySelector("ul");
        if (submenu) {
          submenu.classList.toggle("dropdown-active");
        }
      }
    });
  });

  /**
   * Close mobile menu on nav link click (except dropdown toggles)
   */
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (
        document.body.classList.contains("mobile-nav-active") &&
        !link.parentElement.classList.contains("dropdown")
      ) {
        mobileNavToggle();
      }
    });
  });


  // keep active link styling of nav

  const navLinks = document.querySelectorAll('.navmenu a');

  // Function to remove active from all links
  function removeActive() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  // Add click event to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      removeActive();
      this.classList.add('active');
    });
  });

  // Highlight current page link based on URL
  const currentUrl = window.location.href;
  navLinks.forEach(link => {
    if (link.href === currentUrl) {
      removeActive();
      link.classList.add('active');
    }
  });




  /**
   * Scroll Top Button
   */
  const scrollTopBtn = document.querySelector("#scroll-top");

  function toggleScrollTop() {
    if (scrollTopBtn) {
      if (window.scrollY > 100) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);
})();
