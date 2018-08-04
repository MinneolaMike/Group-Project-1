// Submit search event
      $("#submit-search").on("click", function(event) {
        event.preventDefault();
      
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
                console.log("------------------------------------");
        
                var resultsNum = response.Jobs.length;
                for (var i = 0; i < resultsNum; i++) {
                  var jobListing = response.Jobs[i];
                    console.log(jobListing.JobTitle);
                    console.log(jobListing.Company);
                    console.log(jobListing.Location);
                    console.log(jobListing.URL);
                    console.log("------------------------------------");
                }
      });
    });

