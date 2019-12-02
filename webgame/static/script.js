let tela_altura, tela_largura;
let canvas, ctx;



function main(){ //Inicializa o jogo

    tela_altura = window.innerHeight;
    tela_largura = window.innerWidth;

    if(tela_largura >= 600){
        tela_largura = 600;
        tela_altura = 600;

    }

    canvas = document.createElement("canvas");
    canvas.height = tela_altura;
    canvas.width = tela_largura;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);
    document.addEventListener("touchstart", click);


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
    contexto.fillRect(0, 0, tela_largura, tela_altura);

}

function click(evento){


}


main();