let inicio_canvas_x, inicio_canvas_y, canvas_altura, canvas_largura;
let canvas, ctx;



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
    contexto.fillRect(inicio_canvas_x, inicio_canvas_y, canvas_largura, canvas_altura);

}

function click(evento){
    //alert("clicou");

}


main();