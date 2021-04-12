const searchForm = document.querySelector('form')
const serachResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = '';
const APP_ID = 'e4b13cb0';
const APP_KEY = '2958d2916effd050f6d6f6a252c9364d'


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI () {
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`
    const res = await fetch(baseUrl);
    const data = await res.json();
    generateHTML(data.hits)
    //console.log(data)
}

function generateHTML(results) {
    //conatiner.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target='_blank>View recepie</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No data found'}</p>
            <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    serachResultDiv.innerHTML = generatedHTML;
}