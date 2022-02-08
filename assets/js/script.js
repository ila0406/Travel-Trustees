// variables

var search = $("#search-submit");
apiKey = "6201ca75706cee74ed57a823";
place = $("#search")
var locationDisplay = $("#location");


console.log("Hello!")


// events


// This is the event for when the user clicks on the search button
$(search).click(placeLookup);


// fetch api for country lookup function

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
    for (var i=0; i<data.suggestions.length; i++){
        var magicKey = data.suggestions[i].magicKey
        var country = document.getElementById("options").value;
        var apiUrl = "https://api.flightapi.io/nearby/" + apiKey + "?country=" + country + "&token=" + magicKey
        console.log(apiUrl);
        fetch(apiUrl)
        .then(response =>{
            if (response.ok){
                return response.json();
            }
        })
        .then(data => {
            var airports = data["Nearby Airports"][0].Code;
            console.log(airports);
            locationDisplay.textContent = data;
        })
    }

}


// Weather Information














//Covid Information
function displayCovid(data){
    var queryCovidURL = 'https://corona.lmao.ninja/v2/countries?yesterday=&sort=?&limit=1';
    //console.log(queryCovidURL);
    fetch(queryCovidURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        console.log(data);
        for(var i=0; i<data.length; i++){
            var searchCity = data[i].country;
            var searchTodayCount = data[i].todayCases;
            console.log(searchCity);
            console.log(searchTodayCount);
        }
    })
    return `<div class="">
    <div
        class="">
      <div>
        <div class="">${searchCity}</div>
          <p class="">
          </p>
          <p class="">${searchTodayCount}</p>
      </div>
  </div>`
  .join("");
}


//Crime Rates





























