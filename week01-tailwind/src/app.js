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
