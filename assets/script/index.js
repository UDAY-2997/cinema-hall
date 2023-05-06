"use strict";




import { select, print, onEvent } from "./utils.js";




const moviesInput = select(".search-movie");

const cityInput = select(".search-city");

const listMovies = select(".completion-M");

const listCities = select(".completion-C");




moviesInput.value = "";

cityInput.value = "";




const moviesData = "./assets/script/movies.json";

const citiesData = "./assets/script/cities.json";




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

 const data = await fetchJson(moviesData);

 const grid = select(".grid-container");




 function getInfo(array) {

  grid.innerHTML = "";




  const rawHtml = array.map((element) => {

   return ` <div class="grid-item">

    <div class="poster">

     <img src="${element.img}" alt="movie-poster" />

    </div>

    <p class="movie-title"><strong>${element.title}</strong><br>(${element.year})</p>

   </div>`;

  }).join('');




  grid.innerHTML = rawHtml;

 }

 getInfo(data.results);




 function autoInputs(array, input, list) {

  onEvent(input, "keyup", function () {

   let inputValue = input.value.toLowerCase();

   removeDropdown(input, list);




   if (inputValue.length === 0) return;




   const matchingTitles = array.filter((el) => el.title.toLowerCase().startsWith(inputValue)).map((el) => el.title);




   const rawTitles = matchingTitles.map((title) => `<li>${title}</li>`).join('');




   list.innerHTML = rawTitles;

  });

 }

 autoInputs(data.results, moviesInput, listMovies);

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




onEvent(listMovies, "click", onItemClick.bind(moviesInput));

onEvent(listCities, "click", onItemClick.bind(cityInput));




async function getCities() {

 const data = await fetchJson(citiesData);




 function autoInput(array, input, list) {

  onEvent(input, "keyup", function () {

   let inputValue = input.value.toLowerCase();




   if (inputValue.length === 0) return;

  

   const matchingNames = array.filter((el) => el.name.toLowerCase().startsWith(inputValue)).map((el) => el.name);

   // const matchingAbbr = array.filter((el) => el.abbreviation.toLowerCase().startsWith(inputValue)).map((el) => el.abbreviation);




   const rawNames = matchingNames.map((name) => `<li>${name}</li>`).join('');

   // const rawAbbr = matchingAbbr.map((abbreviation) => `<li>${abbreviation}</li>`).join('');




   list.innerHTML = rawNames;

   // list.innerHTML = rawAbbr;

  });

 }

 autoInput(data.cities, cityInput, listCities);

}




getCities();