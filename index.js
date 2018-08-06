// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZ6TeAiNkV1QEFtAagMdl7OYFCE_8dNfc",
    authDomain: "jobmapper-bf9e0.firebaseapp.com",
    databaseURL: "https://jobmapper-bf9e0.firebaseio.com",
    projectId: "jobmapper-bf9e0",
    storageBucket: "jobmapper-bf9e0.appspot.com",
    messagingSenderId: "673548275473"
};
firebase.initializeApp(config);

var database = firebase.database();

var email_id = "";

// Hide success message
$('#success').hide();


//This function displays success message after data is added to database
function successMessage() {
    $('#success').slideDown(1000);
    $('#success').delay(3000);
    $('#success').slideUp(1000);
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;
        if (user != null) {
            email_id = user.email;
            $('#jobId-1').hide();
            $('#jobId-2').show();
            document.getElementById("user_para").innerHTML = "Welcome: " + email_id;

        }
    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("user_para").innerHTML = "Good Bye: ";
    }
});

// login into fireBase database
function login() {

    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    window.alert(userEmail + " " + userPassword);

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function () {
        // Sign-in successful.
        window.alert("Sign-in successful.");

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error :" + errorMessage);
    });

}

// sign up for access to fireBase database
function signup() {

    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    window.alert(userEmail + " " + userPassword);

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

// login out fireBase database
function logout() {
    alert("log out");
    // document.getElementById("userEmail").reset(); 
    // document.getElementById("userPassword").reset(); 

    //  document.getElementById("userEmail").value("");
    // document.getElementById("userPassword").value("");

    // document.getElementById("userEmail").reset();
    // document.getElementById("userPassword").reset();

    firebase.auth().signOut();


    // hide search results
    $(".content-wrapper").hide();

    // clear current email-id
    email_id = "";
}

// Add event listner for when user clicks the save button
$(document).on("click", "#save-jobs", function (event) {
    event.preventDefault();

    // Grabs user input 
    var company = $(this).attr("data-company").trim();
    var title = $(this).attr("data-title").trim();
    var url = $(this).attr("data-url").trim();
    var postDate = $(this).attr("data-postdate").trim();
    var location = $(this).attr("data-location").trim();
    var search = $(this).attr("data-search").trim();


    // Creates local "temporary" object for holding jobs data
    var newJob = {
        jobUser: email_id,
        jobCompany: company,
        jobTitle: title,
        jobUrl: url,
        jobPostdate: postDate,
        jobLocation: location,
        jobsearch: search
    };

    // Push jobs data to the database
    // console.log(newJob);
    database.ref().push(newJob);


    // alert("Add to database successfull");
    successMessage();

});
