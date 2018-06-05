import express from 'express'
import bodyParser from 'body-parser'
import https, { RequestOptions } from 'https'

const { apiKey }: {apiKey: string} = require('./config.json');

const url = "http://api.openweathermap.org/data/2.5/weather";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');
})

app.post('/', function (req, res) {
    res.render('index.ejs');
    console.log('first')
    GetWeather(req.body.city);
})

app.listen(3000, function () {
    console.log('Server started listening on port 3000!');
})

/*
 * Function that will get the weather information returned by the api
 */
function GetWeather(city: string)
{
    let options: RequestOptions =
    {
        host: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${city}${apiKey}`,
        method: 'GET',
        port: 443
    };

    try
    {
        console.log('asdhasd')
        var req = https.request(options, function(res) {
            console.log('thing')
            res.setEncoding('utf-8');
        
            let responseString = '';
        
            res.on('data', function(data) {
                responseString += data;
            });
        
            res.on('end', function() {
                console.log(responseString);
                let responseObject = JSON.parse(responseString);
            });
        });

        req.end();
    }
    catch(e)
    {
        console.log(e);
    }
}