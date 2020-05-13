const root = document.getElementById("root");
const rowEl = createElem("div", root, "row");

let allCountries = [];
let isLight = true;

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

  const topDiv = createElem("div", header, "top-div");

  const topTitle = createElem("h2", topDiv, "top-title");
  topTitle.innerText = "Where in the world?";

  const modeSwitcher = createElem("div", topDiv, "mode-switcher");
  modeSwitcher.innerText = "Dark Mode";
  modeSwitcher.addEventListener("click", () => {
    document.body.style.background = isLight ? "black" : "white";
    isLight = !isLight;
  });

  const searchBox = createElem("input", header, "search-box");
  searchBox.addEventListener("input", callback);

  function callback() {
    let searchedCountries = searchCountries(allCountries, searchBox.value);
    showCountries(searchedCountries);
  }

  function searchCountries(countries, searchTerm) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const regionSelector = createElem("select", header, "select-menu");

  addMenuOption(regionSelector, "select-option", "Filter by Region");

  addMenuOption(regionSelector, "select-option", "Africa");
  addMenuOption(regionSelector, "select-option", "Americas");
  addMenuOption(regionSelector, "select-option", "Asia");
  addMenuOption(regionSelector, "select-option", "Europe");
  addMenuOption(regionSelector, "select-option", "Oceania");

  regionSelector.addEventListener("change", () => {
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
      console.log(data);
      allCountries = data;
      showCountries(allCountries);
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

  const imageContainer = createElem("div", countryCard, "image-container");

  const flag = createElem("img", imageContainer, "flag");
  flag.src = country.flag;
  flag.alt = `Flag of ${country.name}`;

  const infoDiv = createElem("div", countryCard, "info");

  const name = createElem("h3", infoDiv, "name");
  name.innerText = country.name;

  const population = createElem("p", infoDiv, "population");
  population.innerText = `Population: ${country.population.toLocaleString()}`;

  const region = createElem("p", infoDiv, "region");
  region.innerText = `Region: ${country.region}`;

  const capital = createElem("p", infoDiv, "capital");
  capital.innerText = `Capital: ${country.capital}`;

  countryCard.addEventListener("click", callback);

  function callback() {
    rowEl.innerHTML = "";
    displayCountryDetails(country);
  }
}

function displayCountryDetails(country) {
  document.querySelector("header").innerHTML = "";
  rowEl.innerHTML = "";
  const backBtnDiv = createElem("div", rowEl, "back-btn-div");
  const backBtn = createElem("button", backBtnDiv, "back-btn");
  backBtn.innerText = "back";
  backBtn.addEventListener("click", () => {
    setupHeader();
    showCountries(allCountries);
  });

  const flagImageDiv = createElem("div", rowEl, "flag-image-div");
  const flagImageLrg = createElem("img", flagImageDiv, "flag-image-lrg");
  flagImageLrg.src = country.flag;
  flagImageLrg.alt = `Flag of ${country.name}`;

  const firstInfoDiv = createElem("div", rowEl, "first-info-div");

  const nameDetail = createElem("h3", firstInfoDiv, "name-detail");
  nameDetail.innerText = country.name;

  const nativeNameDetail = createElem("p", firstInfoDiv, "native-name-detail");
  nativeNameDetail.innerText = `Native Name: ${country.nativeName}`;

  const populationDetail = createElem("p", firstInfoDiv, "population-detail");
  populationDetail.innerText = `Population: ${country.population.toLocaleString()}`;

  const regionDetail = createElem("p", firstInfoDiv, "region-detail");
  regionDetail.innerText = `Region: ${country.region}`;

  const subRegionDetail = createElem("p", firstInfoDiv, "sub-region-detail");
  subRegionDetail.innerText = `Sub Region: ${country.subregion}`;

  const capitalDetail = createElem("p", firstInfoDiv, "capital-detail");
  capitalDetail.innerText = `Capital: ${country.capital}`;

  const secondInfoDiv = createElem("div", rowEl, "second-info-div");

  const topLevelDomain = createElem("p", secondInfoDiv, "top-level-domain");
  topLevelDomain.innerText = `Top Level Domain: ${country.topLevelDomain[0]}`;

  const currencies = createElem("p", secondInfoDiv, "currencies");
  currencies.innerText = `Currencies: ${country.currencies[0].name}`;

  const languages = createElem("p", secondInfoDiv, "languages");
  languages.innerText = `Languages: ${showAllLanguages(country.languages)}`;

  function showAllLanguages(languages) {
    let langs = "";
    languages.forEach(
      (language, index) =>
        (langs +=
          index !== languages.length - 1 ? language.name + ", " : language.name)
    );
    return langs;
  }

  const borderCountriesDiv = createElem("div", rowEl, "border-countries-div");

  const borderCountriesTitle = createElem(
    "h4",
    borderCountriesDiv,
    "border-countries-title"
  );
  borderCountriesTitle.innerText = "Border Countries:";

  country.borders.forEach((border) => {
    const borderCountries = createElem("button", borderCountriesDiv, "borders");
    borderCountries.innerText = getCountryNameFromCode(allCountries, border);

    borderCountries.addEventListener("click", () => {
      let clickedBorderCountry = allCountries.find(
        (country) => country.name === borderCountries.innerText
      );
      displayCountryDetails(clickedBorderCountry);
    });
  });
}

function getCountryNameFromCode(countries, code) {
  let targetCountry = countries.find((country) => country.alpha3Code === code);
  return targetCountry.name;
}

window.onload = setup;
