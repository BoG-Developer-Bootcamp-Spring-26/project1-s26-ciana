const incButton = document.getElementById("inc-button");
const decButton = document.getElementById("dec-button");
let id= 100;

fetchPokemon(id);

incButton.addEventListener("click", async (event) => {
    fetchPokemon(++id);
});

decButton.addEventListener("click", async (event) => {
    if(id > 0) {
        fetchPokemon(--id);
    }

});

async function fetchPokemon(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();

    const pokeImage = document.getElementById("pokemon-img");
    pokeImage.src = data.sprites.front_shiny;

    const nameText= document.getElementById("pokemon-name");
    nameText.textContent = data.name;

    const pokeType = document.getElementById("types");
    pokeType.textContent = data.types.map( (type) => {
        return type.type.name;
    })

    const infoButton = document.getElementById("info-button");
    infoButton.addEventListener("click")
    const movesButton = document.getElementById("moves-button");
}
