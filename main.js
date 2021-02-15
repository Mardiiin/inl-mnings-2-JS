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
  
  weather.fetchWeather("Denver");

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI + '')