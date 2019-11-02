



$(document).ready(function () {

    //  web app's Firebase configuration

    var firebaseConfig = {
        apiKey: "AIzaSyAhAO-tWLMEb6IPmwRiqKyx2XJLfTJuRss",
        authDomain: "naima-project.firebaseapp.com",
        databaseURL: "https://naima-project.firebaseio.com",
        projectId: "naima-project",
        storageBucket: "naima-project.appspot.com",
        messagingSenderId: "775222124621",
        appId: "1:775222124621:web:88ea8f4335b55d01cb3c04",
        measurementId: "G-7QHSMX2JTP"
    };

    // Initialize Firebase

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    //create a function when we click submit button/get the value of each input and trim it

    $("#add-train-btn").click(function (event) {
        event.preventDefault();

        // variable for each entry
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = $("#firsttrain-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        //variable for data base storage
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            firsttraintime: firstTrain,
            Frequency: trainFrequency,
        };

        //upload or push the train data to database

        database.ref().push(newTrain);

        console.log(newTrain);

        //clear all data from the input area

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#firsttrain-input").val("");
        $("#frequency-input").val("");

    });

    // create a snapshot for each entry on click

    database.ref().on('child_added', function (childsnapshot) {

        console.log(childsnapshot.val());

        var trainName = childsnapshot.val().name;
        var trainDestination = childsnapshot.val().destination;
        var firstTrain = childsnapshot.val().firsttraintime;
        var trainFrequency = childsnapshot.val().Frequency;

        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrain);
        console.log(trainFrequency);

        //use mement function to calculate next train time and time away

        var currentTime = moment();
        console.log("current time : " + moment(currentTime).format("hh:mm"));
        moment(currentTime).format("hh:mm");

        var trainTimeConverted = moment(firstTrain, "hh:mm");
        console.log(trainTimeConverted);

        //difference between current time and the first train in min.
        var difference = moment().diff(moment(trainTimeConverted), "minutes");
        console.log(difference);

        //time remain
        var trainRemain = difference % trainFrequency;

        //minutes until arrive
        var minUntil = trainFrequency - trainRemain;

        //next arrival timme
        var nextArrival = moment().add(minUntil, "minutes").format("hh:mm")
        console.log(nextArrival);

        $("#Train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");


    });
});

// Write a setInterval function that goes and updates the "minues away" value. If the value is < 5 turn it red 
var currentTime = moment();

moment(currentTime).format("hh:mm");

setInterval(function () {
    window.location.reload();
}, 60000);
