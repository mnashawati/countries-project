const root = document.getElementById("root");
const rowEl = createElem("div", root, "row");

let allCountries = [];
let isLight = true;

function setup() {
  setupHeader();
  getCountriesData();
}

function createElem(tag, parent, cls, text) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  elem.className = cls;
  if (text != null) {
    elem.innerText = text;
  }
  return elem;
}

function addMenuOption(parentSelectEl, optionClass, optionText) {
  const option = createElem("option", parentSelectEl, optionClass, optionText);
  option.value = optionText;
  return option;
}

function setupHeader() {
  const header = document.createElement("header");
  document.body.insertBefore(header, document.body.firstChild);

  const topDiv = createElem("div", header, "top-div");

  createElem("h2", topDiv, "top-title", "Where in the world?");
  // topTitle.innerText = "Where in the world?";

  const modeSwitcher = createElem("div", topDiv, "mode-switcher", "Dark Mode");
  modeSwitcher.addEventListener("click", () => {
    document.body.style.background = isLight ? "black" : "white";
    isLight = !isLight;
  });

  const searchBox = createElem("input", header, "search-box");
  searchBox.addEventListener("input", displayMatchingCountries);
  function displayMatchingCountries() {
    let searchedCountries = searchCountries(allCountries, searchBox.value);
    displayCountries(searchedCountries);
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
      ? displayCountries(allCountries)
      : filterByRegion(allCountries, regionSelector.value);
  });

  function filterByRegion(countries, selectedValue) {
    let filteredCountriesByRegion = countries.filter(
      (country) => country.region === selectedValue
    );
    displayCountries(filteredCountriesByRegion);
  }
}

function getCountriesData() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      allCountries = data;
      displayCountries(allCountries);
    });
}

function displayCountries(countries) {
  rowEl.innerHTML = "";
  countries.forEach((country) => {
    createCard(country);
  });
}

function createCard(country) {
  const cardContainer = createElem("div", rowEl, "card-container col-12");

  const countryCard = createElem("div", cardContainer, "country-card");

  const imageContainer = createElem("div", countryCard, "image-container");

  const flag = createElem("img", imageContainer, "flag");
  flag.src = country.flag;
  flag.alt = `Flag of ${country.name}`;

  const infoDiv = createElem("div", countryCard, "info");

  createElem("h3", infoDiv, "name", country.name);
  // name.innerText = country.name;

  const population = createElem(
    "p",
    infoDiv,
    "population",
    `Population: ${country.population.toLocaleString()}`
  );
  addBoldSpan(population, "Population: ");

  const region = createElem(
    "p",
    infoDiv,
    "region",
    `Region: ${country.region}`
  );
  addBoldSpan(region, "Region: ");

  const capital = createElem(
    "p",
    infoDiv,
    "capital",
    `Capital: ${country.capital}`
  );
  addBoldSpan(capital, "Capital: ");

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
  const backBtn = createElem("button", backBtnDiv, "back-btn", "back");
  backBtn.addEventListener("click", () => {
    setupHeader();
    displayCountries(allCountries);
  });

  const flagImageDiv = createElem("div", rowEl, "flag-image-div");
  const flagImageLrg = createElem("img", flagImageDiv, "flag-image-lrg");
  flagImageLrg.src = country.flag;
  flagImageLrg.alt = `Flag of ${country.name}`;

  const firstInfoDiv = createElem("div", rowEl, "first-info-div");

  createElem("h3", firstInfoDiv, "name-detail", country.name);
  // nameDetail.innerText = country.name;

  const nativeNameDetail = createElem(
    "p",
    firstInfoDiv,
    "native-name-detail",
    `Native Name: ${country.nativeName}`
  );
  addBoldSpan(nativeNameDetail, "Native Name: ");

  const populationDetail = createElem(
    "p",
    firstInfoDiv,
    "population-detail",
    `Population: ${country.population.toLocaleString()}`
  );
  addBoldSpan(populationDetail, "Population: ");

  const regionDetail = createElem(
    "p",
    firstInfoDiv,
    "region-detail",
    `Region: ${country.region}`
  );
  addBoldSpan(regionDetail, "Region: ");

  const subRegionDetail = createElem(
    "p",
    firstInfoDiv,
    "sub-region-detail",
    `Sub Region: ${country.subregion}`
  );
  addBoldSpan(subRegionDetail, "Sub Region: ");

  const capitalDetail = createElem(
    "p",
    firstInfoDiv,
    "capital-detail",
    `Capital: ${country.capital}`
  );
  addBoldSpan(capitalDetail, "Capital: ");

  const secondInfoDiv = createElem("div", rowEl, "second-info-div");

  const topLevelDomain = createElem(
    "p",
    secondInfoDiv,
    "top-level-domain",
    `Top Level Domain: ${country.topLevelDomain[0]}`
  );
  addBoldSpan(topLevelDomain, "Top Level Domain: ");

  const currencies = createElem(
    "p",
    secondInfoDiv,
    "currencies",
    `Currencies: ${country.currencies[0].name}`
  );
  addBoldSpan(currencies, "Currencies: ");

  const languages = createElem(
    "p",
    secondInfoDiv,
    "languages",
    `Languages: ${separateLanguages(country.languages)}`
  );
  addBoldSpan(languages, "Languages: ");

  const borderCountriesDiv = createElem("div", rowEl, "border-countries-div");

  createElem(
    "h4",
    borderCountriesDiv,
    "border-countries-title",
    "Border Countries:"
  );
  // borderCountriesTitle.innerText = "Border Countries:";

  country.borders.forEach((border) => {
    const borderCountries = createElem(
      "button",
      borderCountriesDiv,
      "borders",
      getCountryNameFromCode(allCountries, border)
    );
    // borderCountries.innerText = getCountryNameFromCode(allCountries, border);

    borderCountries.addEventListener("click", () => {
      let clickedBorderCountry = allCountries.find(
        (country) => country.name === borderCountries.innerText
      );
      displayCountryDetails(clickedBorderCountry);
    });
  });
}

function addBoldSpan(element, titleText) {
  element.innerHTML = element.innerHTML.replace(
    titleText,
    `<span class="bold">${titleText}</span> `
  );
}

function separateLanguages(languages) {
  let langs = "";
  languages.forEach(
    (language, index) =>
      (langs +=
        index !== languages.length - 1 ? language.name + ", " : language.name)
  );
  return langs;
}

function getCountryNameFromCode(countries, code) {
  let targetCountry = countries.find((country) => country.alpha3Code === code);
  return targetCountry.name;
}

window.onload = setup;
