//Read and set any environment variables with the dotenv package
require("dotenv").config();

//add code to import the keys.js file and store it
var keys = require("./keys.js"); //read in keys.jsfile

var Spotify = require('node-spotify-api');

//var spotify = new Spotify(keys.spotify);

var request = require("request"); //makes request to HTTPS site for OMDB & Bands in Town API

var moment = require("moment");

var nodeInputs = process.argv;

// Main body Get user request via node
//take in one of the following commands:
function main() {
    console.log("in main fn");
    //switch statement for each parameter + random.txt

    var liriCommand = process.arv[2];
    var liriSearch = process.argv[3];

    switch (liriCommand) {
        //1. concert-this bandname command
        case "concert-this":
            console.log("concert this fn");
            concert(liriSearch); //call fn to find concert
            break;

        // 2. spotify-this-song
        case "spotify-this=song":
            song(liriSearch);
            break;

        // 3. movie-this
        case "movie-this":
            movie(liriSearch);
            break;

        // 4. do-what-it-says
        case "do-what-it-says":
            doit(liriSearch);
            break;
        //concert-this function (artist_band_name), search Bands in Town Artist Events API return:
        //Name of venue
        //Venue Location
        //Date of event (MM/DD/YYYY)
        case "spotify-this=song":
            song(liriSearch);
            break;
    }
}//End of Main

function concert(band) {
    console.log("in concert fn");
    if (band) { //band is not null string

        var artist = "";
        console.log(artist);
        for (var i = 3; i < liriSearch.length; i++) {
            if (i > 3) {
                artist = artist + "+" + band[i];
            }
            else {
                artist += band[i];
            }
        }
        console.log("artist:" + artist);
    }
    //request("./bands.js");


    //}
}

function song(song) {
    console.log("in songs fn");
}
//spotify-this-song function(song name here) and show:
// 1. artist
// 2. Song's name, if none, default is: "The Sign" by Ace of Base
// 3. preview link of song from Spotify
// 4. alblum the song is from


//spotify.search({ type: 'track', query: 'query:song }, function(err, data) {
// if (err) {
//   return console.log('Error occurred: ' + err);
//  }

// placeholdercode 
//spotify
//    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//    .then(function (data) {
//        console.log(data);
//    })
//    .catch(function (err) {
//        console.error('Error occurred: ' + err);
//    });

//    function showSong(song) {

//        spotify.search({ type: "track", query: song }, function (err, data) {
//            if (err) {
//                return console.log("Error occurred: " + err);
//            }

// the data for 1 song:

//            var songData = data.tracks.items[0]
// console.log(songData);
//            var song = {
//                artist: songData.artists[0].name,
//                songName: songData.name,
//                songURL: songData.preview_url,
//                album: songData.album.name
//            }
//            console.log(song);
//        });
//     }

function movie(name) {
    console.log("in movie fn");
}
//movie-this function(movie name) and show:
//title of movie (default if none to: Mr.Nobody)
// year movie came out
//IMDB rating of the movie
//rotten tomatoes ratingof movie
//country where movie was produced
//languageof the movie
//plot of the movie
//actors in the movie

//OMDB api key: http://www.omdbapi.com/?i=tt3896198&apikey=aafd5b81
//var request = require("request");

// Then run a request to the OMDB API with the movie specified
//request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {

// If the request is successful (i.e. if the response status code is 200)
//    if (!error && response.statusCode === 200) {

// Parse the body of the site and recover just the imdbRating
// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//}
//});

function doit(usertext) {
    console.log("in movie fn");
}

//do-what-it-says
//use fs node package to take text in random.txt and use it to call oneof Liri's commands

//const fs = require('fs');
//fs.readFile('./random.txt', 'utf-8', function (err, data) {
//    if (err) { return err; }
//    console.log('data: ', data);
//});

// The code will store the contents of the reading inside the variable "data"
// Then split it by commas (to make it more readable)

// should read spotify-this-song I Want it That Way

//edit random.txt to test movie-this and concert-this

//request NPM to access APIs

//request('http://www.google.com', function (error, response, body)//{
//    console.log('error:', error); // Print the error if one occurred
//    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//    console.log('body:', body); // Print the HTML for the Google homepage.
//});