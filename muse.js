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

    // console.log(response);
    // console.log("------------------------------------");

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
      var url = jobListing.URL;
    

     
      if (email_id) {
         // load search results to html with the save button if user not logged in
        var newRow = $("#resultsTable")
        .append($('<tr>')
          .append($('<td>').append(jobListing.JobTitle).attr("data-jobtitle", jobListing.JobTitle))
          .append($('<td>').append(jobListing.Company).attr("data-jobcompany", jobListing.Company))
          .append($('<td>').append(jobListing.Location).attr("data-joblocation", jobListing.Location))
          .append($('<td>').append(daysAgo).attr("data-dateposted", jobListing.AccquisitionDate))
          .append($('<td>').html("<a href='" + jobListing.URL + "' target='_blank'> Apply</a>").attr("data-url", jobListing.URL))
          .append($("<td>").html("<button data-title='" + title + "' data-company='" + company + "' data-location='" + location + "' data-postdate='" + postdate + "' data-url= '" + url + "' data-search= '" + keywordInput + "' type='button' class='btn-sm btn-primary' id='save-jobs'>Save</button>"))
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


    }
  });
});


