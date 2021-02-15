document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Halmstad");

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI + '')

  weatherUrl.searchParams.append('q', city);
  weatherUrl.searchParams.append('appid', appID);
  weatherUrl.searchParams.append('mode', 'json');
  weatherUrl.searchParams.append('units', 'metric');
  weatherUrl.searchParams.append('lang', 'en');