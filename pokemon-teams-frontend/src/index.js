const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
// Whenever a user hits "Release Pokemon" on a specific Pokemon team, 
//    that specific Pokemon should be released from the team.

const trainersContainer = document.querySelector("main")

fetchAllTrainers()

function fetchAllTrainers(){
   fetch(TRAINERS_URL)
   .then(r => r.json())
   .then(response => {
      response.data.forEach(trainer => {
         renderOneTrainerCard(trainer)
      });
   })
}

function renderOneTrainerCard(trainer){
   const trainerCard = document.createElement("div")
      trainerCard.className = "card"
   trainersContainer.append(trainerCard)
   fillTrainerCard(trainer, trainerCard)
}

function fillTrainerCard(trainer, trainerCard){
   const trainerName = document.createElement("p")
      trainerName.innerText = trainer.attributes.name
   const addPokemonButton = document.createElement("button")
      addPokemonButton.innerText = "Add Pokemon"
   const pokemonUl = document.createElement("ul")

   trainer.attributes.pokemon.forEach(pokemon => {
      // console.log(pokemon)
      // console.log(pokemonUl)
      addPokemonToTrainerCard(pokemon, pokemonUl)
   })
   trainerCard.append(trainerName, addPokemonButton, pokemonUl)

   addPokemonButton.addEventListener("click", () => {
      // console.log(trainer.id)
      fetch(`${POKEMONS_URL}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
         },
         body: JSON.stringify({
            trainer_id: trainer.id
         })
      })
      .then(r => r.json()
      //    {
      //    if (r.status === 200){
      //       r.json()
      //    } else {
      //       return
      //    }
      // }
      )
      .then(newPokemon => {
         // console.log(newPokemon)
         addPokemonToTrainerCard(newPokemon, pokemonUl)
      })
   })
}

function addPokemonToTrainerCard(pokemon, pokemonUl){
   // console.log(pokemon)
   // console.log(pokemonUl)
   const pokemonLi = document.createElement("li")
      pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
   const releaseButton = document.createElement("button")
      releaseButton.className = "release"
      releaseButton.innerText = "Release"
   pokemonLi.append(releaseButton)
   pokemonUl.append(pokemonLi)

   releaseButton.addEventListener("click", () => {
      fetch(`${POKEMONS_URL}/${pokemon.id}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
         }
      })
      .then(r => {
         if (r.status === 204){
            pokemonLi.remove()
         }
      })
   })
} 

{/* <div class="card" data-id="1">
   <p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}

