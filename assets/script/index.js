"use strict";

import { select, print } from "./utils.js";



const search = document.getElementsByClassName("search");


 
const movieNames = [
  "Jurassic Park","Eternals","The Matrix","JFK",
  "The Lord of the Rings: The Fellowship of the Ring",
  "No Time to Die","The Batman","Rocky","The Exorcist",
  "West Side Story","The Lion King","Gone in 60 Seconds",
  "Titanic","The Godfather","The Remains of the Day"
]

// const movieNames = cities.results[0].title

const movieNamesSort = movieNames.sort();
console.log(movieNamesSort);

const mList = document.getElementById("movies-list")

let sortedNames = movieNames.sort();
//reference
let input = document.getElementById("movies-list");
//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string
    if (
      i.toLowerCase().includes(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substring(0, input.value.length) + "</b>";
      word += i.substring(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});


function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  mode: "no-cors",
};

const movies = "./assets/script/movies.json";
const cities = "./assets/script/cities.json";

async function getMovies() {
  try {
    const response = await fetch(movies, options);

    if (!response.ok)
      throw new Error(`${response.statusText} ${response.status}`);

    const data = await response.json();
    const grid = select(".grid-container");

    function get(array) {
      grid.innerHTML = "";

      array.forEach((element) => {
        grid.innerHTML += ` <div class="grid-item">
               <div class="poster">
                 <img
                   src="${element.img}"
                   alt="movie-poster"
                 />
               </div>
               <p class="movie-title"><strong>${element.title}</strong><br>(${element.year})</p>
       `;
      });
    }
    get(data.results);
  } catch (error) {
    print(error.message);
  }
}

getMovies();