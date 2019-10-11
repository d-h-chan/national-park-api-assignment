'use strict';

const apiKey = 'h3PW0qyOJxcn68Ee806q8RtYjsgoctZNPW48gxeE'; 
const url = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults (responseJson) {
  let arrResults = responseJson.data;
  $('#results-list').empty();
  
  for (let i = 0; i < arrResults.length ; i++){

    $('#results-list').append(
      `<li><h3><a href="${arrResults[i].url}" target="_blank">${arrResults[i].name}</a></h3>
      <p>${arrResults[i].description}</p>
      </li>`
    );
  } 
  //display the results section  
  $('#results').removeClass('hidden');
}

function getSearchResults(searchTerm,maxResults) {

    let params = {
      "stateCode": searchTerm,
      "limit": maxResults,
      "api_key": apiKey
  };

  let fullUrl = url + "?" + formatQueryParams(params);
  
    fetch(fullUrl)
    .then(response => {
      if (response.ok) {
          return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getSearchResults(searchTerm,maxResults);
  });
}

$(watchForm());
