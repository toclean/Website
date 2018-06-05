import express from 'express'
import bodyParser from 'body-parser'
import https, { RequestOptions } from 'https'

const url = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = '';

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
    let options: RequestOptions =
    {
        host: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${city}${apiKey}`,
        method: 'GET',
        headers: 
        {
            'Content': 'application/json'
        }
    };

    try
    {
        https.request(options, function(res) {
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
    }
    catch(e)
    {
        console.log(e);
    }
}