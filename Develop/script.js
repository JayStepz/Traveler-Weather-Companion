// API call example
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// My call
// http://api.openweathermap.org/geo/1.0/onecall?q={city name},{state code},US&lang=en&exclude=minutely,hourly,alerts&units=imperial&appid=d9f292cdf3df11c3df01f2dce7d83ce1
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

// global variable for API call URL
 var URL = "http://api.openweathermap.org/geo/1.0/onecall?q=city,US&lang=en&exclude=minutely,hourly,alerts&units=imperial&appid=d9f292cdf3df11c3df01f2dce7d83ce1"

// function taking input, pushing into URL, then submitting

// function for pulling data from API
//  fetch(weatherdata) {    
//  store data locally
//}

// function for displaying data from API
//  display(weatherdata) {}

// Function start
$(".searchBtn").click(function() {
    var userInput = document.getElementById("userInput"); //ex: atlanta
    var submitURL = URL.replace('city', userInput.value); //result: "http://api.openweathermap.org/geo/1.0/onecall?q=atlanta,US&lang=en&exclude=minutely,hourly,alerts&units=imperial&appid=d9f292cdf3df11c3df01f2dce7d83ce1"

    fetch(submitURL) //submitURL is submitted to API
    .then(function (response) {
        //error
        if (200 !== response.status) {
            console.log("Something went wrong. Status:" + response.status + " Please try again.");
            return;
        }
        //success 
        else if (200 === response.status) {
            
        }
    })
});
