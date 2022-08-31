const API_KEY = 'a63128da5bbea92dc82e57485296ca3c';
const HOLIDAY_API_KEY = '1556e945-90ab-42b4-b3d5-02eae2016151';



var nameInput = document.querySelector("#name");
var button = document.querySelector("#btn");
var display = document.querySelector("#confirm-display");
var emailInput = document.querySelector("#email");

var displayFunction = function(event) {
    event.preventDefault();
    display.innerHTML = "You're all set " + nameInput.value + ". " + "An email has been sent to " + emailInput.value;

    if (emailInput.value || nameInput.value) {
        display.innerHTML = "You're all set " + nameInput.value + ". " + "An email has been sent to " + emailInput.value;
    };
};

button.addEventListener("click", displayFunction);


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
            displayFiveDayForecast(data);
            
            console.log(data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}

var displayFiveDayForecast = function(data){
    for(var i = 0; i < 5*8; i+=8){
       var currentDayData = data.list[i];
       var day = currentDayData.dt_txt;
       console.log(day);
       day = day.slice(0, 10);
       displayForecast(day, currentDayData)
    }
}

//calls single day
var displayForecast = function(day, data) {
    //create weather element
    var dayElement = document.createElement("h2");
    dayElement.innerHTML = day;

    var temp = document.createElement("p");

    var tempNum =  kToF(data.main.temp).toString();
    tempNum = tempNum.substring(0, tempNum.indexOf('.'));
    temp.innerHTML = "Temperature: " + tempNum;
    

    $('#display-forecast').append(dayElement);
    $('#display-forecast').append(temp);
};

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

function kToF(temp) {
 
  return (temp - 273.15) * 9 / 5 + 32;
}

fetchHolidays();
fetchCityData();



