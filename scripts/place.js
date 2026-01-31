const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");

const tempSpan = document.querySelector("#temp");
const windSpan = document.querySelector("#wind");
const windChillSpan = document.querySelector("#windchill");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Static values (match what you display in the HTML)
const temperatureC = Number(tempSpan.textContent);
const windSpeedKmh = Number(windSpan.textContent);

function calculateWindChill(tempC, windKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(windKmh, 0.16) +
    0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}

const canCalculateWindChill = temperatureC <= 10 && windSpeedKmh > 4.8;

windChillSpan.textContent = canCalculateWindChill
  ? `${calculateWindChill(temperatureC, windSpeedKmh)} °C`
  : "N/A";
