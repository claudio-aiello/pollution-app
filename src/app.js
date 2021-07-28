import _ from "lodash";

const colorArray = [
    "#05d48f", //green
    "#fde153", //yellow
    "#f8a858", //orange
    "#f04a73", //red
    "#b147e6", //purple
    "#7a5f66", //brown-ish
    "#797e85", //gray
];

const backgroundColorArray = [
	"linear-gradient(90deg, #32CD99 0%, #158761 101.91%)",
	"linear-gradient(90deg, #FFDD87 0%, #8C7500 101.91%)",
	"linear-gradient(90deg, #E07F1D 0%, #985B1D 101.91%)",
	"linear-gradient(90deg, #D72853 0%, #861F39 101.91%)",
	"linear-gradient(90deg, #9834CA 0%, #600E89 101.91%)",
	"linear-gradient(90deg, #68424C 0%, #473E41 101.91%)",
	"linear-gradient(90deg, #5A5E65 0%, #2C2F33 101.91%)",


];
  
  const result = [
    "Good",
    "Moderate", 
    "Unhealhy for sensitive groups",
    "Unhealhy",
    "Very Unhealthy",
    "Hazardous",
    "Not available",
  ];
  
  const description = [
    "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
    "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    "Health alert: everyone may experience more serious health effects.",
  
  ];

const apitoken = process.env.API;
const searchCity = document.querySelector(".search_city");
const searchButton = document.querySelector(".search_button");
const container = document.querySelector(".result-box");

const wrapper = document.querySelector(".wrapper")

searchButton.addEventListener("click", search);

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(getPosition);
}
else {
	alert("Geolocation is not supported in this browser.")
}

function getPosition(position) {
	let lat = position.coords.latitude;
	let lng = position.coords.longitude;
	console.log(lat, lng);
	airQualityPollutionGeo(lat, lng);
}

const airQualityPollutionGeo = (lat, lng) => {
	let api = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${apitoken}`;
  
	fetch(api)
	  .then(function (response) {
		let data = response.json();
		return data;
	  })
	  .then(function (data) {
		console.log(data);
		air.city = data.data.city.name;
		air.index = data.data.aqi;
		air.time = data.data.time.s;
	  })
	  .then(function () {
		showData();
	  });
  };

function search(event) {
	event.preventDefault();
	var city = searchCity.value;
	if (city) {

		var url = "https://api.waqi.info/feed/" + city +"/?token=" + apitoken;
		fetch(url)
		.then(result => result.json())
		.then(data => {
			if (data.status === "ok") {
				addCity(data);
			}
			else {
				alert("Wrong query");
			}
		})
		.catch(error => alert(error));
	}
	else {
		alert("Please insert a city");
	}
}

function addCity(data) {
	while (container.firstChild) {
		container.removeChild(container.lastChild);
	};
	addCityData(data)

}

function addCityData(info) {
	var aqi = _.get(info.data, "aqi", 0);
	var cityName = _.get(info.data.city, "name", "Roma");

	createResultBox(aqi,cityName);
}

function createResultBox(aqi,cityName) {

  const city_box = document.createElement("div");
  container.appendChild(city_box);

  //div aqi-box
  const aqi_box = document.createElement("div");
  container.appendChild(aqi_box);

  //city name
  const cityH = document.createElement("h2");
  cityH.textContent = cityName;
  city_box.appendChild(cityH);

  //paragraph for display aqi value
  const aqi_p = document.createElement("p")
  aqi_p.textContent="AQI value: " + aqi;
  aqi_box.appendChild(aqi_p);

  //div result_box
  const result_box = document.createElement("div");
  container.appendChild(result_box);

  //div description_box
  const description_box = document.createElement("div");
  container.appendChild(description_box);

  styleResult(aqi,aqi_box,result_box,description_box);

}

function styleResult(aqi_value,aqi_box,result_box,description_box){

	switch(true){
  
	  case aqi_value <= 50:
		aqi_box.style.background = colorArray[0];
		searchCity.style.color = colorArray[0];
		searchButton.style.color = colorArray[0];
		wrapper.style.background = backgroundColorArray[0];
		result_box.innerHTML = result[0];
		description_box.innerHTML = description[0];
	  break;
  
	  case aqi_value <= 100:
		aqi_box.style.background = colorArray[1];
		searchCity.style.color = colorArray[1];
		searchButton.style.color = colorArray[1];
		wrapper.style.background = backgroundColorArray[1]
		result_box.innerHTML = result[1];
		description_box.innerHTML = description[1];
	  break;
  
	  case aqi_value <= 150:
		aqi_box.style.background = colorArray[2];
		searchCity.style.color = colorArray[2];
		searchButton.style.color = colorArray[2];
		wrapper.style.background = backgroundColorArray[2]
		result_box.innerHTML = result[2];
		description_box.innerHTML = description[2];
	  break;
  
	  case aqi_value <= 200:
		aqi_box.style.background = colorArray[3];
		searchCity.style.color = colorArray[3];
		searchButton.style.color = colorArray[3];
		wrapper.style.background = backgroundColorArray[3]
		result_box.innerHTML = result[3];
		description_box.innerHTML = description[3];
	  break;
  
	  case aqi_value <= 300:
		aqi_box.style.background = colorArray[4];
		searchCity.style.color = colorArray[4];
		searchButton.style.color = colorArray[4];
		wrapper.style.background = backgroundColorArray[4]
		result_box.innerHTML = result[4];
		description_box.innerHTML = description[4];
	  break;
  
	  case aqi_value > 300:
		aqi_box.style.background = colorArray[5];
		searchCity.style.color = colorArray[5];
		searchButton.style.color = colorArray[5];
		wrapper.style.background = backgroundColorArray[5]
		result_box.innerHTML = result[5];
		description_box.innerHTML = description[5];
	  break;
  
	  default:
		aqi_box.style.background = colorArray[6];
		searchCity.style.color = colorArray[6];
		searchButton.style.color = colorArray[6];
		wrapper.style.background = backgroundColorArray[6]
		result_box.innerHTML = result[6];
		description_box.innerHTML = description[6];
	  break;
  
	}
  
  }