// variables

var search = $("#search-submit");
apiKey = '61fececece579974df99276a';
place = $("#search")
var locationDisplay = $("#location");


console.log("Hello!")


// events


// This is the event for when the user clicks on the search button
$(search).click(placeLookup);














// functions
// ---------------------------------------------------------------- //


// var getPlace = function (user) {
//     var apiUrl = 'https://api.flightapi.io/place/' + apiKey + place;
  
//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function (data) {
//             console.log(data);
//             displayPlace(data, user);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to GitHub');
//       });
//   };



// fetch api for country lookup function

function placeLookup (event){
    event.preventDefault();
    var searchPlace = place.val();
    var apiUrl = "https://api.flightapi.io/place/" + apiKey + "/" + searchPlace;
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
        var country = "UK"
        var apiUrl = "https://api.flightapi.io/nearby/" + apiKey + "?country=" + country + "&token=" + magicKey
        // console.log(apiUrl);
        fetch(apiUrl)
        .then(response =>{
            if (response.ok){
                return response.json();
            }
        })
        .then(data => {
            for (var i=0; i<data["Nearby Airports"].length; i++){
            var localAirport = data["Nearby Airports"][i].Airport;
            console.log(localAirport);
            }
        })
    // }

}


// var airports = data["Nearby Airports"][0].Airports;












