
let inicio_canvas_x, inicio_canvas_y, canvas_altura, canvas_largura;
let canvas, ctx;

fundo = {

    x: 0,
    y: 0,
    altura: 0,
    largura: 0,
    velocidade: 8,
    sprite: null,

    start : function(){

        this.largura = canvas_largura * 4;
        this.altura = canvas_altura;
        
        let img = new Image();
        img.src = url_fundo;
        this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);
        

    },

    update : function(){

        let velocidade_atual = this.velocidade - (player.velocidade_x/8);
        this.x -= velocidade_atual;
        if(this.x <= -this.largura){
            this.x = -velocidade_atual;
        }
        this.sprite.atualizar_posicao(this.x, this.y);

    },

    desenhar : function(){

        this.sprite.desenhar();
        this.sprite.atualizar_posicao(this.x + this.largura, this.y);
        this.sprite.desenhar();

    },

}

player = {

    x: 50,
    y: 0,
    x_objetivo: 50,
    y_objetivo: 0,
    altura: 40,
    largura: 80,
    cor: "#ff4e4e",
    sprite: null,    
    vida: 0,
    velocidade: 6,
    velocidade_x: 0,

    start : function(){

        this.y = canvas_altura/2;
        this.vida = 6;

        let img = new Image();
        img.src = url_player_avanco;
        this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);

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
    
    },

    avancar : function(boolean){

        if(boolean){
            let img = new Image();
            img.src = url_player_avanco;
            this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);            
        }
        else{
            let img = new Image();
            img.src = url_player;
            this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);
        }

    },

    update : function(){
        
        let distancia_x = this.x - this.x_objetivo;
        let distancia_y = this.y - this.y_objetivo;
        let distancia_total = Math.sqrt(Math.pow(distancia_x, 2) + Math.pow(distancia_y, 2));
        
        if(distancia_total <= this.velocidade){
            this.velocidade_x = 0;

            this.x = this.x_objetivo;
            this.y = this.y_objetivo;          

        }
        else{

            let f = distancia_total/this.velocidade;

            this.velocidade_x = (distancia_x/f);

            this.x = this.x - (distancia_x/f);
            this.y = this.y - (distancia_y/f);
            
        }

        this.avancar(distancia_x < 0);   
        this.sprite.atualizar_posicao(this.x, this.y);

        //console.log(distancia_total);

        // let mouse = getMousePos();
        // this.x = mouse.x;
        // this.y = mouse.y;

    },

    desenhar : function(){
        this.sprite.desenhar();
    },

    atingido : function(){

        this.vida--;
        vida.remover_vida();
        if(this.vida <= 0){ // perdeu o game
            alert("Perdeu");
        }        

    }
};


C_Tiros = { //controlador de tiros do player

    listTiros: [],
    cores: ["#ffbc1c", "#ff1c1c", "#ff85e1"],
    tempo_inserir: 30,
    config_tempo_inserir: 10,
    velocidade_tiro: 10,
    atirar: false,

    insere: function(){

        let x = player.x + player.largura/2;
        let y = player.y + player.altura/2;
        let largura = 40;
        let altura = 20;
        let img = new Image();
        img.src = url_tiro_player;
        let sprite = new Sprite(img, x, y, largura, altura);

        this.listTiros.push({
            x: x,
            y: y,
            largura: largura,
            altura: altura,
            sprite: sprite, 
        });

        this.tempo_inserir = this.config_tempo_inserir;
    },


    update: function(){

        if(this.atirar){
            if(this.tempo_inserir <= 0){
                this.insere();
            }
            else{
                this.tempo_inserir--;
            }
        }

        for(let i = 0; i < this.listTiros.length; i++){

            let obj_tiro = this.listTiros[i];
            obj_tiro.x += this.velocidade_tiro;
            obj_tiro.sprite.atualizar_posicao(obj_tiro.x, obj_tiro.y);

        }

    },

    desenhar: function(){

        for(let i = 0; i < this.listTiros.length; i++){

            let obj_tiro = this.listTiros[i];            
            obj_tiro.sprite.desenhar();
        }

    }

};

C_Asteroides = {

    listAst: [],
    pos_y: [1, 2, 3], //1 = asteroide vindo de cima para baixo, 2 = vindo do meio, 3 = de baixo para cima
    tempo_inserir: 30,
    config_tempo_inserir: 10,

    insere: function(){

        pos_y = this.pos_y[Math.floor(3*Math.random())];
        pos_x = 0;
        velocidade_x = 0;
        velocidade_y = 0;

        if(pos_y == 1){ // vindo de cima
            pos_y = 0;
            pos_x = canvas_largura/1.8 + Math.floor((canvas_largura/2.2) * Math.random());

            velocidade_x = - (5 + Math.floor(4 * Math.random()));
            velocidade_y = (2 + Math.floor(4 * Math.random()));            
        }
        else if (pos_y == 2){ // vindo do centro
            pos_y = Math.floor(canvas_altura * Math.random());
            pos_x = canvas_largura;

            velocidade_x = - (5 + Math.floor(4 * Math.random()));

            if(Math.floor(2 * Math.random()) == 1) // sorteia se sera de baixo para cima ou de cima para baixo
                velocidade_y = (1 + Math.floor(2 * Math.random()));
            else
                velocidade_y = - (1 + Math.floor(2 * Math.random()));
        }
        else{ // vindo de baixo
            pos_y = canvas_altura;
            pos_x = canvas_largura/1.8 + Math.floor((canvas_largura/2.2) * Math.random());

            velocidade_x = - (5 + Math.floor(4 * Math.random()));
            velocidade_y = - (2 + Math.floor(4 * Math.random()));
        }

        let largura = 30;
        let altura = 60;
        let rotacao = calcular_rotacao(pos_x, pos_y, pos_x + velocidade_x, pos_y + velocidade_y);
        let img = new Image();
        img.src = url_meteoro;
        let sprite = new Sprite(img, pos_x, pos_y, largura, altura);

        this.listAst.push({
            x: pos_x,
            y: pos_y,
            largura: largura,
            altura: altura,
            vel_x: velocidade_x,
            vel_y: velocidade_y,
            rotacao: rotacao,
            sprite: sprite,
            vida: 3,
        });

        score.adicionar_pontuacao(1);

        this.tempo_inserir = this.config_tempo_inserir + Math.floor(20 * Math.random());
    },


    update: function(){

        if(this.tempo_inserir <= 0){
            this.insere();
        }
        else{
            this.tempo_inserir--;
        }

        for(let i = 0; i < this.listAst.length; i++){

            let obj_ast = this.listAst[i];

            for(let c = 0; c < C_Tiros.listTiros.length; c++){

                let obj_tiro = C_Tiros.listTiros[c];

                if(detectar_colisao(obj_ast, obj_tiro)){ // detecta colisao de tiros com asteroides
                    
                    obj_ast.vida--;

                    if(obj_ast.vida == 0){ //asteroide morreu
                                                
                        this.listAst.splice(i, 1); //Remove os itens dentro do intervalo, coloque 1 se for apenas um item
                        i--;
                        this.destruir(obj_ast, true);                                         
                    }
                }
            }
            
            if(detectar_colisao(obj_ast, player)){ // detecta colisão de asteroides com o player
             
                this.listAst.splice(i, 1); 
                i--;
                this.destruir(obj_ast, false);
                player.atingido();

            }

            if(validar_pos_tela(obj_ast)){
                this.listAst.splice(i, 1); 
                i--;
                this.destruir(obj_ast, false);
            }

            obj_ast.x += obj_ast.vel_x;
            obj_ast.y += obj_ast.vel_y;

            obj_ast.sprite.atualizar_posicao(obj_ast.x, obj_ast.y);

        }

    },

    desenhar: function(){

        for(let i = 0; i < this.listAst.length; i++){

            let obj_ast = this.listAst[i];

            ctx.save(); // sava o contexto antes de transladar

            ctx.translate(obj_ast.x + obj_ast.largura/2, obj_ast.y + obj_ast.altura/2);//transladar ctx para o alvo
            ctx.rotate(obj_ast.rotacao); 
            obj_ast.sprite.desenhar_rotacionado();

            ctx.restore(); // retorna o contexto para o estado salvo inicialmente
            
        }

    },

    destruir: function(ast, pontuacao){

        if(pontuacao)
            score.adicionar_pontuacao(20);

    },

};

C_Inimigos = {

    listNav: [],
    pos_tela: [1, 2, 3], //1 = nav vindo de cima para baixo, 2 = vindo do meio, 3 = de baixo para cima
    tempo_inserir: 100,
    config_tempo_inserir: 100,

    insere: function(){

        pos_tela = this.pos_tela[Math.floor(3*Math.random())];
        pos_y = 0;
        pos_x = 0;
        
        if(pos_tela == 1){ // vindo de cima
            pos_y = 0;
            pos_x = canvas_largura/1.5 + Math.floor((canvas_largura/2.5) * Math.random());
           
        }
        else if (pos_tela == 2){ // vindo do centro
            pos_y = Math.floor(canvas_altura * Math.random());
            pos_x = canvas_largura;

        }
        else{ // vindo de baixo
            pos_y = canvas_altura;
            pos_x = canvas_largura/1.5 + Math.floor((canvas_largura/2.5) * Math.random());

        }

        obj_inimigo = new Inimigo(pos_x, pos_y);
        obj_inimigo.start(pos_tela);
        this.listNav.push(obj_inimigo);
        this.tempo_inserir = this.config_tempo_inserir +  Math.floor(this.config_tempo_inserir * Math.random());

    },


    update: function(){

        if(this.tempo_inserir <= 0){
            this.insere();
        }
        else{
            this.tempo_inserir--;
        }

        for(let i = 0; i < this.listNav.length; i++){

            let obj_nav = this.listNav[i];

            for(let c = 0; c < C_Tiros.listTiros.length; c++){

                let obj_tiro = C_Tiros.listTiros[c];

                if(detectar_colisao(obj_nav, obj_tiro)){ // detecta colisao de tiros com o inimigo
                    
                    obj_nav.vida--;

                    if(obj_nav.vida == 0){ //inimigo morreu
                                                
                        this.listNav.splice(i, 1); //Remove os itens dentro do intervalo, coloque 1 se for apenas um item
                        i--;
                        this.destruir(obj_nav, true);
                                         
                    }

                }

            }
            
            if(detectar_colisao(obj_nav, player)){ // detecta colisão de inimigos com o player
             
                this.listNav.splice(i, 1); 
                i--;
                this.destruir(obj_nav, false);
                player.atingido();

            }

            obj_nav.update();

        }

    },

    desenhar: function(){

        for(let i = 0; i < this.listNav.length; i++){

            let obj_nav = this.listNav[i];
            obj_nav.desenhar();

        }

    },

    destruir: function(nav, pontuacao){

        if(pontuacao)
            score.adicionar_pontuacao(200);

        nav.destruir();
    },

};

class Inimigo{
    
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.x_objetivo;
        this.y_objetivo;
        this.altura = 40;
        this.largura = 40;
        this.cor = "#fff";
        this.imagem = null;   
        this.vida = 10;
        this.velocidade = 4;
        this.c_tiros = null;
    }

    start(pos_tela) {
        
        let x_objetivo = Math.floor(canvas_largura * Math.random());
        let y_objetivo = Math.floor(canvas_altura * Math.random());

        this.atualizar_posicao(x_objetivo, y_objetivo);
        this.c_tiros = new Tiros_inimigo();

    }

    atualizar_posicao(x, y){

        if(x - this.largura <= 0){
            x = this.largura;
        }
        else if(x + this.largura >= canvas_largura){
            x = canvas_largura - this.largura;
        }

        if(y <= 0){
            y = 0;
        }
        else if(y + this.altura >= canvas_altura){
            y = canvas_altura - (this.altura);
        }

        this.x_objetivo = x;
        this.y_objetivo = y;

    }

    destruir(){


    }
    
    update(){

        let distancia_x = this.x - this.x_objetivo;
        let distancia_y = this.y - this.y_objetivo;
        let distancia_total = Math.sqrt(Math.pow(distancia_x, 2) + Math.pow(distancia_y, 2));
        

        if(distancia_total <= this.velocidade){

            let x_objetivo = Math.floor(canvas_largura * Math.random());
            let y_objetivo = Math.floor(canvas_altura * Math.random());

            this.atualizar_posicao(x_objetivo, y_objetivo);

        }
        else{

            let f = distancia_total/this.velocidade;
            this.x = this.x - (distancia_x/f);
            this.y = this.y - (distancia_y/f);

        }      
        
        this.c_tiros.update(this.x, (this.y + this.altura/2));
        
    }

    desenhar(){

        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
        this.c_tiros.desenhar();

    }

};

class Tiros_inimigo{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.largura = 15;
        this.altura = 4;
        this.listTiros = [];
        this.cores = ["#ffbc1c", "#ff1c1c", "#ff85e1"];
        this.tempo_inserir = 100;
        this.config_tempo_inserir = 60;
        this.velocidade_tiro = 10;
        this.atirar = true;
    }

    insere(){
        this.listTiros.push({
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura,
            cor: this.cores[Math.floor(3*Math.random())],
        });
        this.tempo_inserir = this.config_tempo_inserir;

    }

    update(x, y){

        this.x = x;
        this.y = y;

        if(this.atirar){
            if(this.tempo_inserir <= 0){
                this.insere();
            }
            else{
                this.tempo_inserir--;
            }
        }

        for(let i = 0; i < this.listTiros.length; i++){
            let obj_tiro = this.listTiros[i];
            obj_tiro.x -= this.velocidade_tiro;

            if(detectar_colisao(obj_tiro, player)){ // detecta colisão de inimigos com o player
             
                this.listTiros.splice(i, 1); 
                i--;
                this.destruir();
                player.atingido();

            }
        }       

    }

    desenhar(){

        for(let i = 0; i < this.listTiros.length; i++){
            let obj_tiro = this.listTiros[i];
            ctx.fillStyle = obj_tiro.cor;
            ctx.fillRect(obj_tiro.x, obj_tiro.y, obj_tiro.largura, obj_tiro.altura);
        }

    }

    destruir(){


    }

}

score = {

    x: 0,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#ff4e4e",
    valorScore: 0,

    start : function(){
        this.x = 20;
        this.y = canvas_altura - 50;
    },

    update : function(){
        

        
    },

    desenhar : function(){

        ctx.fillStyle = this.cor;
        ctx.font = "50px Arial";
        ctx.fillText(this.valorScore, this.x, this.y);

    },

    adicionar_pontuacao : function(valor){

        this.valorScore += valor;
    },
    
};

vida = {
    x: 0,
    y: 0,
    altura: 30,
    largura: 30,
    list_sprite: [],
    list_status_sprite: [],

    start : function(){
 
        for(let i = 0; i < 3; i++){
            this.x = 20 + (50 * i);
            this.y = 20;
            let img = new Image();
            img.src = url_coracao1;
            let sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);
            this.list_sprite.push(sprite);
            this.list_status_sprite.push(1);
        }        
    },

    update : function(){
        

        
    },

    desenhar : function(){

        for(let i = 0; i < 3; i++){
            this.list_sprite[i].desenhar();
        }
        

    },

    remover_vida : function(){

        for(let i = 2; i >= 0; i--){
            if(this.list_status_sprite[i]!=3){ // vida vazia
                if(this.list_status_sprite[i] == 1){ // vida cheia
                    this.list_status_sprite[i] = 2;
                   
                    let img = new Image();
                    img.src = url_coracao2;
                    let sprite = new Sprite(img, this.list_sprite[i].x, this.list_sprite[i].y, this.list_sprite[i].largura, this.list_sprite[i].altura);
                    this.list_sprite[i] = sprite;
                }
                else{ // meia vida
                    this.list_status_sprite[i] = 3;
                    
                    let img = new Image();
                    img.src = url_coracao3;
                    let sprite = new Sprite(img, this.list_sprite[i].x, this.list_sprite[i].y, this.list_sprite[i].largura, this.list_sprite[i].altura);
                    this.list_sprite[i] = sprite;
                }
                break;
            }
   
        }
    },

}

function detectar_colisao(obj1, obj2){

    if((obj1.x + obj1.largura) >= obj2.x)
        if(obj1.x <= (obj2.x + obj2.largura))
            if((obj1.y + obj1.altura) >= obj2.y)
                if(obj1.y <= (obj2.y + obj2.altura))
                    return true;

    return false;
}

function validar_pos_tela(obj){

    if(obj.x > canvas_largura || obj.x < 0 || obj.y > canvas_altura || obj.y < 0)
        return true;
    else
        return false;

}

function calcular_rotacao(x_atual, y_atual, x_objetivo, y_objetivo){

    let cat_adj = x_objetivo - x_atual;
    let cat_oposto = y_objetivo - y_atual;

    let tan = cat_oposto/cat_adj;
    let angle = Math.atan(tan) + (Math.PI / 2);
    return angle;    

}

function Sprite(image, x, y, largura, altura) {
    
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenhar = function(){
        ctx.drawImage(image, this.x, this.y, this.largura, this.altura);
    }

    this.desenhar_rotacionado = function(){
        ctx.drawImage(image, -(this.largura/2), -(this.altura/2), this.largura, this.altura);
    }

    this.atualizar_posicao = function(xCanvas, yCanvas){
        this.x = xCanvas;
        this.y = yCanvas;
    }

}

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
    document.addEventListener("mouseup", clickEnd);
    document.addEventListener("touchstart", click);
    document.addEventListener("touchend", clickEnd);
    window.addEventListener("mousemove", getMousePos);

    // fundo.start();
    fundo.start();
    player.start();
    score.start();
    vida.start();

    update();
}


function update(){ //Função chamada a cada frame do jogo
    
    atualizar_acoes();
    desenhar();

    window.requestAnimationFrame(update);
}

function atualizar_acoes(){ //Atualizar as mudanças de informações de cada objeto
    
    //let rect = canvas.getBoundingClientRect();
    fundo.update();
    player.update();
    C_Tiros.update();
    C_Asteroides.update();
    C_Inimigos.update();

}

function desenhar(){ //Responsavel por chamar as funções que redesenham as informações atualizadas na tela
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas_largura, canvas_altura);

    fundo.desenhar();
    C_Tiros.desenhar();
    C_Asteroides.desenhar();
    C_Inimigos.desenhar();
    player.desenhar();
    score.desenhar();
    vida.desenhar();

}


function getMousePos(evt) {
    
    player.atualizar_posicao(evt.x, evt.y);    
}


function click(evento){

    C_Tiros.atirar = true;

}

function clickEnd(evento){

    C_Tiros.atirar = false;

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