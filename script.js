//Global variables to store important info
var apiKey = '&APPID=2824289283966208a5e07fabee78052c';
var temp;
var isCelcius = true;

//Function to get the weather
function getWeather() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = (position.coords.latitude).toString();
			var lon = (position.coords.longitude).toString();
			var url = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + apiKey;
			$.getJSON(url, function(data) {
				temp = data.main.temp - 273;
				$('#location').text(data.name + ', ' + data.sys.country);
				$('#temp').text(Math.round(data.main.temp - 273) + ' °C');
				$('#weather').text((data.weather[0].description).replace(/\b\w/g, l => l.toUpperCase()));
				$('#weather-icon').attr('class', 'wi wi-owm-' + data.weather[0].id);
			});
		});
	}
}

//Function to convert the temp
function convertTemp() {
	if (isCelcius)
		{
			temp = temp * (9/5) + 32;
			isCelcius = false;
			$('#temp').text(Math.round(temp) + ' °F');
		}
	else
		{
			temp = (temp - 32) * (5/9);
			isCelcius = true;
			$('#temp').text(Math.round(temp) + ' °C');
		}
}

//Script to run on page load
$(document).ready(function() {
	getWeather();
	$('#convert-Temp').click(convertTemp);
});