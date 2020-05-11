const root = document.getElementById("root");
const rowEl = createElem("div", root, "row");

let allCountries = [];

function setup() {
  createHeaderEls();
  getCountriesData();
}

function createElem(tag, parent, cls) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  elem.className = cls;
  return elem;
}

function createHeaderEls() {
  const header = document.createElement("header");
  document.body.insertBefore(header, document.body.firstChild);

  const searchBox = createElem("input", header, "search-box");
  searchBox.addEventListener("input", () => {
    let searchedCountries = searchCountries(allCountries, searchBox.value);
    rowEl.innerHTML = "";
    showCountries(searchedCountries);
  });

  function searchCountries(countries, searchTerm) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

function showCountries(countries) {
  countries.forEach((country) => {
    createCard(country);
  });
}

function createCard(country) {
  const countryCard = createElem("div", rowEl, "country-card col-3");

  const imageContainer = createElem("div", countryCard, "image-container");

  const flag = createElem("img", imageContainer, "flag");
  flag.src = country.flag;

  const infoDiv = createElem("div", countryCard, "info");

  const name = createElem("h3", infoDiv, "name");
  name.innerText = country.name;

  const population = createElem("p", infoDiv, "population");
  population.innerText = `Population: ${country.population}`;

  const region = createElem("p", infoDiv, "region");
  region.innerText = `Region: ${country.region}`;

  const capital = createElem("p", infoDiv, "capital");
  capital.innerText = `Capital: ${country.capital}`;
}

function getCountriesData() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => {
      allCountries = data;
      showCountries(allCountries);
    });
}

window.onload = setup;
