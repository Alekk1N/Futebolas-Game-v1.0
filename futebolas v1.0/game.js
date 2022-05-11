var canvas = document.getElementById("canvasgame");
var ctx = canvas.getContext("2d");

teclas = {};

var bola = {
  x: canvas.width/2,
  y: canvas.height/2,
  raio: 15,
  cor: "white",
  speed: 1,
  dirX: -1,
  dirY: 1,
  mod: 0
}


var esquerda = {
  x: 100,
  y: canvas.height/2 - 30,
  altura: 80,
  largura: 80,
  score: 0,
  speed: 4.5
}

var direita = {
  x: canvas.width - 170,
  y: canvas.height/2 - 30,
  altura: 80,
  largura: 80,
  score: 0,
  speed: 4.5
}

var golDireita = {
  x: (canvas.width - 100)/2,
  y: canvas.height,
  altura: 300,
  largura: 80

}

var golEsquerda = {
  x: (canvas.width - 100)/2,
  y: 0,
  altura: 300,
  largura: 80

}

let imagem_esquerda = new Image()
imagem_esquerda.src = 'red_player.png'

let imagem_direita = new Image()
imagem_direita.src = 'blue_player.png'

let imagem_golEsquerda = new Image()
imagem_golEsquerda.src = 'gol.png'

let imagem_golDireita = new Image()
imagem_golDireita.src = 'gol.png'



document.addEventListener("keydown", function (evento){
  teclas[evento.keyCode] = true;
  console.log(teclas);
});

document.addEventListener("keyup", function (evento){
  delete teclas[evento.keyCode];
  console.log(teclas);
});





function movePlayers(){
  //W - 87
  if(87 in teclas && esquerda.y > 0)
    esquerda.y -= esquerda.speed;
  //S - 83
  if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;
  //A - 65
  if(65 in teclas && esquerda.x > 0)
    esquerda.x -= esquerda.speed;
  //D -68
  if(68 in teclas && esquerda.x > esquerda.largura < canvas.height)
    esquerda.x += esquerda.speed;

  //UP - 38
  if(38 in teclas && direita.y > 0 && direita)
    direita.y -= direita.speed;
  //DOWN - 40
  if(40 in teclas && direita.y + direita.altura < canvas.height)
    direita.y += direita.speed;
  //LEFT - 37
  if(37 in teclas && direita.x > 0)
    direita.x -= direita.speed;
  //RIGHT -39
  if(39 in teclas && direita.x > direita.largura < canvas.height)
    direita.x += direita.speed;
}



function moveBola(){

  //velocidade maxima bola
  if(bola.mod > 5){
    bola.mod = 5
  }

  //player esquerda
  if((bola.x - bola.raio <= esquerda.x + esquerda.largura) &&
    bola.y > esquerda.y &&
    bola.y <= esquerda.y + esquerda.altura)

  {
    bola.dirX = 1;
    bola.mod += 0.1;
    bola.speed = 1
  }

  if(bola.x + bola.raio >= direita.x && bola.y > direita.y && bola.y <= direita.y + direita.altura){
    bola.dirX = -1;
    bola.mod += 0.1;
    bola.speed = 1
  }


  if(bola.y - bola.raio <= 0)
    bola.dirY = 1;
    bola.speed = 1

  if(bola.y + bola.raio >= canvas.height)
    bola.dirY = -1;
    bola.speed = 1

  bola.x += (bola.mod) * bola.dirX;
  bola.y += (bola.mod) * bola.dirY;

  //gol

  if((bola.x < 0 || bola.x > canvas.width) && bola.y + bola.raio <= 450 && bola.y + bola.raio >= 250){

    gol()

  }

}

function gol(){
  if(bola.x < 0 ){
    direita.score +=1
  }
  if(bola.x > 1200 ){
    esquerda.score +=1
  }

  posicaoInicial()

  if(direita.score >= 5){
    alert("BlueTeam Wins")
    reset()
  }
  if(esquerda.score >= 5){
    alert("RedTeam Wins")
    reset()
  }



}

function reset(){
  posicaoInicial()
  esquerda.score = 0
  direita.score = 0
}


function posicaoInicial(){
    bola.x = canvas.width/2
    bola.y = canvas.height/2

    esquerda.x = 100
    esquerda.y = canvas.height/2 - 30

    direita.x = canvas.width - 170
    direita.y = canvas.height/2 - 30

    bola.mod = 0
    bola.speed = 1
}



function desenhar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = bola.cor;
  ctx.beginPath();
  ctx.arc(bola.x, bola.y, bola.raio, 0, 2*Math.PI);

  ctx.fill();


  ctx.drawImage(imagem_esquerda,esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
  ctx.drawImage(imagem_direita,direita.x, direita.y, direita.largura, direita.altura);
  movePlayers();
  moveBola();

  requestAnimationFrame(desenhar);

  ctx.drawImage(imagem_golDireita,-30, 200, golDireita.largura, golDireita.altura);
  ctx.drawImage(imagem_golDireita,1150, 200, golDireita.largura, golDireita.altura);



  ctx.fillStyle = "red";
  ctx.font = "25px times new roman";
  ctx.fillText("RED TEAM: " + esquerda.score, 20, 25);
  ctx.fillStyle = "blue";
  ctx.fillText("BLUE TEAM: " + direita.score, canvas.width - 190, 25);


}

function start(){
  desenhar();
  reset()
}

