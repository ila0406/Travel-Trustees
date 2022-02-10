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
        console.log(data.response);//["airports"][0]["name"]);
        var searchCard = document.createElement('div');
        searchCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
      
        var searchBody = document.createElement('div');
        searchBody.classList.add('card-body');
        searchCard.append(searchBody);
      
        var titleEl = document.createElement('h3');
        titleEl.textContent = data[1];
      
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML = '<strong>Subjects:</strong> ' + data[1] + '<br/>';
                
        searchBody.append(titleEl, bodyContentEl);

        searchContentEl.append(searchCard);
    })


}

// function placeLookup (event){
//     event.preventDefault();
//     var searchPlace = place.val();
//     var apiUrl = "https://api.flightapi.io/place/" + apiKey + "/" + searchPlace;
//     alert(apiUrl);
//     fetch(apiUrl)
//         .then(response =>{
//             if (response.ok){
//                 return response.json();
//             }
//         })
//         .then(data => {
//             displayAirport(data);
//         })

     
//     }

// display places that have been requested


// function displayAirport(data){
//     // for (var i=0; i<data.suggestions.length; i++){
//         var magicKey = data.suggestions[0].magicKey
//         var country = document.getElementById("options").value;
//         console.log(country);
//         var apiUrl = "https://api.flightapi.io/nearby/" + apiKey + "?country=" + country + "&token=" + magicKey
//         console.log(apiUrl);
//         fetch(apiUrl)
//         .then(response =>{
//             if (response.ok){
//                 return response.json();
//             }
//         })
//         .then(data => {
//             var airports = data["Nearby Airports"];
//             console.log(airports);
//             locationDisplay.textContent = data;
//         })
//     // }

// }


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





























