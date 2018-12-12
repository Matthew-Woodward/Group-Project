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
    // checkbox "use current location/get location info"s

    $('input[name="checkme"]').click(function () {
        if ($(this).prop("checked") == true) {
            getLocation();
        }
        else if ($(this).prop("checked") == false) {
            console.log("Checkbox is unchecked.");
        }
    });

    $(".pushButton").on("click", function () {
        event.preventDefault();
        let zip = $("#zipInput").val().trim();
        let queryURL
        if ($('#checkme').prop('checked')) {
            queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + pos.lat + "&lon=" + pos.lon + "&units=imperial&appid=d54bfd23f3c07ca6f72d794ac3e9d183";
        }
        else {
            queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",us&units=imperial&appid=d54bfd23f3c07ca6f72d794ac3e9d183";
        }
        console.log("lat: " + pos.lat + " lon: " + pos.lon);
        console.log(queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(queryURL);
            console.log(response);

            //display data
            $("#511").html(response.list[0].main.temp_max + "F");
            $("#512").html(response.list[0].main.temp_min + "F");
            $("#513").html(response.list[0].main.humidity + "%");
            $("#514").html(response.list[0].wind.speed + "MPH");
            $("#515").html(response.list[0].weather[0].description);

            $("#521").html(response.list[8].main.temp_max + "F");
            $("#522").html(response.list[8].main.temp_min + "F");
            $("#523").html(response.list[8].main.humidity + "%");
            $("#524").html(response.list[8].wind.speed + "MPH");
            $("#525").html(response.list[8].weather[0].description);

            $("#531").html(response.list[16].main.temp_max + "F");
            $("#532").html(response.list[16].main.temp_min + "F");
            $("#533").html(response.list[16].main.humidity + "%");
            $("#534").html(response.list[16].wind.speed + "MPH");
            $("#535").html(response.list[16].weather[0].description);

            $("#541").html(response.list[24].main.temp_max + "F");
            $("#542").html(response.list[24].main.temp_min + "F");
            $("#543").html(response.list[24].main.humidity + "%");
            $("#544").html(response.list[24].wind.speed + "MPH");
            $("#545").html(response.list[24].weather[0].description);

            $("#551").html(response.list[32].main.temp_max + "F");
            $("#552").html(response.list[32].main.temp_min + "F");
            $("#553").html(response.list[32].main.humidity + "%");
            $("#554").html(response.list[32].wind.speed + "MPH");
            $("#555").html(response.list[32].weather[0].description);

        });
    });
});