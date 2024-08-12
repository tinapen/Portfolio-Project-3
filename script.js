const cntryFlag = document.getElementById("countryFlag");
const cntryName = document.getElementById("countryName");
const cntryAltNames = document.getElementById("countryAltNames");
const cntryCaptl = document.getElementById("countryAltNames");
const cntryPpltn = document.getElementById("countryPopulation");
const cntryLangs = document.getElementById("countryLanguages");
const cntryCurr = document.getElementById("countryCurrencies");
const cntryTz = document.getElementById("countryTimezone");
const cntryLoc = document.getElementById("countryLocation");
const wtitle = document.getElementById("weather-title");
const wdate = document.getElementById("date");
const wcitycd = document.getElementById("city");
const wtemp = document.getElementById("temp");
const wfeels = document.getElementById("feels");
const wwind = document.getElementById("wind");
const whumid = document.getElementById("humidity");
const wpress = document.getElementById("pressure");
const wvis = document.getElementById("visibility");
const weatherCont = document.getElementById("cityWeatherContainer");
const countryCont = document.getElementById("countryInfoContainer");
const target = document.getElementById("spinner");

//Dropdown menu
const getCountries = async () => {
  const selectCountries = document.querySelector("#countries");
  try {
    hideSpinner();
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
    showSpinner();
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const cntryInfo = await responseCountry.json();
    hideSpinner();
    displayCountryInfo(cntryInfo);
    if (!responseCountry.ok) {
      throw new Error("Request Failed");
    }
    console.log(cntryInfo);
  } catch (error) {
    console.log(error);
    countryCont.innerHTML = "No Results Found";
  }
};

//Button Function
function displayCountryInfo(cntryInfo) {
  //variables

  countryCont.style.border = "#f3f3f7 solid 3px";
  countryCont.style.borderRadius = "10px";

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
          <div id="location">Location:</div>
          <div id="continent">Continent: ${cntryInfo[0].region}</div>
          <div id="subregion">Sub-Region: ${cntryInfo[0].subregion}</div>
          <div id="code">Country Code: ${cntryInfo[0].cca2}</div>
          <div id="latitude">Latitude: ${cntryInfo[0].latlng[0]}</div>
          <div id="longitude">Longitude: ${cntryInfo[0].latlng[1]}</div>
  `;
  // get weather
  const getWeatherData = async () => {
    const cityName = cntryInfo[0].capital;
    const apiKey = "1fc26524af2fe08118e01c3f3fe52f16";

    try {
      showSpinner();
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      hideSpinner();
      displayWeatherData(weatherData);
      if (!weatherResponse.ok) {
        throw new Error("Request Failed");
      }
      console.log(weatherData);
    } catch (error) {
      console.log(error);
      weatherCont.innerHTML = `No Results Found`;
    }
  };
  getWeatherData();

  function displayWeatherData(weatherData) {
    wtitle.innerHTML = "Current Weather:";

    //Date
    const today = new Date();
    today.toLocaleDateString;
    const format = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
    });
    console.log(format.format(today));
    wdate.innerHTML = format.format(today);

    //City, Country Code
    const cityName = cntryInfo[0].capital;
    const cityCode = cntryInfo[0].cca2;
    wcitycd.innerHTML = `${cityName},${cityCode}`;

    // background-color: rgba(255, 255, 255, 0.15);
    // backdrop-filter: saturate(180%) blur(10px);
    // color: var(--accent-color1);
    weatherCont.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
    weatherCont.style.backdropFilter = "saturate(180%) blur(10px)";
    weatherCont.style.color = "#f3f3f7";

    const iconCode = weatherData.weather[0].icon;
    const wiconimg = document.getElementById("wiconimg");
    wiconimg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    //Temperature
    wtemp.innerHTML = ` ${weatherData.main.temp} °C`;

    //Feels Like ...
    wfeels.innerHTML = `Feels like ${weatherData.main.feels_like}°C, and ${weatherData.weather[0].description}`;

    //Wind
    wwind.innerHTML = `${weatherData.wind.speed}m/s W`;

    //Humidity
    whumid.innerHTML = `Humidity: ${weatherData.main.humidity}%`;

    // Pressure
    wpress.innerHTML = `${weatherData.main.pressure}hPa`;

    // Visibility
    const visConvert = weatherData.visibility / 1000;
    wvis.innerHTML = `Visibility: ${visConvert} km`;
  }
}

function showSpinner() {
  document.querySelector(".spinner").style.display = "block";
}

function hideSpinner() {
  document.querySelector(".spinner").style.display = "none";
}
