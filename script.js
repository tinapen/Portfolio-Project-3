//Dropdown menu
const getCountries = async () => {
  const selectCountries = document.querySelector("#countries");
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countryData = await response.json();
    countryData.forEach((country) => {
      const countriesOption = document.createElement("option");
      countriesOption.value = country.name.common;
      countriesOption.text = country.name.common;
      selectCountries.appendChild(countriesOption);
    });

    if (!response.ok) {
      throw new Error("Request Failed");
    }
    // console.log(countryData);
  } catch (error) {
    console.log(error);
  }
};
getCountries();

//Select Button
const getCountryInfo = async () => {
  const selectedCountry = document.getElementById("countries");
  const countryName = selectedCountry.value;

  if (countryName === "select") {
    alert("Please select a country!!!");
    return;
  }
  try {
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const cntryInfo = await responseCountry.json();
    displayCountryInfo(cntryInfo);

    if (!responseCountry.ok) {
      throw new Error("Request Failed");
    }
    console.log(cntryInfo);
  } catch (error) {
    console.log(error);
  }
};

//Button Function
function displayCountryInfo(cntryInfo) {
  //variables
  const cntryFlag = document.getElementById("countryFlag");
  const cntryName = document.getElementById("countryName");
  const cntryAltNames = document.getElementById("countryAltNames");
  const cntryCaptl = document.getElementById("countryAltNames");
  const cntryPpltn = document.getElementById("countryPopulation");
  const cntryLangs = document.getElementById("countryLanguages");
  const cntryCurr = document.getElementById("countryCurrencies");
  const cntryTz = document.getElementById("countryTimezone");
  const cntryLoc = document.getElementById("countryLocation");
  const altSpellings = cntryInfo[0].altSpellings;
  altSpellings.forEach((item) => {
    return item;
  });
  const languageObj = Object.values(cntryInfo[0].languages);

  //values
  cntryFlag.src = cntryInfo[0].flags.png;
  cntryFlag.alt = cntryInfo[0].name.common;
  cntryName.innerHTML = cntryInfo[0].name.common;
  cntryAltNames.innerHTML = `Alternative Names: ${altSpellings}`;
  cntryCaptl.innerHTML = `Capital: ${cntryInfo[0].capital}`;
  cntryPpltn.innerHTML = `Population: ${cntryInfo[0].population}`;
  cntryLangs.innerHTML = `Lanaguages: ${languageObj}`;
  cntryCurr.innerHTML = `Currencies: ${
    cntryInfo[0].currencies[Object.keys(cntryInfo[0].currencies)].name
  } (${cntryInfo[0].currencies[Object.keys(cntryInfo[0].currencies)].symbol})`;
  cntryTz.innerHTML = `Timezone: ${cntryInfo[0].timezones}`;
  cntryLoc.innerHTML = `
          <div id="continent">Continent: ${cntryInfo[0].region}</div>
          <div id="subregion">Sub-Region: ${cntryInfo[0].subregion}</div>
          <div id="code">Country Code: ${cntryInfo[0].cca2}</div>
          <div id="latitude">Latitude: ${cntryInfo[0].latlng[0]}</div>
          <div id="longitude">Longitude: ${cntryInfo[0].latlng[1]}</div>
  `;
}
