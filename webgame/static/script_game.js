let inicio_canvas_x, inicio_canvas_y, canvas_altura, canvas_largura;
let canvas, ctx;


player = {

    x, y, largura, altura,
    imagem,    
    
    start : function(){
        imagem = new Image();
        imagem.src = "Img_game/PLAYER_SHIP_OFF.png";
    },

    desenhar : function(){

        let sprite_player = new Sprite(this.imagem, largura, altura)
        sprite_player.desenhar(this.x, this.y);
    }
};

fundo = {
    x = 0, y = 0, largura, altura,
    imagem, sprite_fundo,

    start : function(){
        imagem = new Image();
        imagem.src = "Img_game/fundo.png";
        this.sprite_fundo = new Sprite(this.imagem, largura, altura)
    },

    desenhar : function(){        
        this.sprite_fundo.desenhar(this.x, this.y);
    }
};


function main(){ //Inicializa o jogo

    canvas_altura = window.innerHeight - 20;
    canvas_largura = canvas_altura * 1.77;
    inicio_canvas_x = (window.innerWidth - canvas_largura) / 2;
    inicio_canvas_y = (window.innerHeight - canvas_altura) / 2;

    // if(tela_largura/tela_altura != 1,77){
    //     tela_largura = tela_altura * 1,77;
    // }

    canvas = document.createElement("canvas");
    
    canvas.height = canvas_altura;
    canvas.width = canvas_largura;
    canvas.style.border = "1px solid #fff";

    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);
    document.addEventListener("touchstart", click);


    fundo.start();

    update();
}

function update(){ //Função chamada a cada frame do jogo
    atualizar_acoes();
    desenhar();

    window.requestAnimationFrame(update);
}

function atualizar_acoes(){ //Atualizar as mudanças de informações de cada objeto


}

function desenhar(){ //Responsavel por chamar as funções que redesenham as informações atualizadas na tela
    contexto.fillStyle = "#50beff";
    contexto.fillRect(0, 0, canvas_largura, canvas_altura);


    fundo.desenhar();

}

function click(evento){
    //alert("clicou");

}


function Sprite(imagem, largura, altura){

    this.imagem = imagem;
    this.largura = largura;
    this.altura = altura;

    this.desenhar = function(xCanvas, yCanvas) {

        ctx.drawImage(this.imagem, xCanvas, yCanvas);
        
    } 

}


main();