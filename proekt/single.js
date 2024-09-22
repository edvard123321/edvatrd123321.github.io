let api_key = "api_key=9b702a6b89b0278738dab62417267c49";
let thisProdId = location.search.split("?").find((e) => e.startsWith("id")).slice(3);
console.log(thisProdId);
fetch(`https://api.themoviedb.org/3/movie/${thisProdId}?` + api_key)
  .then((res) => res.json())
  .then((res) => printTab(res))
  .catch((eror) => console.log(eror));

let root = document.getElementById("root");

function printTab(arr) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${arr.backdrop_path}')`;
  card.innerHTML = `
    <div class='h'>
    <img src='https://image.tmdb.org/t/p/original${arr.poster_path}'/>
    </div> 
    <div class='c'>
        <h2>${arr.original_title}</h2>
        <p>  ${arr.overview}      </p>    
    </div>     
    `;
  root.append(card);
}

fetch(`https://api.themoviedb.org/3/movie/${thisProdId}/credits?` + api_key)
  .then((response) => response.json())
  .then((resp) => allActors(resp.cast))
  .catch((err) => console.error(err));

let actors = document.getElementById("actors");

function allActors(arr) {
  arr = arr.forEach((e) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original/${e.profile_path}">  
        <h2>${e.original_name}</h2>
  `;
    actors.append(card);
  });
}

fetch(`https://api.themoviedb.org/3/movie/${thisProdId}/videos?` + api_key)
  .then((response) => response.json())
  .then((resp) => allVideo(resp.results))
  .catch((err) => console.error(err));

let videos = document.getElementById("videos");

function allVideo(arr) {
  arr = arr.forEach((e) => {
    let video = document.createElement("div");
    let popup = document.createElement('div')
    video.classList.add("video");
    video.innerHTML = `
    <div id="popup">

        </div>
    <div class='videoner'> 
     
    <iframe id="iframeId" 
                width="800"  
                height="600"  
                src="https://www.youtube.com/embed/${e.key}"  
                title="YouTube video player"  
                frameborder="0"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  
                referrerpolicy="strict-origin-when-cross-origin"  
allowfullscreen>  
    </iframe>
        
      </div>
    `;
    videos.append(video);
    popup.addEventListener('click', ()=>{
      body.style.backgroundColor = "red"
    })
  });

}


  


window.addEventListener('load', function() {
  setTimeout(function() {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('CONTEINER').style.display = 'block';
  }, 100);
});