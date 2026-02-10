// scripts/filtered-temples.js

const templesElement = document.querySelector("#temples");

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },


    {
        templeName: "San José Costa Rica",
        location: "San José, Costa Rica",
        dedicated: "2000, June, 4",
        area: 10700,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/san-jose-costa-rica-temple/san-jose-costa-rica-temple-59194-thumb.jpg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-68081-thumb.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40903,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2616.jpg"
    }
];


// ---------- Footer dates ----------
const yearSpan = document.querySelector("#currentyear");
const lastModifiedP = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedP) lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;

// ---------- Render helpers ----------
function clearTemples() {
    templesElement.innerHTML = "";
}

function createTempleCard(temple) {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    return card;
}

function displayTemples(templeList) {
    clearTemples();
    templeList.forEach((temple) => {
        const card = createTempleCard(temple);
        templesElement.appendChild(card);
    });
}

function getDedicatedYear(dedicatedString) {
    // "1888, May, 21" -> 1888
    const year = parseInt(dedicatedString.split(",")[0], 10);
    return Number.isNaN(year) ? 0 : year;
}

function filterTemples(filter) {
    let filtered = temples;

    if (filter === "old") {
        filtered = temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
    } else if (filter === "new") {
        filtered = temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
    } else if (filter === "large") {
        filtered = temples.filter((t) => t.area > 90000);
    } else if (filter === "small") {
        filtered = temples.filter((t) => t.area < 10000);
    } else {
        // home or anything else
        filtered = temples;
    }

    displayTemples(filtered);
}

const navLinks = document.querySelectorAll("nav a[data-filter]");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = link.getAttribute("data-filter");
        filterTemples(filter);
    });
});


// ---------- Initial load ----------
if (templesElement) {
    displayTemples(temples);
}
