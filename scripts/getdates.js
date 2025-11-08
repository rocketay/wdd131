// select the footer elements
const yearSpan = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

// create a new Date object
const today = new Date();

// show the current year in the first paragraph
yearSpan.textContent = today.getFullYear();

// show the last modified date in the second paragraph
lastModified.textContent = document.lastModified;