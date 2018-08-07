var searchArea = [];
var companies = [];
var companyID = [];



// Submit search event
$("#submit-search").on("click", function (event) {
  event.preventDefault();

  // Empty search results this will prevent duplication of searches
  $("#resultsTable").empty();



  // Capture values
  var locationInput = $("#location-input").val().trim();
  var keywordInput = $("#keyword-input").val().trim();



  // Set up URL, add authorization token 
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.careeronestop.org/v1/jobsearch/lrBD3vbyFOxQtUb/" + keywordInput + "/" + locationInput + "/25/0/0/0/10/60",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer qA9NVS//BpInzmVsOODQ+tXhlgqTsKNa+ZFaOLvijHR04Jrr/3Jzdi2eJoOVrHE1/8L2MEnzLxeaJ4zV9uTkLA==",
      "Cache-Control": "no-cache",
      "Postman-Token": "0cab4fd0-14c7-44d0-8e24-ce787a7a188b"
    }
  }

  // Run ajax request
  $.ajax(settings).done(function (response) {

    console.log(response);
    // console.log("-----------s-------------------------");

    var resultsNum = response.Jobs.length;
    for (var i = 0; i < resultsNum; i++) {
      var jobListing = response.Jobs[i];

      // console.log(jobListing.JobTitle);
      // console.log(jobListing.Company);
      // console.log(jobListing.Location);
      // console.log(jobListing.URL);
      // console.log("------------------------------------");

      var dateConvert = jobListing.AccquisitionDate.split(" ");
      var calendarDate = dateConvert[0];
      var daysAgo = moment(calendarDate).fromNow();


      var title = jobListing.JobTitle;
      var company = jobListing.Company;
      var location = jobListing.Location;
      var postdate = jobListing.AccquisitionDate;
      var jobid = jobListing.JvId;
      var url = jobListing.URL;
    
// variable for location of jobListing to set places ID search area
address = jobListing.Location;
// push to array         
searchArea.push(address);
console.log(searchArea);
      
// variable for company names
placeName = jobListing.Company;
// push to array
companies.push(placeName);
console.log(companies);

     
      if (email_id) {
         // load search results to html with the save button if user not logged in
        var newRow = $("#resultsTable")
        .append($('<tr>')
          .append($('<td>').append(jobListing.JobTitle).attr("data-jobtitle", jobListing.JobTitle))
          .append($('<td>').append(jobListing.Company).attr("data-jobcompany", jobListing.Company))
          .append($('<td>').append(jobListing.Location).attr("data-joblocation", jobListing.Location))
          .append($('<td>').append(daysAgo).attr("data-dateposted", jobListing.AccquisitionDate))
          .append($('<td>').html("<a href='" + jobListing.URL + "' target='_blank'> Apply</a>").attr("data-url", jobListing.URL))
          .append($("<td>").html("<button data-title='" + title + "' data-company='" + company + "' data-location='" + location + "' data-postdate='" + postdate + "' data-url= '" + url + "' data-search= '" + keywordInput + "' data-jobid='" + jobid + "' type='button' class='btn-sm btn-primary' id='save-jobs'>Save</button>"))
        ); 
      } else {
         // load search results to html without the save button if user not logged in
        var newRow = $("#resultsTable")
        .append($('<tr>')
          .append($('<td>').append(jobListing.JobTitle).attr("data-jobtitle", jobListing.JobTitle))
          .append($('<td>').append(jobListing.Company).attr("data-jobcompany", jobListing.Company))
          .append($('<td>').append(jobListing.Location).attr("data-joblocation", jobListing.Location))
          .append($('<td>').append(daysAgo).attr("data-dateposted", jobListing.AccquisitionDate))
          .append($('<td>').html("<a href='" + jobListing.URL + "' target='_blank'> Apply</a>").attr("data-url", jobListing.URL))
        );
      }

      // Display search results
      $(".content-wrapper").show();

      initMap();

    }
    

  });
});


  var map;
  var service;
  var infowindow;
  
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 10
    });

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({'address': searchArea[0]}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
      } else {
        window.alert('Geocode was not successful for the following reason: ' +
            status);
      }
    });
  

    for (var i = 0; i < companies.length; i++) {
    var request = {
      query: companies[i] + " " + searchArea[i],
      fields: ['formatted_address', 'name'],
    };
  
    
    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();
    service.textSearch(request, callback);
  }
}
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        createMarker(place);
  }
}
  }

  function createMarker(place) {

    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        '<br>' +
        place.formatted_address + '</div>');
      infowindow.open(map, this);
  });
}