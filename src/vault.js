
let vault = JSON.parse(localStorage.getItem("selectedAnimes")) || [];
const vaultFeeds = document.getElementById("selected-container")
const selectCrypto = document.getElementById('crypto-select')
const rentSummary = document.getElementById('rental-summary')
const connectWallet = document.getElementById('connect-wallet')
let checkoutFeeds = document.getElementById('checkout')




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
          <strong>Duration:</strong> ${anime.durationToRent || 1} day(s)
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
});



document.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){
        const animeId = e.target.dataset.id;
        vault = vault.filter(m=> m.id !== parseInt(animeId))
        localStorage.setItem("selectedAnimes", JSON.stringify(vault))

        const animeCard = document.getElementById(`anime-${animeId}`)
        if(animeCard) animeCard.remove()

          getTotalPrice()
    }})



async function getTotalPrice() {
    try {
      const vault = JSON.parse(localStorage.getItem("selectedAnimes")) || [];
      const totalNumberOfMovies = vault.length;
        const totalPriceInUSDT = vault.map(arr => parseFloat(arr.price)).reduce((a, b) => a + b, 0);
        const selectedCurrency = selectCrypto.value
        let sumaryHTLM =""

        const res = await fetch("https://api.coingecko.com/api/v3/coins/ethereum");

        if (!res.ok) {
            throw Error("Something wrong with server");
        }

        const data = await res.json();
        const priceInEth = data.tickers[0].last;
        const totalpriceInETH = (totalPriceInUSDT / priceInEth).toFixed(5);

        if(selectedCurrency === 'ETH'){
        sumaryHTLM =`
      <p><strong>Selected Currency:</strong> <span id="selected-currency">ETH</span></p>
      <p><strong>Number of Movies:</strong> <span id="movie-count">${totalNumberOfMovies}</span></p>
      <hr class="border-gray-600" />
      <p class="text-lg font-semibold">Total: <span id="total-cost">${totalpriceInETH}</span> <span id="currency-symbol-total">ETH</span></p>`
        }

        if(selectedCurrency === 'USDT'){
        sumaryHTLM =`
      <p><strong>Selected Currency:</strong> <span id="selected-currency">USDT</span></p>
      <p><strong>Number of Movies:</strong> <span id="movie-count">${totalNumberOfMovies}</span></p>
      <hr class="border-gray-600" />
      <p class="text-lg font-semibold">Total: <span id="total-cost">${totalPriceInUSDT}</span> <span id="currency-symbol-total">USDT</span></p>`
    }
    selectCrypto.addEventListener('change', getTotalPrice);
    rentSummary.innerHTML = sumaryHTLM

    } catch (err) {
        alert(err.message);
    }
}
getTotalPrice()

connectWallet.addEventListener('click', function(){
  setTimeout(() => {
    checkoutFeeds.innerHTML = `
      <div class="max-w-sm w-full mx-auto bg-white rounded-xl shadow-lg p-6 relative">
        <div class="flex justify-center mb-4">
          <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
        <div class="text-center space-y-2">
          <h2 class="text-lg font-semibold text-gray-800">Connection success!</h2>
          <p class="text-base font-medium text-gray-700">Your Chakra is Aligned<span class="font-bold">
            <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white confirm-btn">
        <i class="fa-solid fa-circle-check mr-2"></i> Confirm Checkout
      </button>
          </span></p>
        </div>
      </div>
    `;
  }, 1000);

})



 document.addEventListener('click',function(e){
  if(e.target.classList.contains('confirm-btn')){
    console.log("payed")
  }
 })
