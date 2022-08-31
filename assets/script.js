const API_KEY = 'a63128da5bbea92dc82e57485296ca3c';
const HOLIDAY_API_KEY = '1556e945-90ab-42b4-b3d5-02eae2016151';
var allHolidays = [];


var nameInput = document.querySelector("#name");
var button = document.querySelector("#btn");
var display = document.querySelector("#confirm-display");
var emailInput = document.querySelector("#email");

var displayFunction = function(event) {
    event.preventDefault();
    if(validateDate()){
        display.innerHTML = "The date you have chosen is a holiday or we already have an appointment scheduled, please select a different date."
    }else{
        display.innerHTML = "You're all set " + nameInput.value + ". " + "An email has been sent to " + emailInput.value;

        if (emailInput.value || nameInput.value) {
            display.innerHTML = "You're all set " + nameInput.value + ". " + "An email has been sent to " + emailInput.value;
        };
        //Add valid appointment to the list of days that cannot be chosen
        var selectedDate = document.querySelector("#datepicker").value.substring(0, 5);
        allHolidays.push(selectedDate);
        
    }
};

button.addEventListener("click", displayFunction);

//gets the city information
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
        } 
    });
}
//get 5 day forecast from API
var fetchFiveDayForecast = function(lon, lat){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+ API_KEY; 
    console.log(queryURL);
    //gets response from API 
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            displayFiveDayForecast(data);
            
            console.log(data);
        });
        }
    });
}
//show five day forecast on page
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
    var container = document.createElement("div");
    var dayElement = document.createElement("p");
    dayElement.innerHTML = day;

    var temp = document.createElement("p");
    //calls ktoF function
    var tempNum =  kToF(data.main.temp).toString();
    //change from decimal to whole number temp
    tempNum = tempNum.substring(0, tempNum.indexOf('.'));
    temp.innerHTML = "Temperature: " + tempNum;
    container.appendChild(dayElement);
    container.appendChild(temp);
    $('#display-forecast').append(container);
};
//get Holiday Api
var fetchHolidays = function(){
    var queryURL = "https://holidayapi.com/v1/holidays?pretty&country=US-TX&year=2021&key=" + HOLIDAY_API_KEY; 
    console.log(queryURL);
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            allHolidays = getHolidayDates(data);
        });
        }
    });
    
}
//changes temp from kelvin to fahrenheit
function kToF(temp) {
 //conversion equation
  return (temp - 273.15) * 9 / 5 + 32;
}
//check to see if the date if valid/available
var validateDate = function() {
    //removes year from date
    var selectedDate = document.querySelector("#datepicker").value.substring(0, 5);
    console.log(selectedDate);
    console.log(allHolidays.includes(selectedDate))
    return allHolidays.includes(selectedDate);
}
//returns all the dates from the holidays API
var getHolidayDates = function(data) {
    const holidays = [];
    for(let holiday of data.holidays){
        let date = holiday.date.substring(5, holiday.date.length);
        date = date.replace("-", "/");
        holidays.push(date);
    } 
    console.log(holidays)

    return holidays;
}

$( function() {
    $( "#datepicker" ).datepicker();
});

//call APIs
fetchHolidays();
fetchCityData();
