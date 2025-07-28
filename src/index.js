const searchEl = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const Moviecontainer = document.getElementById('movies-container')
const storedList = JSON.parse(localStorage.getItem("Anime"));
let animeList


function determineRentPrice(anime, durationToRent = 1){
const defaultPrice = 0.5;
const hasAction = anime.genres.includes("Action");
const hasComedy = anime.genres.includes("Comedy")
let extra = 0;


if(hasAction){
    extra += 0.3
}
if(hasComedy){
    extra += 0.15
}

let total = (defaultPrice + extra) * durationToRent
return total.toFixed(2)
}

function displayCard(anime) {
  const genres = anime.genres.join(",");
  const synopsis = anime.synopsis
    ? anime.synopsis.slice(0, 100) + "..."
    : "No synopsis available";

    const price = determineRentPrice(anime, 1)

  return `
    <div id="anime-card-${anime.id}" class="bg-white shadow-md rounded-xl overflow-hidden flex flex-col w-[18rem] text-sm">
      <img src="${anime.image}" alt="${anime.title}" class="w-full h-44 object-cover">
      <div class="px-3 py-2 space-y-2">
        <h2 class="font-semibold text-base leading-tight">${anime.title}</h2>
        <p class="text-gray-600 leading-snug">${synopsis}</p>
        <p class="text-gray-500"><strong>Genres:</strong> ${genres}</p>
        <p class="text-gray-500"><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
        <div class="flex items-center text-sm text-black">
          <label for="rental-days-${anime.id}" class="mr-2 font-medium">Duration(days):</label>
          <input 
            type="number" 
            id="rental-days-${anime.id}"
            name="rental-days-${anime.id}"
            min="1" 
            max="7" 
            value="1"
            class="border-gray-300 rounded px-2 py-1 w-16 text-sm"
          />
        </div>

        <p class="text-sm text-gray-700">
          <strong>Price:</strong> <span id="price-${anime.id}">$${price}</span>
        </p>

        <button 
          data-id="${anime.id}" 
          class="add-btn mt-2 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg transition">
          Add to Vault
        </button>
      </div>
    </div>
  `;
}
if(searchBtn){
  searchBtn.addEventListener('click',  async function(){
    try {
const query = searchEl.value.trim();
searchEl.value = ''
const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
if (!res.ok){
    throw Error('something went wrong')
}
const data = await res.json();
class Anime{
    constructor(id, title, image, score, genres, synopsis,price,durationToRent){
    this.id = id;
    this.title = title;
    this.image = image;
    this.score = score;
    this.genres = genres;
    this.synopsis = synopsis;
    this.price = price
    this.durationToRent = durationToRent
    }
}

animeList = data.data.map(item => {
  const genres= item.genres.map(g => g.name)
  const defaultDuration = 1
  const price = determineRentPrice({genres: item.genres.map(g => g.name)}, defaultDuration);
    return new Anime(
        item.mal_id,
        item.title,
        item.images.jpg.image_url,
        item.score,
        genres,
        item.synopsis,
        price,
        defaultDuration
    );
});

Moviecontainer.innerHTML = animeList.map(animes => displayCard(animes)).join('')


  animeList.forEach(anime => {
    const input = document.getElementById(`rental-days-${anime.id}`);
    const priceEl = document.getElementById(`price-${anime.id}`);

    if (input && priceEl) {
      input.addEventListener('input', () => {
        let duration = Number(input.value) || 1;
        let newPrice = determineRentPrice(anime, duration)
        priceEl.textContent = newPrice;

        anime.price = newPrice;
        anime.durationToRent = duration
      });
    }
  });

 }

    catch(err){ alert (err.message)
}

});
}


document.addEventListener("click", function(e){
    if(e.target.classList.contains("add-btn")) {
        const animeId = e.target.dataset.id
        const selectedAnime = animeList.find(m => m.id === parseInt(animeId))
        const card = document.getElementById(`anime-card-${animeId}`);
      

        const stored = JSON.parse(localStorage.getItem("selectedAnimes")) || []
        const alreadyExist = stored.find(anime => anime.id === selectedAnime.id)
        if(alreadyExist){
        return alert("This anime is already in your vault.");
        }
        stored.push(selectedAnime)
        localStorage.setItem("selectedAnimes", JSON.stringify(stored))
        alert("Anime added to vault.")
    
        if (card) {
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
        }
    }
})