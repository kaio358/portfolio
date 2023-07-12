const canvas = document.getElementById('blocos');
const ctx = canvas.getContext('2d');
let dragStartX = 0;
let dragStartY = 0;

let agarrou = false;

// imagens

const larguraImagem = 100;
const alturaImagem = 100;

const n_blocos = {
    bloco_azul: new Image(),
    bloco_roxo: new Image(),
    bloco_verde: new Image(),
    bloco_vermelho: new Image()
}
const coordenada_bloco = { 
    bloco_azul: [0,0], 
    bloco_roxo: [0,0], 
    bloco_verde: [0,0], 
    bloco_vermelho: [0,0], 

}

const src_bloco = ['./assets/imgs/blocos_de_lego/bloco_azul-removebg-preview.png','./assets/imgs/blocos_de_lego/bloco_roxo-removebg-preview.png','./assets/imgs/blocos_de_lego/bloco_verde-removebg-preview.png','./assets/imgs/blocos_de_lego/bloco_vermelho-removebg-preview.png']


var cont = 0 

for(var chave in n_blocos){
    coordenada_bloco[chave][0] = Math.floor(Math.random() * 400)
    coordenada_bloco[chave][1] = Math.floor(Math.random() * 400)
    n_blocos[chave].src  = src_bloco[cont] ;

    cont++
}
//configurações basicas de surgimento
n_blocos.bloco_azul.onload = function() { 
    ctx.drawImage(n_blocos.bloco_azul, coordenada_bloco.bloco_azul[0], coordenada_bloco.bloco_azul[1] , larguraImagem, alturaImagem);

};
n_blocos.bloco_roxo.onload = function() {
    ctx.drawImage(n_blocos.bloco_roxo, coordenada_bloco.bloco_roxo[0],coordenada_bloco.bloco_roxo[1], larguraImagem, alturaImagem);

};
n_blocos.bloco_verde.onload = function() {
    ctx.drawImage(n_blocos.bloco_verde, coordenada_bloco.bloco_verde[0] , coordenada_bloco.bloco_verde[1] , larguraImagem, alturaImagem);

};
n_blocos.bloco_vermelho.onload = function() {
    
    ctx.drawImage(n_blocos.bloco_vermelho, coordenada_bloco.bloco_vermelho[0] , coordenada_bloco.bloco_vermelho[1] , larguraImagem, alturaImagem);

};


function desenhaImagem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(n_blocos.bloco_azul, coordenada_bloco.bloco_azul[0], coordenada_bloco.bloco_azul[1] , larguraImagem, alturaImagem);
    ctx.drawImage(n_blocos.bloco_roxo, coordenada_bloco.bloco_roxo[0],coordenada_bloco.bloco_roxo[1], larguraImagem, alturaImagem);
    ctx.drawImage(n_blocos.bloco_verde, coordenada_bloco.bloco_verde[0] , coordenada_bloco.bloco_verde[1] , larguraImagem, alturaImagem);
    ctx.drawImage(n_blocos.bloco_vermelho, coordenada_bloco.bloco_vermelho[0] , coordenada_bloco.bloco_vermelho[1] , larguraImagem, alturaImagem);


   

}


canvas.addEventListener('mousedown',(event)=> {
    const clickedImage = getClickedImage(event);
    if (clickedImage) {
        movendoBaixo(event)
    }
  
} );
canvas.addEventListener('mousemove',(event)=> {
    const clickedImage = getClickedImage(event);
    if (clickedImage) {
        moveuMouse(event,clickedImage)
    }
  
});
canvas.addEventListener('mouseup', manipular);


function getClickedImage(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    
    for (let i in n_blocos) {
       
      if (x >= coordenada_bloco[i][0] && x <=  coordenada_bloco[i][0] + 100 && y >= coordenada_bloco[i][1] && y <= coordenada_bloco[i][1] + 100) {
      
        return i;
      }
    }
    
    return null; 
  }



function movendoBaixo(event) {
  const rect = canvas.getBoundingClientRect();

  dragStartX = event.clientX - rect.left;
  dragStartY = event.clientY - rect.top;
  agarrou = true;
}

function moveuMouse(event,clickedImage) {
  if (!agarrou) return;

  const rect = canvas.getBoundingClientRect();
    
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
    
  coordenada_bloco[clickedImage][0] += mouseX - dragStartX;
  coordenada_bloco[clickedImage][1] += mouseY - dragStartY;

  dragStartX = mouseX;
  dragStartY = mouseY;
  
  desenhaImagem();
}

function manipular() {
  agarrou = false;
}



