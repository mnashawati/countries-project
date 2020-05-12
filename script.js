const root = document.getElementById("root");
const rowEl = createElem("div", root, "row");

let allCountries = [];

function setup() {
  setupHeader();
  getCountriesData();
}

function createElem(tag, parent, cls) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  elem.className = cls;
  return elem;
}

function setupHeader() {
  const header = document.createElement("header");
  document.body.insertBefore(header, document.body.firstChild);

  const searchBox = createElem("input", header, "search-box");
  searchBox.addEventListener("input", () => {
    let searchedCountries = searchCountries(allCountries, searchBox.value);
    showCountries(searchedCountries);
  });

  function searchCountries(countries, searchTerm) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const regionSelector = createElem("select", header, "select-menu");

  const filterByRegionOption = addMenuOption(
    regionSelector,
    "select-option",
    "Filter by Region"
  );

  const africaOp = addMenuOption(regionSelector, "select-option", "Africa");
  const americaOp = addMenuOption(regionSelector, "select-option", "Americas");
  const asiaOp = addMenuOption(regionSelector, "select-option", "Asia");
  const europeOp = addMenuOption(regionSelector, "select-option", "Europe");
  const oceaniaOp = addMenuOption(regionSelector, "select-option", "Oceania");

  regionSelector.addEventListener("input", () => {
    regionSelector.value === "Filter by Region"
      ? showCountries(allCountries)
      : filterByRegion(allCountries, regionSelector.value);
  });

  function addMenuOption(parentSelectEl, optionClass, optionText) {
    const option = createElem("option", parentSelectEl, optionClass);
    option.innerText = optionText;
    option.value = optionText;
    return option;
  }

  function filterByRegion(countries, selectValue) {
    let filteredCountriesByRegion = countries.filter(
      (country) => country.region === selectValue
    );
    showCountries(filteredCountriesByRegion);
  }
}

function getCountriesData() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => {
      allCountries = data;
      showCountries(allCountries);
      console.log(data);
    });
}

function showCountries(countries) {
  rowEl.innerHTML = "";
  countries.forEach((country) => {
    createCard(country);
  });
}

function createCard(country) {
  const cardContainer = createElem("div", rowEl, "card-container col-3");

  const countryCard = createElem("div", cardContainer, "country-card");

  //   const imageContainer = createElem("div", countryCard, "image-container");

  const flag = createElem("img", countryCard, "flag");
  flag.src = country.flag;
  flag.alt = `Flag of ${country.name}`;

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

window.onload = setup;
