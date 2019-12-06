let inicio_canvas_x, inicio_canvas_y, canvas_altura, canvas_largura;
let canvas, ctx;


player = {

    x: 50,
    y: 0,
    x_objetivo: 50,
    y_objetivo: 0,
    altura: 50,
    largura: 50,
    cor: "#ff4e4e",
    imagem: null,    

    velocidade: 6,
    score: 0,
    
    start : function(){

        this.y = canvas_altura/2;

        //imagem = new Image();
        //imagem.src = "Img_game/PLAYER_SHIP_OFF.png";
    },

    atualizar_posicao : function(mouse_x, mouse_y){

        let rect = canvas.getBoundingClientRect();
        let x = (mouse_x - rect.left) - (this.largura/2);
        let y = (mouse_y - rect.top)  - (this.altura/2);

        if(x - this.largura <= 0){
            x = this.largura;
        }
        else if(x + this.largura >= canvas_largura/2){
            x = canvas_largura/2 - this.largura;
        }

        if(y - this.altura <= 0){
            y = 2;
        }
        else if(y + this.altura >= canvas_altura){
            y = canvas_altura - (this.altura + 2);
        }

        this.x_objetivo = x;
        this.y_objetivo = y;

        //console.log("X: " + this.x + " | Y: " + this.y);

    },

    update : function(){
        
        let distancia_x = this.x - this.x_objetivo;
        let distancia_y = this.y - this.y_objetivo;
        let distancia_total = Math.sqrt(Math.pow(distancia_x, 2) + Math.pow(distancia_y, 2));
        
        if(distancia_total <= this.velocidade){

            this.x = this.x_objetivo;
            this.y = this.y_objetivo;

        }
        else{

            let f = distancia_total/this.velocidade;

            this.x = this.x - (distancia_x/f);
            this.y = this.y - (distancia_y/f);

        }

        //console.log(distancia_total);

        // let mouse = getMousePos();
        // this.x = mouse.x;
        // this.y = mouse.y;

    },

    desenhar : function(){

        //let sprite_player = new Sprite(this.imagem, largura, altura)
        //sprite_player.desenhar(this.x, this.y);

        //Desenho temporario
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);

    }
};

// fundo = {
//     // x = 0, y = 0, largura, altura,
//     // imagem, sprite_fundo,

//     start : function(){
//         // imagem = new Image();
//         // imagem.src = "Img_game/fundo.png";
//         // this.sprite_fundo = new Sprite(this.imagem, largura, altura)


//     },

//     desenhar : function(){        
//         // this.sprite_fundo.desenhar(this.x, this.y);


//     }
// };


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
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);
    document.addEventListener("touchstart", click);
    window.addEventListener("mousemove", getMousePos);

    // fundo.start();

    player.start();

    update();
}


function update(){ //Função chamada a cada frame do jogo
    
    atualizar_acoes();
    desenhar();

    window.requestAnimationFrame(update);
}

function atualizar_acoes(){ //Atualizar as mudanças de informações de cada objeto
    
    //let rect = canvas.getBoundingClientRect();
    player.update();

}

function desenhar(){ //Responsavel por chamar as funções que redesenham as informações atualizadas na tela
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas_largura, canvas_altura);


    //fundo.desenhar();
    player.desenhar();
}


function getMousePos(evt) {
    
    player.atualizar_posicao(evt.x, evt.y);    
}


function click(evento){
    //alert("clicou");

}


// function Sprite(imagem, largura, altura){

//     this.imagem = imagem;
//     this.largura = largura;
//     this.altura = altura;

//     this.desenhar = function(xCanvas, yCanvas) {

//         ctx.drawImage(this.imagem, xCanvas, yCanvas);
        
//     } 

// }


main();