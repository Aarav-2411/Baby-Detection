objects = [];
Status = "";

function preload() {
    Alaram = loadSound("alarm.mp3"); 
}

function setup() {
    canvas = createCanvas(650, 400);
    canvas.center();

    video = createCapture();
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Is Loaded");
    Status = "True";
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 650, 400);

    if (Status == "True") {
        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            fill("red");
            text(objects[i].label + " " + Math.floor(objects[i].confidence * 100) + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("Babystatus").innerHTML = "Baby Detected";
                Alaram.stop();
            }
            else {
                document.getElementById("Babystatus").innerHTML = "Baby NOT Detected";
                Alaram.play();
                Alaram.setVolume(1);
                Alaram.rate(1);
            }
        }
        if (objects == "") {
            document.getElementById("Babystatus").innerHTML = "Baby NOT Detected";
            Alaram.play();
            Alaram.setVolume(1);
            Alaram.rate(1);
        }
    }
}