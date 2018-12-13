$(document).ready(function () {

    let response = JSON.parse(localStorage.getItem("response"));
    localStorage.clear();

    console.log(response);
    for (i = 0; i < response.trails.length; i++) {
        let trDiv = $("<div class='col-md-12'>");
        let trName = $("<p>").text("Name: " + response.trails[i].name);
        let trSumm = $("<p>").text("Summary: " + response.trails[i].summary);
        let trDiff = $("<p>").text("Difficulty: " + response.trails[i].difficulty);
        let trStars = $("<p>").text("Difficulty: " + response.trails[i].stars);
        let trLink = $("<p>").text("Link: " + response.trails[i].url);

        trDiv.append(trName);
        trDiv.append(trSumm);
        trDiv.append(trDiff);
        trDiv.append(trStars);
        trDiv.append(trLink);

        $("#trailInfo").append(trDiv);
    }

});