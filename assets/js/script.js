// variables
var searchTextEl = document.querySelector('#search-text');
var searchContentEl = document.querySelector('#search-content');
var covidContentEl = document.querySelector('#covid-content');
var searchFormEl = document.querySelector('#search-form');
var searchCard = document.createElement('div');
var searchBody = document.createElement('ul');
var forecastCard = document.createElement('div');
var forecastBody = $('weather-content')
var travelInfoEl = document.querySelector('tbd-content');
var Localstorage = localStorage;
var cities = [];

var search = $('#search-submit');
geocodeApiKey = 'a19e123a3b1cf7f00d08b299db07954c';
apiKey = '37ee8ade-ff48-4981-9af3-394163c2c764';
place = $('#search')
var locationDisplay = $('#location');
locationNameSelector = $('#search');

var searchCountry;
distance = 50;

var resultsContainerEl = document.getElementById('results-container');
resultsContainerEl.setAttribute('class', 'hide');


// events


// This is the event for when the user clicks on the search button
$(search).click(geocode);
$(search).click(displayCovid);
$(search).click(travelInfo);

// Geocode API
function geocode(event){
    var cityName = locationNameSelector.val();
    console.log(cityName);
    limit = '1';
    var geocodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&' + 'limit=' + limit + '&appid=' + geocodeApiKey;
    console.log(geocodeUrl);
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            searchCountry=data[0].country; //Passing Country to Covid API
            console.log('This is the Country being used in Covid Function: ' + searchCountry);
            weatherSearch(data);
            nearbyAirports(data);
            resultsContainerEl.removeAttribute('class');
        })
    console.log('This is the Location name: ' +cityName);

        // Store searched cities in Local Storage for future use
        cities.push(cityName);
        //cities.push(locationNameS);
        localStorage.setItem('cities', JSON.stringify(cities));
        var citiesArray = JSON.parse(Localstorage.getItem('cities'));
    
        var cittiesList = document.querySelector('ul');
        var newCity = citiesArray.length - 1;   
        var listItem = document.createElement('button');
    
        listItem.textContent = citiesArray[newCity];
        cittiesList.appendChild(listItem);
        listItem.setAttribute('class','btn btnP btn-info btn-block');
        listItem.setAttribute('id','search');
    
    }


// gets nearby Airports from API endpoint
function nearbyAirports(data){
    lat = data[0].lat
    lon = data[0].lon
    airportsUrl = 'https://airlabs.co/api/v9/nearby?lat=' + lat + '&lng=' + lon + '&distance=' + distance + '&api_key=' + apiKey;
    console.log(airportsUrl);
    fetch(airportsUrl)
    .then(response => {
        if(response.ok)
        return response.json();
    })
    .then(data =>{
        console.log(data.response);

        searchBody.textContent = '';


        for (i=0; i<5; i++) {
            var airportName = data.response['airports'][i]['name']
            var bodyContentEl = document.createElement('li');
            $(bodyContentEl).text(airportName);
            searchBody.append(bodyContentEl);
        }
        searchCard.append(searchBody);
        searchContentEl.append(searchCard);




    
})
}


// Weather Information
function weatherSearch(data){
    var lat = data[0].lat;
    var lon = data[0].lon;
    weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + geocodeApiKey;
    fetch(weatherApiUrl)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(data =>{
        forecast(data)
    })
}

function forecast(data){
    for (i=0; i<5; i++){
        var cityName = locationNameSelector.val();
        forecastWicon = data['daily'][i]['weather'][0].icon;
        var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastWicon + '.png';

        forecastDay = data['daily'][i].dt;

        forecastWind = data['daily'][i].wind_speed;
        forecastTemp =  data['daily'][i].temp.max;
        forecastHumidity = data['daily'][i].humidity;

        forecastWiconEl = document.createElement('img');
        forecastDayEl = document.createElement('p');
        forecastTempEl = document.createElement('p');
        forecastWindEl = document.createElement('p');
        forecastHumidityEl = document.createElement('p');

        $(forecastWiconEl).attr('id', 'wicon');
        $(forecastWiconEl).attr('src', forecastIconUrl);
        $(forecastWiconEl).attr('alt', 'weather icon');

       $(forecastTempEl).text(`Temp ${forecastTemp} F`);
       $(forecastDayEl).text(` ${cityName}`);
       $(forecastWindEl).text(`Wind: ${forecastWind} MPH`);
       $(forecastHumidityEl).text(`Humidity ${forecastHumidity} %`);

        forecastCard.classList.add('forecastCard');
        forecastCard.append(forecastWiconEl);
        forecastCard.append(forecastDayEl);
        forecastCard.append(forecastTempEl);
        forecastCard.append(forecastWindEl);
        forecastCard.append(forecastHumidityEl);

       forecastBody.append(forecastCard);
       console.log(data['daily'][i])
    }
}


//Covid Information
function displayCovid(data){
    covidContentEl.innerHTML=''
    console.log(search);    
    var queryCovidURL = 'https://corona.lmao.ninja/v2/countries?yesterday=&sort=?&limit=1';
    var population = '';
    var casePerMillion = '';
    var todayCases = '';

    var covidCard = document.createElement('div')

    fetch(queryCovidURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        console.log(data);
        console.log('Output list of countries + covid cases')
        searchBody.textContent = '';

        if (searchCountry == 'US'){
            population = data[212]['population'];
            casePerMillion = data[212]['casesPerOneMillion'];
            todayCases = data[212]['todayCases'];


           var populationEl = document.createElement('p');
           var casePerMillionEl = document.createElement('p');
           var todayCasesEl = document.createElement('p');

            $(populationEl).text(`Population: ${population}`);
            $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
            $(todayCasesEl).text(`Todays Cases: ${todayCases}`);

            covidCard.append(populationEl);
            covidCard.append(casePerMillionEl);
            covidCard.append(todayCasesEl);
            covidContentEl.append(covidCard);
          
        }
        else if (searchCountry == 'GB'){
            population = data[211]['population'];
            casePerMillion = data[211]['casesPerOneMillion'];
            todayCases = data[211]['todayCases'];

            var populationEl = document.createElement('p');
            var casePerMillionEl = document.createElement('p');
            var todayCasesEl = document.createElement('p');
 
             $(populationEl).text(`Population: ${population}`);
             $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
             $(todayCasesEl).text(`Todays Cases: ${todayCases}`);
 
             covidCard.append(populationEl);
             covidCard.append(casePerMillionEl);
             covidCard.append(todayCasesEl);
             covidContentEl.append(covidCard);
        
        }
        else if (searchCountry == 'NZ'){
            population = data[146]['population'];
            casePerMillion = data[146]['casesPerOneMillion'];
            todayCases = data[146]['todayCases'];

            var populationEl = document.createElement('p');
            var casePerMillionEl = document.createElement('p');
            var todayCasesEl = document.createElement('p');
 
             $(populationEl).text(`Population: ${population}`);
             $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
             $(todayCasesEl).text(`Todays Cases: ${todayCases}`);
 
             covidCard.append(populationEl);
             covidCard.append(casePerMillionEl);
             covidCard.append(todayCasesEl);
             covidContentEl.append(covidCard);

        }
        else if (searchCountry == 'CA'){
            population = data[35]['population'];
            casePerMillion = data[35]['casesPerOneMillion'];
            todayCases = data[35]['todayCases'];

            var populationEl = document.createElement('p');
            var casePerMillionEl = document.createElement('p');
            var todayCasesEl = document.createElement('p');
 
             $(populationEl).text(`Population: ${population}`);
             $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
             $(todayCasesEl).text(`Todays Cases: ${todayCases}`);
 
             covidCard.append(populationEl);
             covidCard.append(casePerMillionEl);
             covidCard.append(todayCasesEl);
             covidContentEl.append(covidCard);

        }
        else if (searchCountry == 'MX'){
            population = data[132]['population'];
            casePerMillion = data[132]['casesPerOneMillion'];
            todayCases = data[132]['todayCases'];

            var populationEl = document.createElement('p');
            var casePerMillionEl = document.createElement('p');
            var todayCasesEl = document.createElement('p');
 
             $(populationEl).text(`Population: ${population}`);
             $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
             $(todayCasesEl).text(`Todays Cases: ${todayCases}`);
 
             covidCard.append(populationEl);
             covidCard.append(casePerMillionEl);
             covidCard.append(todayCasesEl);
             covidContentEl.append(covidCard);

        }

    })

}


//Travel Safety Advisory
function travelInfo(data){
    travelInfoEl.innerHTML= '';
    var travelInfoURL = 'https://www.travel-advisory.info/api?countrycode=US';
    var travelInfo = '';

    var travelCard = document.createElement('div');

    fetch(travelInfoURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        console.log(data);
        searchBody.innerHTML = '';

        if (searchCountry == 'US'){
            travelInfo = data["us"];


           var travelEl = document.createElement('p');

            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);

            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
          
        }

    });
}

// Clear Search History from Local Storage
function clearHistory() {
    window.localStorage.clear();
    window.location.reload();
}

document.getElementById('clear').onclick = clearHistory;