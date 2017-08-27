var animals = [];


$("input[type='submit']").on("click", function(event) {
    event.preventDefault();

    var val = $("input[type='text']").val().trim();

    animals.push(val);

    renderButton();
});


$(document).on("click", ".animal", displayMovieInfo);


$(".imgClick").on("click", function() {
  alert("yes");
  
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});

//     -------------------  FUNCTIONS   ----------

function displayMovieInfo() {

	var animal = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=158a4ce93de14f9c96c7a820b2392bb2&limit=10";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
		console.log(response);

		for(var i = 0; i < response.data.length; i++){

			var gifDiv = $("<div class='gif'>");
			$("#showG").prepend(gifDiv);

			var rated = 'rated: ' + JSON.stringify(response.data[i].rating);
			var p = $("<p>").text(rated);
			gifDiv.append(p);

			var gif = response.data[i].images.fixed_height.url;
			var animalGif = $("<img>").attr("src", gif).attr("data-stll", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still");

			gifDiv.append(animalGif);
		}
	});
}


function renderButton() {

	$("#buttonBox").empty();

	for (var i = 0; i < animals.length; i++) {
	  var val = $("<button>");
	  val.addClass("animal");
	  val.attr("data-name", animals[i]);
	  val.text(animals[i]);
	  $("#buttonBox").append(val);
	};

}





