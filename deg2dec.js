var deg2dec = {
    addressLookup: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=',

    showCoords: function(data, status, xhr) {
	console.log(data);
	if (data.results.length == 1) {
	    coords = "" +
		data.results[0].geometry.location.lat.toFixed(6) +
		"x" +
		data.results[0].geometry.location.lng.toFixed(6);
	    $("#coords-output").val(coords);
	} else {
	    $("#address-status").text("More than 2 or more coordinates returned");
	}
    },

    lookupCoords: function() {
	var url = $("#address").val().replace(/[ ,]+/g, "+");
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
	console.log(raw);

	var minutes = raw.match(/\d\d\.\d\d\d/g);
	for (var i = 0; i < minutes.length; i++) {
	    minutes[i] = minutes[i] * 0.0166666667;
	}
	console.log(minutes);

	var degrees = raw.match(/\d\d. /g, "");
	for (var i = 0; i < degrees.length; i++) {
	    degrees[i] = parseInt(degrees[i].replace(/. /g, ""));
	}
	console.log(degrees);

	var lat = (degrees[0] + minutes[0]).toFixed(6)
	var lng = (degrees[1] + minutes[1]).toFixed(6)
	$("#coords-output").val(lat + "x" + lng);
    },

    registerHandlers: function() {
	var that = this;

	$("#lookup").click(function() {
	    $("#coords-output").val("");
	    $("#coords-input").val("");
	    $("#address-status").text("");
	    that.lookupCoords();
	});

	$("#convert").click(function() {
	    $("#coords-output").val("");
	    $("#address-status").text("");
	    that.convertCoords();
	});
    },
};

document.addEventListener('DOMContentLoaded', function () {
    deg2dec.registerHandlers();
});
