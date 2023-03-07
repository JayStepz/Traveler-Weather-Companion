var mainURL = "http://api.openweathermap.org/data/2.5"
var userInput = document.getElementById("userInput"); //ex: atlanta

// Search function start
// Exectutes fetches for current weather and forecast and creates a button in the history
$(".searchBtn").click(function() {
    getCurrent(userInput);
    getForecast(userInput);
    setHistory(userInput);
});

// Fills the Current panel
function getCurrent(userInput) {
    var endpoint = "/weather?q=" + userInput.value + ",US&lang=en&appid=d9f292cdf3df11c3df01f2dce7d83ce1&units=imperial"
    var submitURL = mainURL + endpoint;

    fetch(submitURL) //full URL is fetched for current weather (Note "/weather" in this URL)
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

    fetch(submitURL) //full URL is fetched for forecast (Note "/forecast" in this URL)
    .then(function (response) {
        if (200 === response.status) {
            response.json().then(function (data) {
                var myDate = null; // I don't remember why Brandon advised I made these null variables but I trust him
                var emblem = null; // Might have been to make sure there weren't conflicts with the same named variables in the getCurrent function
                
                // loop to put info in each forecast panel
                for (var i = 0; i < data.list.length; i++) {
                    myDate = new Date(data.list[i].dt *1000).toLocaleDateString();
                    emblem = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";

                    $('.day-'+ j).html(myDate);
                    $('#symbol-'+ j).html("<img src=" + emblem + " />");
                    $('.temperature').html(data.list[i].main.temp + " Fahrenheit");
                    $('.wind').html(data.list[i].wind.speed + " MPH");
                    $('.humidity').html(data.list[i].main.humidity + " %");
                    j++; // for each day, 2 - 6
                    i+=7; // for taking specifically spaced JSON objects in an attempt to pull a unique JSON for each day
                }
            });
        }
    })
}

// Sets searches as buttons
function setHistory(userInput) {
    $('#search-history').prepend('<button id="history-item" type="button">' + userInput.value + '</button>');
}

// History retrieval function (couldn't get this to work and running out of time)
//$('#history-item').on('click', function() {
    //alert(userInput.value); Commented out from when I was trying to troubleshoot
//});