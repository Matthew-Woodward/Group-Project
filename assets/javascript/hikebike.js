$(document).ready(function () {
    //Declare API Key as a Global Variable
    var APIkey2 = "200393554-a94c289e68a08e7bdc65e6edd54c90f7";
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

    //Hike button function
    $("#Hike").on("click", function () {
        event.preventDefault();
        let zip = $("#zipInput").val();


        var encodedURL = encodeURIComponent(
            "http://www.zipcodeapi.com/rest/gvvqqEnFXksoKlCTLC3V3NVtDJnDq3Ykq4GbH6sdm4FK9mS93BTXy9wKVP8McDbt/info.json/" +
            zip +
            "/degrees"
        );

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "https://corsbridge2.herokuapp.com/" + encodedURL,
            success: function (response) {
                let lat
                let lon
                console.log(encodedURL);
                console.log(response.lat);
                console.log(response.lng);
                if ($('#checkme').prop('checked')) {
                    lat = pos.lat;
                    lon = pos.lon;
                }
                else {
                    lat = response.lat;
                    lon = response.lng;
                }
                var encodedURL2 = encodeURIComponent(
                    "https://www.hikingproject.com/data/get-trails?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&maxDistance=30&key=" +
                    APIkey2
                );

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "https://corsbridge2.herokuapp.com/" + encodedURL2,
                    success: function (response) {
                        console.log(response);
                        var distanceArr = response.trails.map((item, i) => {
                            return parseFloat(response.trails[i].length);
                        });
                        console.log(typeof distanceArr);
                        console.log(`Distance Array: ${distanceArr}`);

                        var maxDistance = Math.max.apply(null, distanceArr);
                        console.log("Max Distance: " + maxDistance);

                        var minDistance = Math.min.apply(null, distanceArr);
                        console.log("Min Distance: " + minDistance);

                        var numOfResults = response.trails.length;
                        console.log("Number of Results: " + numOfResults);

                        var ratingsArr = response.trails.map((item, i) => {
                            return parseFloat(response.trails[i].stars);
                        });
                        console.log(ratingsArr);
                        var sum = 0
                        for (var i = 0; i < ratingsArr.length; i++) {
                            sum += parseFloat(ratingsArr[i], 10);
                        }
                        var ratAvg = sum / ratingsArr.length;
                        console.log("ravg: " + ratAvg);
                        //Display DATA
                        $("#maxDistance").html("Max Distance: " + maxDistance); //Can display a photo
                        $("#minDistance").html("Min Distance: " + minDistance);
                        $("#avgRating").html("Average Stars: " + ratAvg);
                        $("#numResults").html("Number of Results:" + response.trails.length);
                        //$("#maxResults").append("<p>").text("Trails: " + response.trails[i].difficulty);
                        //$("#minLength").html("Trail Length: " + response.trails[i].length);
                        localStorage.setItem("response", JSON.stringify(response));
                    }
                });
            }
        });
    });

    //Bike Button function
    $("#Bike").on("click", function () {
        event.preventDefault();
        var zip = $("#zipInput").val();
        var encodedURL = encodeURIComponent(
            "http://www.zipcodeapi.com/rest/gvvqqEnFXksoKlCTLC3V3NVtDJnDq3Ykq4GbH6sdm4FK9mS93BTXy9wKVP8McDbt/info.json/" +
            zip +
            "/degrees"
        );

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "https://corsbridge2.herokuapp.com/" + encodedURL,
            success: function (response) {
                let lat
                let lon
                console.log(encodedURL);
                console.log(response.lat);
                console.log(response.lng);
                if ($('#checkme').prop('checked')) {
                    lat = pos.lat;
                    lon = pos.lon;
                }
                else {
                    lat = response.lat;
                    lon = response.lng;
                }
                console.log("1- " + lat + "2- " + lon)
                var encodedURL3 = encodeURIComponent(
                    "https://www.mtbproject.com/data/get-trails?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&maxDistance=30&key=" +
                    APIkey2
                );

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "https://corsbridge2.herokuapp.com/" + encodedURL3,
                    success: function (response) {
                        console.log(response);
                        var distanceArr = response.trails.map((item, i) => {
                            return parseFloat(response.trails[i].length);
                        });
                        console.log(typeof distanceArr);
                        console.log(`Distance object: ${distanceArr}`);

                        var maxDistance = Math.max.apply(null, distanceArr);
                        console.log("Max Distance: " + maxDistance);

                        var minDistance = Math.min.apply(null, distanceArr);
                        console.log("Min Distance: " + minDistance);

                        var numOfResults = response.trails.length;
                        console.log("Number of Results: " + numOfResults);

                        var ratingsArr = response.trails.map((item, i) => {
                            return parseFloat(response.trails[i].stars);
                        });
                        console.log("Ratings object: " + ratingsArr);
                        var sum = 0
                        for (var i = 0; i < ratingsArr.length; i++) {
                            sum += parseFloat(ratingsArr[i], 10);
                        }
                        var ratAvg = sum / ratingsArr.length;
                        console.log("ravg: " + ratAvg);
                        //Display DATA
                        $("#maxDistance").html("Max Distance: " + maxDistance); //Can display a photo
                        $("#minDistance").html("Min Distance: " + minDistance);
                        $("#avgRating").html("Average Stars: " + ratAvg);
                        $("#numResults").html("Number of Results:" + response.trails.length);

                        //$("#maxResults").append("<p>").text("Trails: " + response.trails[j].difficulty);
                        //$("#minLength").html("Trail Length: " + response.trails[j].length);
                        //$("minStars").html("Rating: " + response.trails[i].stars);
                        localStorage.setItem("response", JSON.stringify(response));
                    }
                });
            }
        });
    });
});