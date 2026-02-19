const formCourses = [
    { id: "st101", title: "Story Foundations" },
    { id: "st120", title: "Hook & Attention" },
    { id: "st210", title: "Voice & Delivery" },
    { id: "st230", title: "Visual Storytelling Basics" },
    { id: "st310", title: "Pitch Stories" },
    { id: "st340", title: "Interview Story Bank" }
  ];
  
  function populateCourseSelect() {
    const select = document.querySelector("#courseId");
    if (!select) return;
  
    const options = formCourses.map((c) => `<option value="${c.id}">${c.title}</option>`).join("");
    select.insertAdjacentHTML("beforeend", options);
  }
  
  function setupRangeLabel() {
    const range = document.querySelector("#confidence");
    const out = document.querySelector("#confidenceValue");
    if (!range || !out) return;
  
    const update = () => { out.textContent = `${range.value}`; };
    range.addEventListener("input", update);
    update();
  }
  
  function setTimestamp() {
    const hidden = document.querySelector("#formTimestamp");
    if (!hidden) return;
  
    const now = new Date();
    hidden.value = `${now.toISOString()}`;
  }
  
  function validateForm() {
    const form = document.querySelector("form.form");
    const msg = document.querySelector("#formMessage");
    if (!form || !msg) return;
  
    form.addEventListener("submit", (e) => {
      const name = document.querySelector("#fullName")?.value.trim() ?? "";
      const email = document.querySelector("#email")?.value.trim() ?? "";
      const courseId = document.querySelector("#courseId")?.value ?? "";
      const experience = document.querySelector("#experience")?.value ?? "";
      const goal = document.querySelector("#goal")?.value.trim() ?? "";
  
      const missing = [];
      if (!name) missing.push("Full name");
      if (!email) missing.push("Email");
      if (!courseId) missing.push("Course");
      if (!experience) missing.push("Experience level");
      if (!goal) missing.push("Main goal");
  
      if (missing.length > 0) {
        e.preventDefault();
        msg.textContent = `${missing.length} required field(s) missing: ${missing.join(", ")}.`;
        msg.style.color = "#ffb4b4";
      } else {
        msg.textContent = `Submitting…`;
        msg.style.color = "";
      }
    });
  }
  
  function getCourseTitleById(id) {
    const found = formCourses.find((c) => c.id === id);
    return found ? found.title : "Unknown course";
  }
  
  function renderConfirmation() {
    const card = document.querySelector("#confirmationCard");
    if (!card) return;
  
    const params = new URLSearchParams(window.location.search);
  
    const fullName = params.get("fullName") ?? "";
    const email = params.get("email") ?? "";
    const courseId = params.get("courseId") ?? "";
    const experience = params.get("experience") ?? "";
    const schedule = params.get("schedule") ?? "Flexible";
    const goal = params.get("goal") ?? "";
    const confidence = params.get("confidence") ?? "3";
    const newsletter = params.get("newsletter") === "yes" ? "Yes" : "No";
    const stamp = params.get("formTimestamp") ?? "";
  
    const hasRequired = fullName && email && courseId && experience && goal;
  
    if (!hasRequired) {
      card.innerHTML = `
        <h2>Missing required data</h2>
        <p class="muted">
          It looks like this confirmation page was opened without a complete form submission.
          Please return to the enrollment form and submit again.
        </p>
        <a class="button primary" href="form.html">Go to form</a>
      `;
      return;
    }
  
    card.innerHTML = `
      <h2>Thank you, ${fullName}!</h2>
      <p class="muted">We received your enrollment request. Review your details below.</p>
  
      <div class="course-meta">
        <span class="pill">${getCourseTitleById(courseId)}</span>
        <span class="pill">${experience}</span>
        <span class="pill">Schedule: ${schedule}</span>
        <span class="pill">Confidence: ${confidence}/5</span>
        <span class="pill">Newsletter: ${newsletter}</span>
      </div>
  
      <h3>Contact</h3>
      <p><strong>Email:</strong> ${email}</p>
  
      <h3>Main goal</h3>
      <p>${goal}</p>
  
      <p class="muted"><strong>Submitted:</strong> ${stamp}</p>
    `;
  }
  
  function initFormPage() {
    const courseSelect = document.querySelector("#courseId");
    if (!courseSelect) return;
  
    populateCourseSelect();
    setupRangeLabel();
    setTimestamp();
    validateForm();
  }
  
  initFormPage();
  renderConfirmation();
  