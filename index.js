

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;
        if (user != null) {
            var email_id = user.email;

            document.getElementById("user_para").innerHTML = "Welcome: " + email_id;

        }


    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";

        document.getElementById("user_para").innerHTML = "Good Bye: ";
    }
});


function login() {

    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;


    window.alert(userEmail + " " + userPassword);

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error :" + errorMessage);
    });
}


function signup() {

    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    window.alert(userEmail + " " + userPassword);

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}


function logout() {
    alert("log out");
    // document.getElementById("userEmail").reset(); 
    // document.getElementById("userPassword").reset(); 

    //  document.getElementById("userEmail").value("");
    // document.getElementById("userPassword").value("");

    // document.getElementById("userEmail").reset();
    // document.getElementById("userPassword").reset();

    firebase.auth().signOut();
}
