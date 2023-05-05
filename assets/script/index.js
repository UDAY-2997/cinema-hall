"use strict";

import { select, print, onEvent } from "./utils.js";

const moviesInput = select(".search-movie");
const cityInput = select(".search-city");
let listmovies = select(".movie-completion");
let listCities = select(".city-completion");

moviesInput.value = "";
cityInput.value = "";

const moviesUrl = "./assets/script/movies.json";
const citiesUrl = "./assets/script/cities.json";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  mode: "cors",
};

async function fetchJson(url) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    print(error.message);
  }
}

async function getMovies() {
  const data = await fetchJson(moviesUrl);
  const grid = select(".grid-container");

  function getInfo(array) {
    grid.innerHTML = "";

    array.forEach((element) => {
      grid.innerHTML += ` <div class="grid-item">
        <div class="poster">
          <img src="${element.img}" alt="movie-poster" />
        </div>
        <p class="movie-title"><strong>${element.title}</strong><br>(${element.year})</p>
      </div>`;
    });
  }
  getInfo(data.results);

  function autoInputs(array, input, list) {
    onEvent(input, "keyup", function () {
      let inputValue = input.value.toLowerCase();
      removeDropdown(input, list);

      if (inputValue.length === 0) return;

      list.innerHTML = " ";

      array.forEach((el) => {
        if (el.title.toLowerCase().startsWith(inputValue)) {
          list.innerHTML += `<li>${el.title}</li>`;
        }
      });
    });
  }
  autoInputs(data.results, moviesInput, listmovies);
}

getMovies();

function removeDropdown(input, list) {
  if (input.value.length === 0) list.innerHTML = "";
}

function onItemClick(e) {
  e.preventDefault();

  const click = e.target;
  this.value = click.innerHTML;
  this.nextElementSibling.innerHTML = "";
}

onEvent(listmovies, "click", onItemClick.bind(moviesInput));
onEvent(listCities, "click", onItemClick.bind(cityInput));

async function getCities() {
  const data = await fetchJson(citiesUrl);

  function autoInput(array, input, list) {
    onEvent(input, "keyup", function () {
      let inputValue = input.value.toLowerCase();

      if (inputValue.length === 0) return;

      list.innerHTML = " ";

      array.forEach((el) => {
        if (el.name.toLowerCase().startsWith(inputValue)) {
          list.innerHTML += `<li>${el.name}</li>`;
        }
      });
    });
  }
  autoInput(data.cities, cityInput, listCities);
}

getCities();
