const searchEl = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const Moviecontainer = document.getElementById('movies-container')

function displayCard(anime) {
  const genres = anime.genres.join(", ");
  const synopsis = anime.synopsis
    ? anime.synopsis.slice(0, 100) + "..."
    : "No synopsis available";

  return `
    <div class="bg-white shadow-md rounded-xl overflow-hidden flex flex-col w-[20rem] text-sm">
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

        <!-- Price Display -->
        <p class="text-sm text-gray-700">
          <strong>Price:</strong> <span id="price-${anime.id}">₦0.00</span>
        </p>

        <!-- Add Button -->
        <button 
          data-id="${anime.id}" 
          class="add-btn mt-2 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg transition">
          Add to Vault
        </button>
      </div>
    </div>
  `;
}




searchBtn.addEventListener('click',  async function(){
    try {
const query = searchEl.value.trim();
searchEl.value = ''
const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
if (!res.ok){
    throw Error('something went wrong')
}
const data = await res.json();
console.log(data)
class Anime{
    constructor(id, title, image, score, genres, synopsis){
    this.id = id;
    this.title = title;
    this.image = image;
    this.score = score;
    this.genres = genres;
    this.synopsis = synopsis;
    }
}

const animeList = data.data.filter(item => item.images && item.images.jpg).map(item => {
    return new Anime(
        item.mal_id,
        item.title,
        item.images.jpg.image_url
,
        item.score,
        item.genres.map(g => g.name),
        item.synopsis
    );
    
});
Moviecontainer.innerHTML = animeList.map(animes => displayCard(animes)).join('')

    }

    catch(err){ alert (err.message)
}
}) 


function determineRentPrice(){
const defautlPrice = 0.00013;
const genereArr = ["Action", "Commedy"]
const valueOfAction = genereArr.indexOf("Action") + 0.0002 ;
const valueOfCommedy = genereArr.indexOf("Commedy") * 0.0001
console.log(valueOfAction)
console.log(valueOfCommedy)
// console.log(valueOfAction + valueOfCommedy)
}
determineRentPrice()