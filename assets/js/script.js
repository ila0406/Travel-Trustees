// variables
var searchTextEl = document.querySelector('#search-text');
var searchContentEl = document.querySelector('#search-content');
var searchFormEl = document.querySelector('#search-form');

var search = $("#search-submit");
geocodeApiKey = "a19e123a3b1cf7f00d08b299db07954c";
apiKey = "37ee8ade-ff48-4981-9af3-394163c2c764";
place = $("#search")
var locationDisplay = $("#location");
locationNameSelector = $("#search");

var searchCountry;
console.log("Hello!")
distance = 50;

var resultsContainerEl = document.getElementById('results-container');
resultsContainerEl.setAttribute('class', 'hide');


// events


// This is the event for when the user clicks on the search button
$(search).click(geocode);
$(search).click(displayCovid);

// Geocode API
function geocode(event){
    var cityName = locationNameSelector.val();
    console.log(cityName);
    limit = "1";
    var geocodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + geocodeApiKey;
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
            nearbyAirports(data);
            resultsContainerEl.removeAttribute('class');
        })
    
    
    }


// gets nearby Airports from API endpoint

function nearbyAirports(data){
    lat = data[0].lat
    lon = data[0].lon
    airportsUrl = "https://airlabs.co/api/v9/nearby?lat=" + lat + "&lng=" + lon + "&distance=" + distance + "&api_key=" + apiKey;
    console.log(airportsUrl);
    fetch(airportsUrl)
    .then(response => {
        if(response.ok)
        return response.json();
    })
    .then(data =>{
        console.log(data.response);
        var searchCard = document.createElement('div');
        var searchBody = document.createElement('ul');
        var airport = data.response["airports"]

        searchCard.classList.add('card',);
        searchBody.classList.add('card-body');


        for (i=0; i<airport.length; i++) {
            var airportName = data.response["airports"][i]["name"]
            var bodyContentEl = document.createElement('li');
            $(bodyContentEl).text(airportName);
            searchBody.append(bodyContentEl);
        }
        searchCard.append(searchBody);
        searchContentEl.append(searchCard);




    
})
}




// Weather Information














//Covid Information
function displayCovid(data){
    var searchCity = '';
    var searchTodayCount = '';
    // console.log(search);    
    var queryCovidURL = 'https://corona.lmao.ninja/v2/countries?yesterday=&sort=?&limit=1';

    fetch(queryCovidURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        // console.log(data);
        console.log('Output list of countries + covid cases')
        for(var i=0; i<data.length; i++) {
            searchCity = data[i].country;
            searchTodayCount = data[i].todayCases;
            console.log(searchCity);
            console.log(searchTodayCount);
        }
        if (searchCountry == 'US'){
          
        }
        else if (searchCountry == 'GB'){
        
        }
        else if (searchCountry == 'NZ'){

        }
        else if (searchCountry == 'CA'){

        }
        else if (searchCountry == 'MX'){

        }
        else    {
        }
    })
//     return `<div class="">
//     <div
//         class="">
//       <div>
//         <div class="">${searchCity}</div>
//           <p class="">
//           </p>
//           <p class="">${searchTodayCount}</p>
//       </div>
//   </div>`
//   .join("");
}


//Crime Rates





























