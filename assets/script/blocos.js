const canvas = document.getElementById('blocos');
const ctx = canvas.getContext('2d');

let dragStartX = 0;
let dragStartY = 0;
let blocoSelecionado = null;
let agarrou = false;

const larguraImagem = 100;
const alturaImagem = 100;

const n_blocos = {
    bloco_azul: new Image(),
    bloco_roxo: new Image(),
    bloco_verde: new Image(),
    bloco_vermelho: new Image()
}

const coordenada_bloco = { 
    bloco_azul: [0, 0], 
    bloco_roxo: [0, 0], 
    bloco_verde: [0, 0], 
    bloco_vermelho: [0, 0]
};

const src_bloco = [
    './assets/imgs/blocos_de_lego/bloco_azul-removebg-preview.png',
    './assets/imgs/blocos_de_lego/bloco_roxo-removebg-preview.png',
    './assets/imgs/blocos_de_lego/bloco_verde-removebg-preview.png',
    './assets/imgs/blocos_de_lego/bloco_vermelho-removebg-preview.png'
];

let cont = 0;
for (let chave in n_blocos) {
    coordenada_bloco[chave][0] = Math.floor(Math.random() * 400); // Posição aleatória no eixo X
    coordenada_bloco[chave][1] = Math.floor(Math.random() * 400); // Posição aleatória no eixo Y
    n_blocos[chave].src = src_bloco[cont];
    cont++;
}


function desenhaImagem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let chave in n_blocos) {
        ctx.drawImage(n_blocos[chave], coordenada_bloco[chave][0], coordenada_bloco[chave][1], larguraImagem, alturaImagem);
    }
}

// Inicializa a posição dos blocos ao carregar
for (let chave in n_blocos) {
    n_blocos[chave].onload = desenhaImagem;
}

canvas.addEventListener('mousedown', (event) => {
    blocoSelecionado = getClickedImage(event);
    if (blocoSelecionado) {
        movendoBaixo(event);
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (blocoSelecionado) {
        moveuMouse(event);
    }
});

canvas.addEventListener('mouseup', () => {
    blocoSelecionado = null;
    agarrou = false;
});

function getClickedImage(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let chave in n_blocos) {
        if (x >= coordenada_bloco[chave][0] && x <= coordenada_bloco[chave][0] + larguraImagem &&
            y >= coordenada_bloco[chave][1] && y <= coordenada_bloco[chave][1] + alturaImagem) {
            return chave;
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

function moveuMouse(event) {
    if (!agarrou || !blocoSelecionado) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let novoX = coordenada_bloco[blocoSelecionado][0] + (mouseX - dragStartX);
    let novoY = coordenada_bloco[blocoSelecionado][1] + (mouseY - dragStartY);

    // Agora a colisão é considerada apenas dentro do tamanho da imagem
    if (!verificaColisao(blocoSelecionado, novoX, novoY)) { 
        coordenada_bloco[blocoSelecionado][0] = novoX;
        coordenada_bloco[blocoSelecionado][1] = novoY;
    }

    dragStartX = mouseX;
    dragStartY = mouseY;

    desenhaImagem();
}



// colisão dos blocos
function verificaColisao(bloco, novoX, novoY) {
    const margem = 10; // Ajuste para reduzir a área de colisão

    for (let chave in coordenada_bloco) {
        if (chave !== bloco) {
            let [x, y] = coordenada_bloco[chave];

            // A colisão agora considera uma margem menor
            if (novoX + margem < x + larguraImagem - margem &&
                novoX + larguraImagem - margem > x + margem &&
                novoY + margem < y + alturaImagem - margem &&
                novoY + alturaImagem - margem > y + margem) {
                return true; // Há colisão
            }
        }
    }
    return false;
}

