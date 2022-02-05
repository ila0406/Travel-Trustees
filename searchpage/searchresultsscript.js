var resultText = document.querySelector("#result-text");
var resultContent = document.querySelector("#result-content");
var searchForm = document.querySelector("#search-form");

function printResults(travelSearch) {
  
    var searchResults = document.createElement('div');
    searchResults.classList.add('card');
  
    var searchCard = document.createElement('div');
    searchCard.classList.add('card-body');
    searchResults.append(searchCard);
  
    var cardTitle = document.createElement('h3');
    cardTitle.textContent = travelSearch.title;
  
    resultBody.append(cardTitle);
    resultContent.append(searchResults);
}

printResults(travelSearch);