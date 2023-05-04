"use strict";

print("hello");

import { select, print } from "./utils.js";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  mode: "cors",
};

const url = "./assets/script/movies.json";

async function getMovies() {
  try {
    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(`${response.statusText} ${response.status}`);

    const data = await response.json();
    const grid = select(".grid-box");
    console.log(grid);

    function get(array) {
      grid.innerHTML = "";

      array.forEach((element) => {
        grid.innerHTML += ` <div class="data">
               <div class="poster">
                 <img
                   src="${element.img}"
                   alt="movie-poster"
                 />
               </div>
               <p class="movie-title">${element.title}</p>
       `;
      });
    }
    get(data.movies);
  } catch (error) {
    print(error.message);
  }
}

getMovies();