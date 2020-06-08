//TELEFONES 
function vibrar (){
		    if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		    } 
}

function orientacao (e) {
    var x = e.gamma;
    var y = e.beta;
    boneco.body.velocity.x += x*7;
    boneco.body.velocity.y += y*7;
}
//WEB 
function criarInimigos(totalInimigos){
     for ( var i = 0; i <totalInimigos; i++ ) { 
	     inimigos = grupoInimigos.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'inimigo', game.rnd.between(0, 35));
	     inimigos.body.collideWorldBounds = true;
      }
}

function atualizaInimigos () { 
 	grupoInimigos.forEach(function(item) {
		   game.physics.arcade.collide(boneco, item, encerra);
		   game.physics.arcade.collide(grupoPlataformas, item);
		   game.physics.arcade.collide(barraCentral, item );
		   if ( game.physics.arcade.collide(grupoBolas, item) ) { 
                        game.sound.play('bola_inimigo');
			            grupoInimigos.remove(item);
			if ( grupoInimigos.length == 0 ){
                   game.sound.play('venceu');
				   alert('Ganhou!');
				   iniciaJogo();
			}
		   }
 		   game.physics.arcade.moveToObject(item,boneco,360);
   	 });
}

function movimentaBarras () { 
 	grupoPlataformas.forEach(function(item) {
				if (item.body.position.y ==0 ) { 
					item.body.position.y =  320;
				} else {
					item.body.velocity.y =  -40;
				}
   	 });
}
function movimentaBarraCentral() { 

				if (barraCentral.body.position.y ==455 || desce == false ) { 
					if (barraCentral.body.position.y == 100 ) { 
						desce =  true;
					} else { 
						barraCentral.body.y--;
						desce =false;					
					}
				} else if (desce ==true) {
	   			        barraCentral.body.y++;
				}
}

function addPlataforma(posX,posY,asset){
		plataforma = game.add.sprite(posX,posY,asset)
		game.physics.enable(plataforma, Phaser.Physics.ARCADE);
		plataforma.body.allowGravity = false;
		plataforma.body.immovable = true;
		plataforma.body.collideWorldBounds = true;
		grupoPlataformas.add(plataforma);	
}

function iniciaJogo(){
    
     game.physics.startSystem(Phaser.Physics.ARCADE);
     fundo = game.add.sprite(0,0,'fundo');

     game.physics.arcade.gravity.y = 100;
     grupoPlataformas = game.add.physicsGroup();

     game.physics.setBoundsToWorld();

     boneco = game.add.sprite(300, 200, 'dude');

     game.physics.enable(boneco, Phaser.Physics.ARCADE);
 
     boneco.body.collideWorldBounds = true;
     boneco.body.gravity.set(0, 5000);
     //Bolas
     grupoBolas = game.add.physicsGroup(Phaser.Physics.ARCADE);

     for (var i = 0; i < totalBolas; i++) {
        var c = grupoBolas.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'bola', game.rnd.between(0, 35));	
        c.body.collideWorldBounds = true;
        c.body.velocity.y = 100;
        c.body.gravity.set(0, 10);
     } 

   grupoInimigos = game.add.physicsGroup(Phaser.Physics.ARCADE);

   //Adicioa barras laterais
   addPlataforma(0,120,"barra");
   addPlataforma(90,355,"barra");
   addPlataforma(710,420,"barra");
   addPlataforma(710,220,"barra");

   //Barra central	
   barraCentral = game.add.sprite(310,330,"barra"); 
   game.physics.enable(barraCentral, Phaser.Physics.ARCADE);
   barraCentral.body.allowGravity = false;
   barraCentral.body.immovable = true;
   barraCentral.body.collideWorldBounds = true;


    window.addEventListener("deviceorientation", orientacao, true);
    criarInimigos(totalInimigos);

     cursors = game.input.keyboard.createCursorKeys();	

}
function encerra() { 
    game.sound.play('perdeu');
	vibrar();
	alert('Perdeu!');
	iniciaJogo();
}
