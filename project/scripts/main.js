function setYear() {
    const yearEl = document.querySelector("#year");
    if (yearEl) yearEl.textContent = `${new Date().getFullYear()}`;
  }
  
  function setupNavToggle() {
    const btn = document.querySelector(".nav-toggle");
    const links = document.querySelector("#nav-links");
    if (!btn || !links) return;
  
    btn.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", `${isOpen}`);
    });
  }
  
  function setTodayLine() {
    const el = document.querySelector("#todayLine");
    if (!el) return;
  
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(now);
    el.textContent = `Updated: ${formatted}`;
  }
  
  setYear();
  setupNavToggle();
  setTodayLine();
  
  