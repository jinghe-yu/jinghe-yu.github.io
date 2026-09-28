const sections = [
  ...document.querySelectorAll<HTMLElement>("main section[id]"),
];
const links = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
];
const nav = document.querySelector<HTMLElement>(".section-nav");
let currentId = "";

function setActive(id: string) {
  if (id === currentId) return;
  currentId = id;
  for (const link of links) {
    if (link.dataset.navLink === id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
  const currentLink = links.find((link) => link.dataset.navLink === id);
  if (nav && currentLink && nav.scrollWidth > nav.clientWidth) {
    nav.scrollTo({
      left:
        currentLink.offsetLeft -
        nav.offsetLeft -
        (nav.clientWidth - currentLink.clientWidth) / 2,
      behavior: "smooth",
    });
  }
}

let scrollFrame = 0;
function updateActiveSection() {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const marker = window.scrollY + Math.max(160, window.innerHeight * 0.27);
    let active = sections[0]?.id ?? "about";
    for (const section of sections) {
      if (section.getBoundingClientRect().top + window.scrollY <= marker) {
        active = section.id;
      }
    }
    setActive(active);
  });
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
window.addEventListener("hashchange", updateActiveSection);
updateActiveSection();

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.03 },
  );
  for (const section of sections) {
    section.dataset.reveal = "";
    revealObserver.observe(section);
  }
  for (const item of document.querySelectorAll<HTMLElement>(".timeline-item")) {
    item.dataset.reveal = "";
    revealObserver.observe(item);
  }
}
