"use strict";

const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#result-artist");
const recommended = document.querySelector("#result-playlists");

/**
 * Faz a busca na api por um termo e mostra resultados
 * @param {String} query
 */
function requestAPI(query) {
  const result = fetch(`http://localhost:8008/artists?name_like=${query}`);
  result
    .then((response) => {
      console.log(response);
      return response.json();
    })
    // .then((data) => console.log(data))
    .then((data) => displayResults(data))
    .catch((err) => console.log(err));
}

/**
 * Mostra o resultado da busca
 * @param {Object} result
 */
function displayResults(result) {
  recommended.classList.add("hidden");
  const artistName = document.querySelector("#artist-name");
  const artistImage = document.querySelector("#artist-img");

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
  });

  searchResults.classList.remove("hidden");
}

/**
 * Esconde o resultado das buscas
 */
function hideResults() {
  searchResults.classList.add("hidden");
  recommended.classList.remove("hidden");
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  if (value === "") {
    hideResults();
    return;
  }

  requestAPI(value);
});
