
//function som söker efter stad med API samt attractions som är limiterade till 3 stycken.

function searchCity(city) {
  let key = "abc2135af15c3540b2f21d6941d6b91a";
  var cattractionBox = document.getElementsByClassName("AttractionInfoBox");
  if (cattractionBox.length > 0) {
      Array.from(document.getElementsByClassName("AttractionInfoBox")).forEach(
          function(element, index, array) {
              element.remove();
          }
      );
  }
  //
  var weatherbox = document.getElementById("WeatherInfoBox")
  if (typeof(weatherbox) != 'undefined' && weatherbox != null) {
      weatherbox.remove();
  }
  // den hämtar API data från opeanweatherapp hemsidan och kollar ifall den får rätt respons om inte så kommer det upp error message. Det kollas också ifall boxarna är checkade och vad som ska visas.
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '')
      .then(function(response) {
          if (response.ok) {
              return response.json();
          } else if (response.status === 400 || response.status === 404) {
              alert(city + " NO CITY FOUND.")
          } else if (response.status === 500) {
              alert("TRY AGAIN ERROR")
          } else {
              alert("Try again.")
          }
      })
      .then(function(weather) {
          if (document.getElementById("WeatherBoxen").checked) {
              DisplayWeather(weather)
          } else if (document.getElementById("AttractionBox").checked) {
              getAttraction(city)
          } else {
              DisplayWeather(weather)
              getAttraction(city)
          }
      })
      .catch(function(error) {
          console.log(error.message);
      });
}

//första segmentet kollar ifall det redan finns de 3 boxarna som ska vara på sidan och tar bort resterade ifall det stämmer
function DisplayAttractions(attractions) {
  var cattractionBox = document.getElementsByClassName("AttractionInfoBox");
  if (cattractionBox.length > 0) {
      Array.from(document.getElementsByClassName("AttractionInfoBox")).forEach(
          function(element, index, array) {
              element.remove();
          }
      );
  }
  for (i = 0; i < 3; i++) {
      var attractionBox = document.createElement("div");
      attractionBox.id = i;
      attractionBox.className += "AttractionInfoBox";
      var Name = document.createElement("h5");
      Name.innerHTML = "Address: " + attractions.response.groups[0].items[i].venue.name;

      var Address = document.createElement("h6");
      Address.innerHTML = attractions.response.groups[0].items[i].venue.location.address;

      attractionBox.append(Name);
      attractionBox.append(Address);

      document.body.append(attractionBox);
  }
}
//hämtar API från foursquare för att få fram attraktioner och ifall responsen är ok visas attraktionerna upp.
function getAttraction(city) {
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + 'L4FTA2TRFS4IKYNQKYFAY3ACFEA5YI0QSYYRASHDIDCZQ2MX' + '&client_secret=' + 'SE5XU5NGFVFBMFMV0VNPO5Y5HADWL41R0PIVCVV2Q5JIS5VV' + '&near=' + city + '&limit=10&v=20210211')
      .then(function(response) {
          if (response.ok) {
              return response.json();
          } 
      })
      .then(function(attractions) {
          DisplayAttractions(attractions);

      })
      .catch(function(error) {
          console.log(error.message);
      });
}

//konventerar kelvin till celcius för att få rätt mått till hemsidan.
function KelvinToCelsius(kelvin) {
  var fTemp = kelvin;
  var fToCel = (fTemp - 273);

  return Math.trunc(fToCel);
}
//letar ifall det redan finns en weatherbox och sedan om det finns så tas den bort.
function DisplayWeather(weather) {
  var weatherbox = document.getElementById("WeatherInfoBox")
  if (typeof(weatherbox) != 'undefined' && weatherbox != null) {
      weatherbox.remove();
  }
  var box = document.createElement("div");
  box.id = "WeatherInfoBox"
  var cityName = document.createElement("h5")
  cityName.innerHTML = "Stadnamn: " + weather.name;

  var temp = document.createElement("h5")
  temp.innerHTML = "Temperatur: " + KelvinToCelsius(weather.main.temp) + "°C";
  box.append(cityName);
  box.append(temp);
  document.body.append(box);

  var c = KelvinToCelsius(weather.main.temp);



}