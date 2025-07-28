
const vault = JSON.parse(localStorage.getItem("selectedAnimes")) || [];
const vaultFeeds = document.getElementById("selected-container")

function displayCardVault(anime) {
  const genres = anime.genres.join(",");
  const synopsis = anime.synopsis
    ? anime.synopsis.slice(0, 100) + "..."
    : "No synopsis available";

  return `
    <div class="bg-white shadow-md rounded-xl overflow-hidden flex flex-col w-[18rem] text-sm" id="anime-${anime.id}">
      <img src="${anime.image}" alt="${anime.title}" class="w-full h-44 object-cover">
      <div class="px-3 py-2 space-y-2">
        <h2 class="font-semibold text-base leading-tight">${anime.title}</h2>
        <p class="text-gray-600 leading-snug">${synopsis}</p>
        <p class="text-gray-500"><strong>Genres:</strong> ${genres}</p>
        <p class="text-gray-500"><strong>Score:</strong> ${anime.score ?? "N/A"}</p>

        <p class="text-sm text-black">
          <strong>Duration:</strong> ${anime.duration || 1} day(s)
        </p>

        <p class="text-sm text-gray-700">
          <strong>Price:</strong> $${anime.price}
        </p>

        <button 
          data-id="${anime.id}" 
          class="delete-btn mt-2 text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition">
          Delete from Vault
        </button>
      </div>
    </div>
  `;
}


vault.forEach(anime => {
 vaultFeeds.innerHTML += displayCardVault(anime)
    console.log(anime)
});