var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var request = require('request');
//var assert = require('assert');
//var googleplaces = require('googleplaces');
var text_to_speech = new TextToSpeechV1 ({
    username: '318fe234-f034-4b26-8d0c-7b181c0084f5',
    password: '2bu1CzqikxsV'
});
//var config = require('../config.js');
var fs = require('fs');
var conversation = watson.conversation({
    username: '9caa628c-72c4-40b5-acb3-ebe23a14197c',
    password: 'RtW4nzC6Fl0H',
    version: 'v1',
    version_date: '2017-05-26'
});


//var googlePlaces = new googleplaces(config.apiKey, config.outputFormat);

/* GET home page. */

router.route('/')
    .get(function (req, res, next) {
        res.render('index', { title: 'test' });
        console.log("Reached endpoint /bot")

})
    .post(function (req, res) {
        var params = {};
        var query = req.body.query;

        console.log("Text sent by user: "+query);
		var text_to_send;
		text_to_send = "Sorry, i didn't get that.";
		switch(query) {
			
			case "Hi":
			text_to_send = "Hello and welcome to Lit";
			break;
			
			case "q1":
			text_to_send = "Please select the car";
			break;
			
			case "q2":
			text_to_send = "Please select the house";
			break;
			
			case "q3":
			text_to_send = "Please select the plane";
			break;
			
			case "q4":
			text_to_send = "Please select the train";
			break;
			
			case "A":
			case "a":
			text_to_send = "This is the letter 'A' and is pronounced 'ahh'";
			break;
			
			case "B":
			case "b":
			text_to_send = "This is the letter 'B' and is pronounced 'buh'";
			break;
			
			case "C":
			case "c":
			text_to_send = "This is the letter 'C' and is pronounced 'cuh'";
			break;
		}
		params = {
			text: text_to_send,
			voice: 'en-US_AllisonVoice',
			accept: 'audio/mp3'
		};
		text_to_speech.synthesize(params).on('error', function(error) {
			console.log('Error:', error);
		}).pipe(fs.createWriteStream('public/voice.mp3')).on('finish', function () {
			console.log("Finished writing the file");
			res.json({
			  "audio-file": "check the audio file"
			});
		});



    });





module.exports = router;
