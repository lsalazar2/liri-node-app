//Read and set any environment variables with the dotenv package
require("dotenv").config();

//add code to import the keys.js file and store it
var keys = require("./keys.js"); //read in keys.jsfile

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
console.log("spotify object:" + spotify);

var request = require("request"); //makes request to HTTPS site for OMDB & Bands in Town API

var moment = require("moment");

var nodeInputs = process.argv; //global variable

var liriCommand = process.argv[2];
var liriSearch = process.argv[3];

// Main body Get user request via node
//take in one of the following commands:
function main() {
    console.log("in main fn");
    //switch statement for each parameter + random.txt

    switch (liriCommand) {
        //1. concert-this bandname command
        case "concert-this":
            console.log("concert-this fn");
            concert(liriSearch);
            break;

        // 2. spotify-this-song
        case "spotify-this-song":
            songSearch(liriSearch);
            break;

        // 3. movie-this
        case "movie-this":
            movie(liriSearch);
            break;

        // 4. do-what-it-says
        case "do-what-it-says":
            doit(liriSearch);
            break;

        case "spotify-this=song":
            songSearch(liriSearch);
            break;
    }
}//End of Main

function concert(search) {
    //concert-this function (artist_band_name), search Bands in Town Artist Events API return:
    //Name of venue, Location & Event Date(MM/DD/YYYY)

    console.log("nodeInputs=" + nodeInputs);

    if (nodeInputs) { //check for no band input
        var artist = "";
        console.log(artist);
        for (var i = 3; i < nodeInputs.length; i++) {
            if (i > 3 && i < nodeInputs.length) {
                artist = artist + "+" + nodeInputs[i];
                console.log(artist);
            }
            else {
                artist += nodeInputs[i];
            }
        }
    }
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        //If no error and response is a success
        if (!error && response.statusCode === 200) {
            //Parse the json response
            console.log("get concert data for this artist");

            var data = JSON.parse(body);

            //Loop through array
            for (var i = 0; i < data.length; i++) {
                //Get venue name
                console.log("Upcoming concerts for " + artist + ":");
                console.log("Venue: " + data[i].venue.name);

                //Get venue location
                //If statement for concerts without a region
                if (data[i].venue.region == "") {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                } else {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                }
                //Get date of show
                var date = data[i].datetime;
                date = moment(date).format("MM/DD/YYYY");
                console.log("Date: " + date)
                console.log("----------------")
            }
        }
        else {
            console.log("Error:" + response.statusCode.Code);
        }

    });

}

function songSearch(song) {
    console.log("in songs fn");

    //spotify-this-song and show: artist, Song's name, if none,  default is: "The Sign" by Ace of Base, preview link of song from Spotify, alblum the song is from

    if (!song) { //set to default if no song was input
        userInput = "The Sign";
    }

    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        if (err) {
            console.log("Error occured: " + err)
        }
        var info = data.tracks.items

        //Loop through all the "items" array
        for (var i = 0; i < info.length; i++) {
            //Store "album" object to variable
            var albumObject = info[i].album;
            var trackName = info[i].name;
            var preview = info[i].preview_url;

            //Store "artists" array to variable
            var artistsInfo = albumObject.artists

            //Loop through "artists" array
            for (var j = 0; j < artistsInfo.length; j++) {
                console.log("Artist: " + artistsInfo[j].name);
                console.log("Song Name: " + trackName);
                console.log("Preview of Song: " + preview);
                console.log("Album Name: " + albumObject.name);
            }
        }
        //spotify
        //    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        //    .then(function (data) {
        //        console.log(data);
        //    })
        //    .catch(function (err) {
        //        console.error('Error occurred: ' + err);
        //    });

    });
}

function movie(movie) {
    console.log("in the movie fn");

    var request = require("request");

    // Store all of the arguments in an array
    var nodeInputs = process.argv;

    var movieName = "";

    // Loop through all the words in the node argument
    if (!movie) {
        //no movie was input default to Mr.Nobody
        movieName = "Mr. Nobody";
    }
    else {
        //get the movie name

        for (var i = 3; i < nodeInputs.length; i++) {

            if (i > 3) {
                movieName = movieName + "+" + nodeInputs[i];
            }
            else {
                movieName += nodeInputs[i];
            }
        }
    }
    console.log(movieName);

    // Request movie data from the OMDB API
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log("Title: " + info.Title);
            console.log("Release Year: " + info.Year);
            console.log("IMDB Rating: " + info.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
            console.log("Country: " + info.Country);
            console.log("Language: " + info.Language);
            console.log("Plot: " + info.Plot);
            console.log("Actors: " + info.Actors);
        }
    });
}

function doit(usertext) {
    //do-what-it-says use fs node package to take text in random.txt and use it to call oneof Liri's commands

    var fs = require("fs");

    //Read random.txt file
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        //Split data into array
        var textArr = data.split(",");
        liriCommand = textArr[0];
        liriSearch = textArr[1];
        main(); //call main routine to execute one of the other 3 functions
    });
}
// Call main function
main();
