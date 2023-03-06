// API call example
// http://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&limit={limit}&appid={API key}&units={units}

// My call
// http://api.openweathermap.org/data/2.5/weather?q={city name},{state code},US&lang=en&exclude=minutely,hourly,alerts&appid=d9f292cdf3df11c3df01f2dce7d83ce1&units=imperial
// Have input push into {city name}? Add {state code} input for same {city name} in multiple states?


// Order:
// User types input data (city)
// User clicks Search button (searchBtn)
// Take input data, push into URL before call
// Take result (Option: If multiple city name in different states, pop up modal with city and state list to choose from)
// Store data locally
// Display data in appropriate panels
// Display search result in history list (append as li?)
// Click history item
// Makes new call using city and state from history item

var mainURL = "http://api.openweathermap.org/data/2.5"
var userInput = document.getElementById("userInput"); //ex: atlanta

// Search function start
$(".searchBtn").click(function() {
    //getCurrent(userInput);
    //getForecast(userInput);
    setHistory(userInput);
});

// Fills the Current panel
function getCurrent(userInput) {
    var endpoint = "/weather?q=" + userInput.value + ",US&lang=en&appid=d9f292cdf3df11c3df01f2dce7d83ce1&units=imperial"
    var submitURL = mainURL + endpoint;

    fetch(submitURL) //submitURL is submitted to API
    .then(function (response) {
        if (200 === response.status) {
            response.json().then(function (data) {
                var myDate = new Date(data.dt *1000).toLocaleDateString();
                var emblem = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

                $('.day-1').html(data.name + " " + (myDate)).append("<img src=" + emblem + " />");
                $('.temperature-1').html(data.main.temp + " Fahrenheit");
                $('.wind-1').html(data.wind.speed + " MPH");
                $('.humidity-1').html(data.main.humidity + " %");
            });
        }
    })
}

// Fills the Forecast panels
function getForecast(userInput) {
    var endpoint = "/forecast?q=" + userInput.value + ",US&lang=en&appid=d9f292cdf3df11c3df01f2dce7d83ce1&units=imperial";
    var submitURL = mainURL + endpoint;
    var j = 2;

    fetch(submitURL)
    .then(function (response) {
        if (200 === response.status) {
            response.json().then(function (data) {
                var myDate = null;
                var emblem = null;

                for (var i = 0; i < data.list.length; i++) {
                    myDate = new Date(data.list[i].dt *1000).toLocaleDateString();
                    emblem = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";

                    $('.day-'+ j).html(myDate);
                    $('#symbol-'+ j).html("<img src=" + emblem + " />");
                    $('.temperature').html(data.list[i].main.temp + " Fahrenheit");
                    $('.wind').html(data.list[i].wind.speed + " MPH");
                    $('.humidity').html(data.list[i].main.humidity + " %");
                    console.log(j);
                    j++;
                    i+=7;
                }
            });
        }
    })
}

// Sets searches as buttons
function setHistory(userInput) {
    $('#search-history').prepend('<button id="history-item" class="poopy" type="button">' + userInput.value + '</button>');
    console.log(document.getElementById("history-item").innerHTML);
}

// History retrieval function
$('.poopy').on('click', function() {
    //console.log(document.getElementById("history-item").innerHTML);
    alert(userInput.value);
});