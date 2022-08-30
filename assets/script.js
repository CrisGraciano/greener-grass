const API_KEY = 'a63128da5bbea92dc82e57485296ca3c';
const HOLIDAY_API_KEY = '1556e945-90ab-42b4-b3d5-02eae2016151';



//search input
var search = () => {
    var city = document.getElementById("search-box").value;
    fetchCityData(city);
}
//gets city data from API
var fetchCityData = function() {
    const CITY = "san antonio";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + CITY + "&appid=" + API_KEY;
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            
            fetchFiveDayForecast(data.coord.lon, data.coord.lat);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}
//get 5 day forecast from API
var fetchFiveDayForecast = function(lon, lat){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+ API_KEY; 
    console.log(queryURL);
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}

var fetchHolidays = function(){
    var queryURL = "https://holidayapi.com/v1/holidays?pretty&country=US-TX&year=2021&key=" + HOLIDAY_API_KEY; 
    console.log(queryURL);
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}

fetchHolidays();
fetchCityData();

$(function) {
    $("#btn").on("click", function() {
        $("#calendar").hide();
    });
}