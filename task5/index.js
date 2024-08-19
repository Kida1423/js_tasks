document.addEventListener('DOMContentLoaded',() => {
    let list = document.getElementById('list')
    const preloader = document.getElementById('preloader');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pokemonInfo = document.getElementById('pokemon-info');

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let previousUrl = null;
    let nextUrl = null;

    async function getData(url) {
        list.innerHTML = ''; 

        let getName = await fetch(url)
        let namePoc = await getName.json()
        previousUrl = namePoc.previous;
        nextUrl = namePoc.next;
        updatePaginationButtons();

        let pokemons = await namePoc.results
        pokemons.forEach(pokemon => {
            
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            listItem.classList.add('pokemon-item');
            listItem.addEventListener('click', () => {
                preloader.style.display = 'flex';
                fetchPokemonInfo(pokemon.url);
            });
            list.appendChild(listItem);
        });
    }
    async function fetchPokemonInfo(url) {
        const response = await fetch(url);
        const pokemon = await response.json();
        const pokemonInfo = document.getElementById('pokemon-info');
        pokemonInfo.innerHTML = `
            <h2>Name: ${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>Height: ${pokemon.height / 10} m</p>
            <p>Weight: ${pokemon.weight / 10} kg</p>
        `;
        preloader.style.display = 'none';

    }
    function updatePaginationButtons() {
        prevButton.disabled = !previousUrl;
        nextButton.disabled = !nextUrl;
    }

    prevButton.addEventListener('click', () => {
        if (previousUrl) {
            getData(previousUrl);
        }
    });

    nextButton.addEventListener('click', () => {
        if (nextUrl) {
            getData(nextUrl);
        }
    });
    getData(apiUrl)
})