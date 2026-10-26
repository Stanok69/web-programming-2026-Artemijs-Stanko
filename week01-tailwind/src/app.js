const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

const setMenuOpen = (open) => {
  mainNav.dataset.open = String(open);
  menuButton.setAttribute("aria-expanded", String(open));
};

menuButton.addEventListener("click", () => {
  setMenuOpen(mainNav.dataset.open !== "true");
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav.dataset.open === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const desktopQuery = window.matchMedia("(min-width: 768px)");

desktopQuery.addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

const announcement = document.querySelector("#announcement");
const announcementClose = document.querySelector("#announcementClose");

announcementClose.addEventListener("click", () => {
  announcement.classList.add("hidden");
  announcementClose.blur();
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-status]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.dataset.active = String(isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" || card.dataset.status === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});
