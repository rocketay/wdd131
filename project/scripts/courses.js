const STORAGE_KEY = "speaky_favorites_v1";

const courses = [
  {
    id: "st101",
    title: "Story Foundations",
    level: "Beginner",
    minutes: 60,
    price: 19,
    mode: "Self-paced",
    tag: "Structure",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop",
    alt: "Notebook and pen used to outline a story.",
    description: "Learn the building blocks of a story and turn any topic into a clear beginning, middle, and end."
  },
  {
    id: "st120",
    title: "Hook & Attention",
    level: "Beginner",
    minutes: 45,
    price: 15,
    mode: "Self-paced",
    tag: "Engagement",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
    alt: "People listening and taking notes during a talk.",
    description: "Create openings that earn attention and keep listeners with contrast, curiosity, and clarity."
  },
  {
    id: "st210",
    title: "Voice & Delivery",
    level: "Intermediate",
    minutes: 75,
    price: 29,
    mode: "Self-paced",
    tag: "Delivery",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1400&auto=format&fit=crop",
    alt: "A microphone ready for speaking practice.",
    description: "Practice pacing, pauses, tone, and presence so you sound confident without sounding scripted."
  },
  {
    id: "st230",
    title: "Visual Storytelling Basics",
    level: "Intermediate",
    minutes: 90,
    price: 35,
    mode: "Live",
    tag: "Visuals",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1400&auto=format&fit=crop",
    alt: "A camera and creative tools used for visual content.",
    description: "Translate ideas into visuals: simple slides, clean structure, and a story that matches the design."
  },
  {
    id: "st310",
    title: "Pitch Stories",
    level: "Advanced",
    minutes: 120,
    price: 49,
    mode: "Live",
    tag: "Persuasion",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop",
    alt: "A business pitch being prepared with a laptop and notes.",
    description: "Build a persuasive narrative for proposals, interviews, and business calls that ends with a clear ask."
  },
  {
    id: "st340",
    title: "Interview Story Bank",
    level: "Advanced",
    minutes: 75,
    price: 39,
    mode: "Self-paced",
    tag: "Career",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
    alt: "A team collaborating with laptops and notes.",
    description: "Prepare strong interview stories using a repeatable structure: context, action, impact, and learning."
  }
];

function readFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function updateFavoritesCount(count) {
  const el = document.querySelector("#favoritesCount");
  if (el) el.textContent = `${count}`;
}

function setResultsCount(count) {
  const el = document.querySelector("#resultsCount");
  if (el) el.textContent = `${count}`;
}

function getFiltersFromUI() {
  const level = document.querySelector("#levelFilter")?.value ?? "all";
  const mode = document.querySelector("#modeFilter")?.value ?? "all";
  const maxMinutesRaw = document.querySelector("#minutesFilter")?.value ?? "all";
  const sortBy = document.querySelector("#sortBy")?.value ?? "recommended";

  const maxMinutes = maxMinutesRaw === "all" ? null : Number(maxMinutesRaw);
  return { level, mode, maxMinutes, sortBy };
}

function applyFilters(list, filters) {
  let filtered = [...list];

  filtered = filtered.filter((c) => {
    const levelOk = filters.level === "all" ? true : c.level === filters.level;
    const modeOk = filters.mode === "all" ? true : c.mode === filters.mode;
    const minutesOk = filters.maxMinutes === null ? true : c.minutes <= filters.maxMinutes;
    return levelOk && modeOk && minutesOk;
  });

  if (filters.sortBy === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sortBy === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "minutesLow") {
    filtered.sort((a, b) => a.minutes - b.minutes);
  }

  return filtered;
}

function isFavorite(id, favoriteIds) {
  return favoriteIds.includes(id);
}

function toggleFavorite(id) {
  const favoriteIds = readFavorites();
  const updated = favoriteIds.includes(id)
    ? favoriteIds.filter((x) => x !== id)
    : [...favoriteIds, id];

  saveFavorites(updated);
  updateFavoritesCount(updated.length);
  return updated;
}

function courseCardTemplate(course, favoriteIds) {
  const favOn = isFavorite(course.id, favoriteIds);
  const favText = favOn ? "Saved ✓" : "Save +";
  const favClass = favOn ? "fav-btn is-on" : "fav-btn";

  return `
    <article class="course-card">
      <img src="${course.image}" alt="${course.alt}" loading="lazy" width="1400" height="950" />
      <div class="course-card-body">
        <h3>${course.title}</h3>
        <p class="muted">${course.description}</p>

        <div class="course-meta">
          <span class="pill">${course.level}</span>
          <span class="pill">${course.mode}</span>
          <span class="pill">${course.minutes} min</span>
          <span class="pill">$${course.price}</span>
          <span class="pill">${course.tag}</span>
        </div>

        <div class="course-actions">
          <button class="${favClass}" type="button" data-fav="${course.id}">${favText}</button>
          <a class="button ghost" href="form.html">Enroll</a>
        </div>
      </div>
    </article>
  `;
}

function renderCourses(list) {
  const grid = document.querySelector("#courseGrid");
  if (!grid) return;

  const favoriteIds = readFavorites();
  updateFavoritesCount(favoriteIds.length);

  grid.innerHTML = list.map((c) => courseCardTemplate(c, favoriteIds)).join("");
  setResultsCount(list.length);

  attachFavoriteHandlers();
}

function attachFavoriteHandlers() {
  const grid = document.querySelector("#courseGrid");
  if (!grid) return;

  grid.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-fav");
      const updated = toggleFavorite(id);

      const filters = getFiltersFromUI();
      const nextList = applyFilters(courses, filters);
      grid.innerHTML = nextList.map((c) => courseCardTemplate(c, updated)).join("");

      attachFavoriteHandlers();
    });
  });
}

function resetFilters() {
  const level = document.querySelector("#levelFilter");
  const mode = document.querySelector("#modeFilter");
  const minutes = document.querySelector("#minutesFilter");
  const sortBy = document.querySelector("#sortBy");

  if (level) level.value = "all";
  if (mode) mode.value = "all";
  if (minutes) minutes.value = "all";
  if (sortBy) sortBy.value = "recommended";
}

function favoritesPanelTemplate(favCourses) {
  if (favCourses.length === 0) {
    return `<p class="muted">No favorites yet. Save courses from the catalog above.</p>`;
  }

  return favCourses.map((c) => `
    <div class="fav-item">
      <div>
        <strong>${c.title}</strong>
        <div class="muted">${c.level} • ${c.mode} • ${c.minutes} min • $${c.price}</div>
      </div>
      <button class="fav-btn is-on" type="button" data-remove="${c.id}">Remove</button>
    </div>
  `).join("");
}

function showFavoritesPanel() {
  const panel = document.querySelector("#favoritesPanel");
  const list = document.querySelector("#favoritesList");
  if (!panel || !list) return;

  const favIds = readFavorites();
  const favCourses = courses.filter((c) => favIds.includes(c.id));

  list.innerHTML = favoritesPanelTemplate(favCourses);
  panel.hidden = false;

  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-remove");
      const current = readFavorites();
      const next = current.filter((x) => x !== id);

      saveFavorites(next);
      updateFavoritesCount(next.length);
      showFavoritesPanel();

      const filters = getFiltersFromUI();
      renderCourses(applyFilters(courses, filters));
    });
  });
}

function clearFavorites() {
  saveFavorites([]);
  updateFavoritesCount(0);
  showFavoritesPanel();

  const filters = getFiltersFromUI();
  renderCourses(applyFilters(courses, filters));
}

function setupCatalogEvents() {
  const level = document.querySelector("#levelFilter");
  const mode = document.querySelector("#modeFilter");
  const minutes = document.querySelector("#minutesFilter");
  const sortBy = document.querySelector("#sortBy");
  const clearBtn = document.querySelector("#clearFilters");

  const onChange = () => {
    const filters = getFiltersFromUI();
    renderCourses(applyFilters(courses, filters));
  };

  if (level) level.addEventListener("change", onChange);
  if (mode) mode.addEventListener("change", onChange);
  if (minutes) minutes.addEventListener("change", onChange);
  if (sortBy) sortBy.addEventListener("change", onChange);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      resetFilters();
      renderCourses(courses);
    });
  }

  const showFav = document.querySelector("#showFavorites");
  const clearFav = document.querySelector("#clearFavorites");

  if (showFav) showFav.addEventListener("click", showFavoritesPanel);
  if (clearFav) clearFav.addEventListener("click", clearFavorites);
}

function initCoursesPage() {
  const grid = document.querySelector("#courseGrid");
  if (!grid) return;

  renderCourses(courses);
  setupCatalogEvents();
}

initCoursesPage();

