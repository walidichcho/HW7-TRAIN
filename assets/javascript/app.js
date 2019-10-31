// Your web app's Firebase configuration


$(document).ready(function () {

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

    $("#add-train-btn").click(function (event) {
        event.preventDefault();

        var trainname = $("#train-name-input").val().trim();
        var traindestination = $("#destination-input").val().trim();
        var firsttrain = $("#firsttrain-input").val().trim();
        var trainfrequency = $("#frequency-input").val().trim();




        var newtrain = {
            name: trainname,
            destination: traindestination,
            firsttraintime: firsttrain,
            Frequency: trainfrequency,
        };
        //upload the train data to database

        database.ref().push(newtrain);

        console.log(newtrain);

        //clear all data from the input area


        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#firsttrain-input").val("");
        $("#frequency-input").val("");

    });


    database.ref().on('child_added', function (childsnapshot) {

        console.log(childsnapshot.val());


        //create firebase event for adding train when the user add info.


        var trainname = childsnapshot.val().name;
        var traindestination = childsnapshot.val().destination;
        var firsttrain = childsnapshot.val().firsttraintime;
        var trainfrequency = childsnapshot.val().Frequency;

        console.log(trainname);
        console.log(traindestination);
        console.log(firsttrain);
        console.log(trainfrequency);

        var currenttime = moment();
        console.log("current time : " + moment(currenttime).format("hh:mm"));
        moment(currenttime).format("hh:mm");


        // var traintime = moment().unix(moment(firsttrain).format("hh:mm"));
        // console.log(traintime);

        var trainTimeConverted = moment(firsttrain, "hh:mm");
        console.log(trainTimeConverted);

        var difference = moment().diff(moment(trainTimeConverted), "minutes");
        console.log(difference);

        //tme remainder
        // trainDestinationTimeInMinutes
        var trainremain = difference % trainfrequency;

        //minutes until arrive
        var minuntil = trainfrequency - trainremain;

        //next arrival timme

        var nextarrival = moment().add(minuntil, "minutes").format("hh:mm")
        console.log(nextarrival);


        $("#Train-table > tbody").append("<tr><td>" + trainname + "</td><td>" + traindestination + "</td><td>" + trainfrequency + "</td><td>" + nextarrival + "</td><td>" + minuntil + "</td></tr>");
    });
});

// Write a setInterval function that goes and updates the "minues away" value. If the value is < 5 turn it red 