// variables

var search = $("#search-submit");
geocodeApiKey = "a19e123a3b1cf7f00d08b299db07954c";
apiKey = "6201ca75706cee74ed57a823";
place = $("#search")
var locationDisplay = $("#location");
locationNameSelector = $("#search");
// console.log("Hello!")
var searchCountry;


// events


// This is the event for when the user clicks on the search button
$(search).click(geocode);
$(search).click(displayCovid);

// Geocode API
function geocode(event){
    var cityName = locationNameSelector.val();
    console.log(cityName);
    limit = "1";
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + geocodeApiKey;
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
    
        })
    
    
    }

function placeLookup (event){
    event.preventDefault();
    var searchPlace = place.val();
    var apiUrl = "https://api.flightapi.io/place/" + apiKey + "/" + searchPlace;
    alert(apiUrl);
    fetch(apiUrl)
        .then(response =>{
            if (response.ok){
                return response.json();
            }
        })
        .then(data => {
            displayAirport(data);
        })

     
    }

// display places that have been requested

function displayAirport(data){
    // for (var i=0; i<data.suggestions.length; i++){
        var magicKey = data.suggestions[0].magicKey
        var country = document.getElementById("options").value;
        console.log(country);
        var apiUrl = "https://api.flightapi.io/nearby/" + apiKey + "?country=" + country + "&token=" + magicKey
        console.log(apiUrl);
        fetch(apiUrl)
        .then(response =>{
            if (response.ok){
                return response.json();
            }
        })
        .then(data => {
            var airports = data["Nearby Airports"];
            console.log(airports);
            locationDisplay.textContent = data;
        })
    // }

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





























