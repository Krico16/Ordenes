var config = '../../google-auth.json';

firebase.initializeApp(config);


function login() {
    var username = $("#UserMail").val();
    var password = $("#UserPass").val();

    var settings = {
        "url": "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2Ahq7N6O3Bjc6WzNeiMPD-KdQDac03Rc",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": username,
            "password": password,
            "returnSecureToken": true
        }),
    };
    $.ajax(settings).done(res => {
        console.log(res);
    })
}