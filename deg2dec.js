"use strict";

// Initialise tool when content is loaded
(function init () {
  document.addEventListener("DOMContentLoaded", function () {
    registerHandlers();
  });
})();

function registerHandlers () {
  bindSubmission("#lookup", "#address-input", submitLookup);
  bindSubmission("#convert", "#coords-input", submitConversion);
};

// Register a click event on a button
// and an enter event on an input
// to perform an action
function bindSubmission (button, input, action) {
  $(button).click(function() {
    action();
  });

  $(input).keypress(function (event) {
    if (event.which == 13) action();
  });
};

function submitLookup () {
  $("#coords-output").val("");
  $("#address-error").hide();
  $("#coords-input").val("");
  lookupCoords();
};

function submitConversion () {
  $("#coords-output").val("");
  $("#address-error").hide();
  $("#address-input").val("");
  convertCoords();
}

function lookupCoords () {
  var addressLookup = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

  var url = $("#address-input").val().replace(/[ ,]+/g, "+");
  $.ajax({
    type: "GET",
    url: encodeURI(addressLookup + url),
    crossDomain:true,
    cache:false,
    async:false,
    success: showResult
  });
};

function convertCoords () {
  var raw = $("#coords-input").val();

  var minutes = raw.match(/\d+\.\d\d\d/g),
      degrees = raw.match(/\d+. /g, "");

  for (var i = 0; i < minutes.length; i++) {
    minutes[i] = minutes[i] * 0.0166666667;
  }

  for (var i = 0; i < degrees.length; i++) {
    degrees[i] = parseInt(degrees[i].replace(/. /g, ""));
  }

  var lat = (degrees[0] + minutes[0]).toFixed(6);
  var lng = (degrees[1] + minutes[1]).toFixed(6);

  populateOutput(lat + "x" + lng);
};

function showResult (data, status, xhr) {
  if (data.results.length == 1) {
    var coords = data.results[0].geometry.location.lat.toFixed(6)
             + "x"
             + data.results[0].geometry.location.lng.toFixed(6);
    populateOutput(coords);
  } else {
    $("#address-error").show();
    $("#address-input").focus();
  }
};

function populateOutput (coordString) {
  $(".hint").text("");
  $("#coords-output").text(coordString);
};

