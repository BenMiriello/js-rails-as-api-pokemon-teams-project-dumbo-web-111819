class PokemonsController < ApplicationController
   def index
      pokemons = Pokemon.all
      # options = {
      #    include: [:trainer]
      # }
      render json: PokemonSerializer.new(pokemons)
   end
   
   def show
      pokemon = Pokemon.find(params[:id])
      # options = {
      #    include: [:trainer]
      # }
      render json: PokemonSerializer.new(pokemon)
   end

   def create
     pokemon_params = params.require(:pokemon).permit(:trainer_id)
     pokemon_params['species'] = 'ditto'
     pokemon_params['nickname'] = 'nickname'
     pokemon = Pokemon.create(pokemon_params)
     if pokemon.valid?
       render json: pokemon
     else
       render json: {error: "pokemon not created"}
     end
   end

   def destroy
      pokemon = Pokemon.find(params[:id])
      pokemon.destroy
   end
end

