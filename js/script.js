(function(app, $, undefined) {
    app.Dashboard = {};
    app.Dashboard.init = function() {
        $( document ).ready(function() {
        var count = 9            
        var pokemons = [];
            
            // load pokemons;
            for (i = 1; i < count+1; i++) {
                loadData(i);
            }

			// add pokemon to select;
            function createOption(){
                for (i = 0; i < pokemons.length; i++) {
                    $("#selectPokemon").append('<option value="'+pokemons[i].id+'">'+pokemons[i].name+'</option>');
                }
            }
                
            // show pokemon;
            $('#selectPokemon').change(function() {
                $( "#pokedex-display-content .item" ).remove();
                var spokemon = $(this).val();
                console.log(spokemon);
                for (i = 0; i < pokemons.length; i++) {
                    if(spokemon==pokemons[i].id){
                        $("#pokedex-display-content").append('<div class="item"><img src="'+pokemons[i].sprites.front_default+'"/><div class="name">'+pokemons[i].name+'</div></div>');
                    }
                }    
            });
          
            // load and push pokemon to array
            function loadData(pokemon){   
                $.ajax({
                    url: 'https://pokeapi.co/api/v2/pokemon/'+pokemon,
                    dataType: 'json',
                    async: true,
                    success: function(data) {
                    pokemons.push(data);
					// 
                    if(pokemons.length==count){
                        $( "#pokedex-display" ).addClass( "active" );
                        createOption();
                    }
                    },
            
                    statusCode: {
                        404: function() {
                        alert('There was a problem with the server.  Try again soon!');
                        }
                    }
                });
            }
            
        });
    }
}( window.app = window.app || {}, jQuery ));
app.Dashboard.init();
