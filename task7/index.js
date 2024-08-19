document.addEventListener('DOMContentLoaded',() => {
    let characterList = document.getElementById('character-list');
    let characterModal = document.getElementById('character-modal');
    let closeBtn = document.querySelector('.close-btn');
    let modalBody = document.getElementById('modal-body');

    async function getData() {
        try{
            let response = await fetch('https://rickandmortyapi.com/api/character');
            let character = await response.json();
            createCard(character.results);
        } catch(error) {
            console.error('Error fetching characters:', error);
        }
    }
    function createCard(characters){
        characters.forEach(character => {
            let card = document.createElement('div')
            card.classList.add('character-card');
            card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
        `;
        card.addEventListener('click', () => modal(character));
        characterList.appendChild(card)

        });

    }
    function modal(character) {
        modalBody.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
            <p><strong>Location:</strong> ${character.location.name}</p>
        `;
        characterModal.style.display = 'flex';
    }
    closeBtn.addEventListener('click', () => {
        characterModal.style.display = 'none';
    })
    getData()
})