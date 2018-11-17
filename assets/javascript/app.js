$(document).ready(function () {

    var topics = ["puppies", "kitties", "disney"];

    function alertGifName() {
        var gifBtn = $(this).attr("data-topic");
        $("#gifs").empty();
        console.log(topics);
        getGifByName(gifBtn);
    }

    function callgif(gifBtn) {
        return "https://api.giphy.com/v1/gifs/search?q=" + gifBtn + "&api_key=R3lEi96btu2yceVAysHmcVq9Xl3etoGJ";
    }
    
    function getGifByName(gifBtn) {
        $.ajax({
            url: callgif(gifBtn),
            method: "GET"
        }).then(function (response) {
            debugger;
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating)
                var gifImage = $("<img class='gify'>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "animate");
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#gifs").prepend(gifDiv);
              }
        })
    }

    function renderButtons() {
        $("#btn-dinamico").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("typeOfGif");
            a.attr("data-topic", topics[i]);
            a.text(topics[i]);
            $("#btn-dinamico").append(a);
        }
    }

    $("#btn-submit").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#inputDefault").val().trim();
        topics.push(newTopic);
        $("#inputDefault").empty();
        renderButtons();
    });


    $(document).on("click", ".typeOfGif", alertGifName);

    renderButtons();

    $(document).on("click", ".gify", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

});