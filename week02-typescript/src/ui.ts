export const initNavigation = (): void => {
  const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
  const mainNav = document.querySelector<HTMLElement>("#mainNav");

  if (!menuButton || !mainNav) {
    return;
  }

  const setMenuOpen = (open: boolean): void => {
    mainNav.dataset.open = String(open);
    menuButton.setAttribute("aria-expanded", String(open));
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(mainNav.dataset.open !== "true");
  });

  mainNav.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element && target.closest("a") !== null) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.dataset.open === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
};

export const initAnnouncement = (): void => {
  const announcement = document.querySelector<HTMLElement>("#announcement");
  const announcementClose = document.querySelector<HTMLButtonElement>("#announcementClose");

  if (!announcement || !announcementClose) {
    return;
  }

  announcementClose.addEventListener("click", () => {
    announcement.classList.add("hidden");
    announcementClose.blur();
  });
};
