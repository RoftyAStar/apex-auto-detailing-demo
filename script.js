/* Apex Auto Detailing — demo interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const bookingForm = document.getElementById("booking-form");
  const formMessage = document.getElementById("form-message");
  const serviceSelect = document.getElementById("service");
  const dateInput = document.getElementById("preferred-date");
  const yearElement = document.getElementById("current-year");

  // Keep the footer year current.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Prevent choosing a date in the past.
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    dateInput.min = localToday;
  }

  // Mobile navigation open/close.
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) closeMenu();
    });
  }

  // Service cards can preselect a service in the request form.
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const chosenService = link.getAttribute("data-service");
      if (serviceSelect && chosenService) {
        serviceSelect.value = chosenService;
      }
    });
  });

  // Demo-only form behavior. This does not send or store form submissions.
  if (bookingForm && formMessage) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!bookingForm.reportValidity()) return;

      formMessage.textContent =
        "Demo preview only: your form looks good, but this request has not been sent or saved. A real booking workflow needs a connected form service.";
      formMessage.classList.add("is-visible");
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    bookingForm.addEventListener("input", () => {
      formMessage.classList.remove("is-visible");
      formMessage.textContent = "";
    });

    bookingForm.addEventListener("change", () => {
      formMessage.classList.remove("is-visible");
      formMessage.textContent = "";
    });
  }
});
