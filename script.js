const views = document.querySelectorAll(".view");
const viewLinks = document.querySelectorAll("[data-view]");
const emailAddress = String.fromCharCode(119, 111, 114, 107, 64, 119, 105, 108, 108, 105, 97, 109, 119, 121, 108, 105, 101, 46, 99, 111, 109);

function showView(viewName) {
  views.forEach((view) => {
    const isCurrent = view.id === viewName;
    view.hidden = !isCurrent;
    view.classList.toggle("is-visible", isCurrent);
  });

  document.querySelectorAll(".nav-link[data-view]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.view === viewName);
  });
}

function revealContact() {
  const address = document.querySelector("#contact-address");
  if (address) address.textContent = emailAddress;
}

viewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const viewName = link.dataset.view;
    if (!viewName) return;
    event.preventDefault();
    history.pushState(null, "", `#${viewName}`);
    showView(viewName);
    if (viewName === "contact") revealContact();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("popstate", () => {
  const viewName = ["projects", "contact"].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : "home";
  showView(viewName);
  if (viewName === "contact") revealContact();
});

document.querySelector("#copy-email").addEventListener("click", async () => {
  await navigator.clipboard.writeText(emailAddress);
  document.querySelector("#copy-status").textContent = "COPIED";
});

const initialView = ["projects", "contact"].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : "home";
showView(initialView);
if (initialView === "contact") revealContact();