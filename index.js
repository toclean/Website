"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var https_1 = __importDefault(require("https"));
var url = "http://api.openweathermap.org/data/2.5/weather";
var apiKey = '&appid=c04bba6a523dae9ad579adf96d90a6d4';
var app = express_1.default();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/', function (req, res) {
    res.render('index.ejs');
    GetWeather(req.body.city);
});
app.listen(3000, function () {
    console.log('Server started listening on port 3000!');
});
/*
 * Function that will get the weather information returned by the api
 */
function GetWeather(city) {
    var options = {
        host: 'api.openweathermap.org',
        path: "/data/2.5/weather?q=" + city + apiKey,
        method: 'GET',
        headers: {
            'Content': 'application/json'
        }
    };
    try {
        https_1.default.request(options, function (res) {
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', function (data) {
                responseString += data;
            });
            res.on('end', function () {
                console.log(responseString);
                var responseObject = JSON.parse(responseString);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
