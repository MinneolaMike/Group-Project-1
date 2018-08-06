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

// Hide success message
$('#success').hide();

// $('#jobId-1').hide();
$('#jobId-2').hide();


//This function displays success message
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
            var email_id = user.email;
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

    // firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //     window.alert("Error :" + errorMessage);
    // });


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
    $('#jobId-2').hide();
    $('#jobId-1').show();
}

$("#jobId-2").on("click", function (event) {
    event.preventDefault();

    // Grabs user input


    var user = $(this).attr("data-jobUser").trim();
    var title = $(this).attr("data-jobTitle").trim();
    var url = $(this).attr("data-jobUrl").trim();
    var postDate = $(this).attr("data-jobPostDate").trim();
    var location = $(this).attr("data-jobLocation").trim();

    alert(user + title);


    // Creates local "temporary" object for holding train data
    var newJob = {
        jobUser: user,
        jobTitle: title,
        jobUrl: url,
        jobPostdate: postDate,
        jobLocation: location
    };

    // Uploads jobs data to the database
    database.ref().push(newJob);



    // alert("Train successfully added");
    successMessage();
    //data push
    console.log(newJob);
});


//enable the search button if keyword-input and location-input have been filled
$("form").on('submit', function(e) {
    e.preventDefault();
    
});
