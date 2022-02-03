// variables

var search = $("#search-submit");
apiKey = '61fb35cdce579974df992768';
place = $("#search")



console.log("Hello!")


// events


// This is the event for when the user clicks on the search button
$(search).click(placeLookup);





// functions
// ---------------------------------------------------------------- //


var getPlace = function (user) {
    var apiUrl = 'https://api.flightapi.io/place/' + apiKey + place;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayPlace(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };



// fetch api for country lookup function

function placeLookup(event){
    event.preventDefault();
    var searchPlace = place.val();
    var apiUrl = "https://api.flightapi.io/place/" + apiKey + "/" + searchPlace;
    alert(apiUrl);
    fetch(apiUrl)
     .then(function (response){
        if(response.ok){
           return response.json();
        }
     }
     .then(function (data) {
        console.log(data);
        // displayPlace(data);
    })
     )};

// display places that have been requested

function displayPlace(){

    $("#test").val(response)

}