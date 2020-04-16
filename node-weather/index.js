const request = require('request');
const argv = require('yargs').argv;

let apiKey = '1774a46e88538a673493391ea41c45bf';
let city = argv.c || 'san jose';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
  	let weather = JSON.parse(body);
  	let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
	console.log(message);
  }
});