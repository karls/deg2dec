var deg2dec = {
  addressLookup: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=',

  showCoords: function(data, status, xhr) {
    if (data.results.length == 1) {
      coords = "" +
        data.results[0].geometry.location.lat.toFixed(6) +
        "x" +
        data.results[0].geometry.location.lng.toFixed(6);
      populateOutput(coords);
    } else {
      $("#address-error").show();
      $("#address-input").focus();
    }
  },

  lookupCoords: function() {
    var url = $("#address-input").val().replace(/[ ,]+/g, "+");
    $.ajax({
      type: "GET",
      url: encodeURI(this.addressLookup + url),
      crossDomain:true,
      cache:false,
      async:false,
      success: this.showCoords,
    });
  },

  convertCoords: function() {
    var raw = $("#coords-input").val();

    var minutes = raw.match(/\d+\.\d\d\d/g);
    for (var i = 0; i < minutes.length; i++) {
      minutes[i] = minutes[i] * 0.0166666667;
    }

    var degrees = raw.match(/\d+. /g, "");
    console.log(degrees);
    for (var i = 0; i < degrees.length; i++) {
      degrees[i] = parseInt(degrees[i].replace(/. /g, ""));
    }

    var lat = (degrees[0] + minutes[0]).toFixed(6)
    var lng = (degrees[1] + minutes[1]).toFixed(6)
    populateOutput(lat + "x" + lng);
  },

  registerHandlers: function() {
    var that = this;

    $("#lookup").click(function() {
      that.submitLookup();
    });

    $("#convert").click(function() {
      that.submitConversion();
    });
  },

  submitLookup: function () {
    $("#coords-output").val("");
    $("#address-error").hide();
    $("#coords-input").val("");
    this.lookupCoords();
  },

  submitConversion: function () {
    $("#coords-output").val("");
    $("#address-error").hide();
    $("#address-input").val("");
    this.convertCoords();
  }

};

document.addEventListener('DOMContentLoaded', function () {
  deg2dec.registerHandlers();
});

function populateOutput (coordString) {
  $(".hint").text("");
  $("#coords-output").text(coordString);
}
