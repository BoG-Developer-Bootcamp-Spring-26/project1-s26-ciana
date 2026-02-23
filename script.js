let id= 100;
let data = null;
let panel = true;
const statType = document.getElementById("stat-type");
const statInfo = document.getElementById("stat-info");
const incButton = document.getElementById("inc-button");
const decButton = document.getElementById("dec-button");

const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");

fetchPokemon(id);

incButton.addEventListener("click", async (event) => {
    fetchPokemon(++id);
    updateInfo();
    updateMoves();

   
});

decButton.addEventListener("click", async (event) => {
    if(id > 0) {
        fetchPokemon(--id);
        updateInfo();
        updateMoves();
    }
});

async function fetchPokemon(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    data = await response.json();

    document.getElementById("pokemon-img").src = data.sprites.front_shiny;

    document.getElementById("pokemon-name").textContent = data.name;

    let typesArea = document.getElementById("types")
    typesArea.textContent = "";

    data.types.forEach((type) => {
            const element = document.createElement("p");
            element.textContent = type.type.name;
            typesArea.appendChild(element);
    })
}


infoButton.addEventListener("click", () => {
    panel = true;
    updateInfo();
    
});


movesButton.addEventListener("click", () => {  
    panel = false; 
    updateMoves();   
    
});


function updateMoves(){
    if(!panel) {
        statType.textContent = "Moves";
            
            statInfo.innerHTML="";
            statInfo.innerHTML = `
                <p>${data.moves[0].move.name}</p>
            `;
    
    }
}

function updateInfo(){

    if(panel) {
        statType.textContent = "Info";

            const stats = data.stats.map( s => (
                `<p>${s.stat.name}: ${s.base_stat}</p>`
            )).join("");

            statInfo.innerHTML = `
                <p>height: ${data.height / 10} m</p>
                <p>weight: ${data.weight / 10} kg</p>
                ${stats}
            `;
    }
}