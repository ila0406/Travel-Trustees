// variables

var search = $("#search-submit");
apiKey = '61fececece579974df99276a';
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
        var country = "UK"
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















