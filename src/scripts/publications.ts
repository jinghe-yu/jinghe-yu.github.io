const filters = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-publication-filter]"),
];
const cards = [...document.querySelectorAll<HTMLElement>(".pub-card")];
const groups = [
  ...document.querySelectorAll<HTMLElement>("[data-publication-group]"),
];
const count = document.getElementById("publication-count");
const abstractButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-abstract-toggle]"),
];
let activeAbstractButton: HTMLButtonElement | null = null;

function setAbstractOpen(button: HTMLButtonElement, open: boolean) {
  const panelId = button.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!panel) return;

  button.setAttribute("aria-expanded", String(open));
  panel.setAttribute("aria-hidden", String(!open));
  panel.inert = !open;
  button
    .closest<HTMLElement>(".pub-card")
    ?.setAttribute("data-abstract-open", String(open));
  activeAbstractButton = open
    ? button
    : activeAbstractButton === button
      ? null
      : activeAbstractButton;
}

for (const button of abstractButtons) {
  button.addEventListener("click", () => {
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    if (activeAbstractButton && activeAbstractButton !== button) {
      setAbstractOpen(activeAbstractButton, false);
    }
    setAbstractOpen(button, shouldOpen);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !activeAbstractButton) return;
  const button = activeAbstractButton;
  setAbstractOpen(button, false);
  button.focus();
});

// Keep the caption and neutral background usable if an imported remote image fails.
for (const image of document.querySelectorAll<HTMLImageElement>(
  "[data-research-image]",
)) {
  const hideFailedImage = () => {
    image.hidden = true;
  };
  image.addEventListener("error", hideFailedImage);
  if (image.complete && image.naturalWidth === 0) hideFailedImage();
}

for (const button of filters) {
  button.addEventListener("click", () => {
    if (activeAbstractButton) setAbstractOpen(activeAbstractButton, false);
    const category = button.dataset.publicationFilter;
    for (const filter of filters)
      filter.setAttribute("aria-pressed", String(filter === button));
    for (const card of cards) {
      card.hidden =
        category !== "all" &&
        !(card.dataset.categories ?? "").split(" ").includes(category ?? "");
    }
    for (const group of groups) {
      const visible = group.querySelectorAll(".pub-card:not([hidden])").length;
      group.hidden = visible === 0;
      const groupCount = group.querySelector("[data-group-count]");
      if (groupCount) groupCount.textContent = String(visible);
    }
    if (count)
      count.textContent = `Showing ${cards.filter((card) => !card.hidden).length} publications`;
  });
}

// A research link should always reveal its paper, even after a topic filter was used.
const allPublicationsFilter = filters.find(
  (button) => button.dataset.publicationFilter === "all",
);
for (const link of document.querySelectorAll<HTMLAnchorElement>(
  'a[href^="#"]',
)) {
  const target = document.getElementById(link.hash.slice(1));
  if (!target?.classList.contains("pub-card")) continue;
  link.addEventListener("click", () => {
    if (target.hidden) allPublicationsFilter?.click();
  });
}

const toast = document.getElementById("copy-toast");
let toastTimer: ReturnType<typeof setTimeout>;
function notify(message: string) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    toast.textContent = "";
  }, 3000);
}

for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-copy-bibtex]",
)) {
  button.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(button.dataset.copyBibtex ?? "");
      notify("BibTeX copied to clipboard!");
    } catch {
      notify(
        "Clipboard unavailable. Try localhost or an HTTPS connection and allow clipboard access.",
      );
    }
  });
}
