$(document).ready(function () {
    let pos = {
        allowed: false
    };

    async function getLocation() {
        if (navigator.geolocation) {
            let data = await navigator.geolocation.getCurrentPosition(showPosition)
            return data;
        }
    }
    function showPosition(position) {
        let lat = position.coords.latitude.toFixed(0);
        let lon = position.coords.longitude.toFixed(0);
        pos = {
            allowed: true,
            lat,
            lon
        };
    }
    // checkbox "use current location/get location info"

    $('input[name="checkme"]').click(function () {
        if ($(this).prop("checked") == true) {
            getLocation();
        }
        else if ($(this).prop("checked") == false) {
            console.log("Checkbox is unchecked.");
        }
    });
    //input zip code and click either hike or bike to search

    $(".pushButton").on("click", function () {
        event.preventDefault();
        let zip = $("#zipInput").val().trim();
        let queryURL
        if ($('#checkme').prop('checked')) {
            queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lon + "&units=imperial&appid=d54bfd23f3c07ca6f72d794ac3e9d183";
        }
        else {
            queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=d54bfd23f3c07ca6f72d794ac3e9d183";
        }
        console.log("lat: " + pos.lat + " lon: " + pos.lon);
        console.log(queryURL);
        //       let queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=d54bfd23f3c07ca6f72d794ac3e9d183";

        //ajax call for current weather
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(queryURL);
            console.log(response);

            //display current weather data
            $("#temp").text("Temperature (F) " + response.main.temp);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#windSpeed").text("Wind Speed: " + response.wind.speed);
            $("#conditions").text("Conditions: " + response.weather[0].description);
        });
    });

});