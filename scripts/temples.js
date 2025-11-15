const yearSpan = document.querySelector("#currentYear");
const lastModifiedSpan = document.querySelector("#lastModified");

if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}


const hamButton = document.querySelector("#hamburger");
const nav = document.querySelector("#primaryNav");

if (hamButton && nav) {
  hamButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    hamButton.textContent = isOpen ? "✕" : "☰"; 
  });
}