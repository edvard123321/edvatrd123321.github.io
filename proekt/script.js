let api_key = "api_key=9b702a6b89b0278738dab62417267c49";
let root = document.getElementById("root");
let search = document.getElementById("searchCont");
let categories = document.getElementById("categoria");
let id;

function getData(arr) {
  fetch("https://api.themoviedb.org/3/movie/popular?" + api_key)
    .then((response) => response.json())
    .then((response) => printCard(response.results))
    .catch((err) => console.error(err));
}

getData()

function printCard(arr) {
  if (arr.length !== 0) {
    arr.forEach((e) => {
      let card = document.createElement("a");
      card.href = `single.html?id=${e.id}`;
      card.classList.add("card");
      card.innerHTML = `
              <img src='https://image.tmdb.org/t/p/original/${e.poster_path}'/>
              <h2>${e.title}</h2>
              `;
      root.append(card);
    });
  }
}

let searchInp = document.getElementById("search_input");

let timerId;
searchInp.addEventListener("input", () => {
  if (searchInp.value.trim() != "") {
    root.innerHTML = "";
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInp.value.trim().replaceAll(" ", "+")}&${api_key}`)
        .then((res) => res.json())
        .then((res) => {
          printCard(res.results);
        });
    }, 1000);
  }
});

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("CONTEINER").style.display = "block";
  }, 100);
});
 
const options = { method: 'GET', headers: { accept: 'application/json' } };
let arr = []
fetch(` https://api.themoviedb.org/3/discover/movie?${api_key}&sort_by=release_date.desc&page=1,2&with_genres=${arr}`, options)
  .then(response => response.json())
  .then(response => categori(response.results))
  .catch(err => console.error(err));

function categori(array) {
  array.forEach((e) => {
    let cart = document.createElement('a')
    cart.classList.add('buttons')
    cart.innerHTML = `
      
        <button>${e.title}</button>
      `
    categories.append(cart)
    cart.addEventListener('click', () => {
      root.innerHTML = `
         <img src="https://image.tmdb.org/t/p/original/${e.poster_path}">
  <h2>${e.original_title}</h2>
      `
    })

  })

}

