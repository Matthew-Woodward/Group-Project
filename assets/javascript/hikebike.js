$(document).ready(function () {
    //Declare API Key as a Global Variable
    var APIkey2 = "200393554-a94c289e68a08e7bdc65e6edd54c90f7";

    //Hike button function
    $("#Hike").on("click", function () {
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
                console.log(encodedURL);
                console.log(response.lat);
                console.log(response.lng);

                var lat = response.lat;
                var lon = response.lng;
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

                        //Display DATA
                        $("#maxDistance").html("Max Distance: " + maxDistance); //Can display a photo
                        //$("#maxResults").append("<p>").text("Trails: " + response.trails[i].difficulty);
                        //$("#minLength").html("Trail Length: " + response.trails[i].length);
                        //$("minStars").html("Rating: " + response.trails[i].stars);
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
                console.log(encodedURL);
                console.log(response.lat);
                console.log(response.lng);

                var lat = response.lat;
                var lon = response.lng;

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
                        //Display DATA
                        $("#maxDistance").html("Max Distance: " + maxDistance);
                        //$("#maxResults").append("<p>").text("Trails: " + response.trails[j].difficulty);
                        //$("#minLength").html("Trail Length: " + response.trails[j].length);
                        //$("minStars").html("Rating: " + response.trails[i].stars);
                    }
                });
            }
        });
    });
});