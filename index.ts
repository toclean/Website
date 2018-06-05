import express from 'express';
import bodyParser from 'body-parser';
import https, { RequestOptions } from 'https';

const { apiKey }: {apiKey: string} = require('./config.json');

const url = 'http://api.openweathermap.org/data/2.5/weather';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');
})

app.post('/', function (req, res) {
    res.render('index.ejs');
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
    let responseString = '';

    let options: RequestOptions =
    {
        host: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${city}&APPID=${apiKey}`,
        method: 'GET',
        port: 443
    };

    try
    {
        var req = https.request(options, (res) => 
        {
            res.setEncoding('utf-8');
        
            res.on('data', (data) =>
            {
                responseString += data;
            });
        
            res.on('end', () =>
            {
                let responseObject = JSON.parse(responseString);
                console.log(`City: ${responseObject.name}`);
                console.log(`Country: ${responseObject.sys.country}`);
                console.log('Temperature: ' + KelvinToF(responseObject.main.temp).toString() + ' F');
            });
        });

        req.end();
    }
    catch(e)
    {
        console.log(e);
    }
}

function KelvinToF(kelvin: string): number
{
    return parseFloat(((parseFloat(kelvin) * (9/5)) - 459.67).toFixed(2));
}