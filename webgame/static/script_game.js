
let inicio_canvas_x, inicio_canvas_y, canvas_altura, canvas_largura;
let canvas, ctx, escala_jogo, end_game;

game = {

    myMusic: null,
    mortePlayer: null,
    morteAlien: null,
    tiroPlayer: null,
    impacto: null,


    start : function(){
        
        redimencionarJanela();
        escala_jogo = canvas_altura / 1000;  //Math.max(canvas_largura / 1000, canvas_altura / 1000);
        end_game = false;
        this.myMusic = document.createElement("audio");
        this.myMusic.src = url_sound_music;
        this.myMusic.play();

        fundo.start();
        player.start();
        score.start();
        vida.start();
    },
    

    endGame : function(){

        alert("Você perdeu, seu score foi: ".concat(score.valorScore.toString()))
        end_game = true;
        this.myMusic.pause()
    },

    restartGame : function(){
        end_game = false;
        fundo.restart();
        player.restart();
        C_Tiros.restart();
        C_Explosao.restart();
        C_Asteroides.restart();
        C_Inimigos.restart();
        score.restart();
        vida.restart();
        C_Itens.restart();        
        window.location.reload(false);
    },
}

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
        this.x -= (velocidade_atual * escala_jogo);
        if(this.x <= -this.largura){
            this.x = -(velocidade_atual * escala_jogo);
        }
        this.sprite.atualizar_posicao(this.x, this.y);

    },

    desenhar : function(){

        this.sprite.desenhar();
        this.sprite.atualizar_posicao(this.x + this.largura, this.y);
        this.sprite.desenhar();

    },

    restart : function(){
        this.x = 0;
        this.y = 0;
        this.altura = 0;
        this.largura = 0;
        this.velocidade = 8;
        this.sprite = null;
    },

}

player = {

    x: 50,
    y: 0,
    x_objetivo: 50,
    y_objetivo: 0,
    altura: 40,
    largura: 80,
    sprite: null,    
    vida: 0,
    velocidade: 6,
    velocidade_x: 0,
    tempo_bonus: 0,
    config_tempo_bonus: 200,
    bonus_ativo: false,

    start : function(){
        
        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;
        this.velocidade = this.velocidade * escala_jogo;

        this.y = canvas_altura/2;
        this.vida = 6;  
        

        let img = new Image();
        img.src = url_player_avanco;
        this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);
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
        
        if(this.bonus_ativo){
            if(this.tempo_bonus <= 0){
                this.bonus_ativo = false;
            }
            else{
                this.tempo_bonus--;
            }
        }

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
        this.impacto = document.createElement("audio");
        this.impacto.src = url_sound_impacto;
        this.impacto.play();        
        if(this.vida <= 0){ // perdeu o game
            game.endGame();
            this.myMusic.pause();
        }        

    },

    bonus : function(tipo){

        if(tipo == 1){
            
            this.vida = this.vida + 2;
            if(this.vida > 6)
                this.vida = 6;
            
            vida.adicionar_vida();
            
        }
        else{
            
            this.tempo_bonus = this.config_tempo_bonus;
            this.bonus_ativo = true;

        }
    },
    
    restart : function(){
        this.x = 50;
        this.y = 0;
        this.x_objetivo = 50;
        this.y_objetivo = 0;
        this.altura = 40;
        this.largura = 80;
        this.velocidade = 6;
        this.velocidade_x = 0;
        this.sprite = null;
        this.tempo_bonus = 0;
        this.config_tempo_bonus = 200;
        this.bonus_ativo = false;

    },
};


C_Tiros = { //controlador de tiros do player

    listTiros: [],
    tempo_inserir: 30,
    config_tempo_inserir: 10,
    velocidade_tiro: 10,
    atirar: false,

    insere: function(){

        let x = player.x + player.largura/2;
        let y = player.y + player.altura/2;
        let largura = 20;
        let altura = 5;

        largura = largura * escala_jogo;
        altura = altura * escala_jogo;

        let img = new Image();
        img.src = url_tiro_player;
        let sprite = new Sprite(img, x, y, largura, altura);

        let velocidade = this.velocidade_tiro * escala_jogo;

        this.listTiros.push({
            x: x,
            y: y,
            largura: largura,
            altura: altura,
            velocidade_x: velocidade,
            velocidade_y: 0,
            sprite: sprite, 
        });

        this.tempo_inserir = this.config_tempo_inserir;
        this.tiroPlayer = document.createElement("audio");
        this.tiroPlayer.src = url_sound_tiro;
        this.tiroPlayer.play();
    },

    insere_triplo: function(){

        // let x = player.x + player.largura/2;
        // let y = player.y + player.altura/2;
        // let largura = 40;
        // let altura = 30;
        // let img = new Image();
        // img.src = url_tiro_player;
        // let sprite = new Sprite(img, x, y, largura, altura);

        // this.listTiros.push({
        //     x: x,
        //     y: y,
        //     largura: largura,
        //     altura: altura,
        //     velocidade_x: 0,
        //     velocidade_y: 0,
        //     sprite: sprite, 
        // });

        // this.tempo_inserir = this.config_tempo_inserir;

    },

    update: function(){

        if(this.atirar){
            if(this.tempo_inserir <= 0){
                if(player.bonus_ativo){
                    this.insere_triplo();
                }
                else{
                    this.insere();
                }                
            }
            else{
                this.tempo_inserir--;
            }
        }

        for(let i = 0; i < this.listTiros.length; i++){

            let obj_tiro = this.listTiros[i];
            obj_tiro.x += obj_tiro.velocidade_x;
            obj_tiro.y += obj_tiro.velocidade_y;
            obj_tiro.sprite.atualizar_posicao(obj_tiro.x, obj_tiro.y);

            if(obj_tiro.x < 0 || obj_tiro.x > canvas_largura || obj_tiro.y < 0 || obj_tiro.y > canvas_altura){
                this.destruir(i);
            }          

        }

    },

    desenhar: function(){

        for(let i = 0; i < this.listTiros.length; i++){

            let obj_tiro = this.listTiros[i];            
            obj_tiro.sprite.desenhar();
        }

    },

    destruir : function(i){

        this.listTiros.splice(i, 1); 
        i--;
    },

    restart : function(){
        this.listTiros = [];
        this.tempo_inserir = 30;
        this.config_tempo_inserir = 10;
        this.velocidade_tiro = 10;
        this.atirar = false;

    },

};

C_Explosao = {

    listEx: [],

    insere : function(x, y){

        let largura = 20;
        let altura = 20;

        largura = largura * escala_jogo;
        altura = altura * escala_jogo;

        let img = new Image();
        img.src = url_explosao;
        let sprite = new Sprite(img, x, y, largura, altura);

        
        this.listEx.push({
            x: x,
            y: y,
            largura: largura,
            altura: altura,
            sprite: sprite,
        });

    },

    update : function(){


    },

    desenhar : function(){

        for(let i = 0; i < this.listTiros.length; i++){

            let obj_tiro = this.listTiros[i];            
            obj_tiro.sprite.desenhar();
        }
    },

    restart : function(){
        this.listEx = [];
    },

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

        velocidade_x = velocidade_x * escala_jogo;
        velocidade_y = velocidade_y * escala_jogo;

        largura = largura * escala_jogo;
        altura = altura * escala_jogo;

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
                    C_Tiros.destruir(c);
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

    restart : function(){
        this.listAst = [];
        this.pos_y = [1, 2, 3]; //1 = asteroide vindo de cima para baixo, 2 = vindo do meio, 3 = de baixo para cima
        this.tempo_inserir = 30;
        this.config_tempo_inserir = 10;

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
                    C_Tiros.destruir(c);
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

    restart : function(){
        this.listNav = [];
        this.pos_tela = [1, 2, 3]; //1 = asteroide vindo de cima para baixo, 2 = vindo do meio, 3 = de baixo para cima
        this.tempo_inserir = 100;
        this.config_tempo_inserir = 100;    
    },

};

class Inimigo{
    
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.x_objetivo;
        this.y_objetivo;
        this.altura = 50;
        this.largura = 50;

        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;

        this.cor = "#fff";
        this.sprite = null;   
        this.vida = 8;
        this.velocidade = 4;

        this.velocidade = this.velocidade * escala_jogo;

        this.c_tiros = null;
    }

    start(pos_tela) {
        
        let img = new Image();
        let tipo_inimigo = Math.floor(3 * Math.random());

        if(tipo_inimigo == 1){
            img.src = url_inimigo1;
        }
        else if(tipo_inimigo == 2){
            img.src = url_inimigo2;
        }
        else{
            img.src = url_inimigo3;
        }
        
        this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);
        
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
        this.sprite.atualizar_posicao(this.x, this.y);
        
    }

    desenhar(){

        this.sprite.desenhar();
        this.c_tiros.desenhar();

    }

};

class Tiros_inimigo{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.largura = 20;
        this.altura = 5;

        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;

        this.listTiros = [];
        this.cores = ["#ffbc1c", "#ff1c1c", "#ff85e1"];
        this.tempo_inserir = 100;
        this.config_tempo_inserir = 60;
        this.velocidade_tiro = 10;

        this.velocidade_tiro = this.velocidade_tiro * escala_jogo;

        this.atirar = true;
       
    }

    insere(){

        let img = new Image();
        img.src = url_tiro_inimigo;
        let sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);

        this.listTiros.push({
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura,
            sprite: sprite,
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
            obj_tiro.sprite.atualizar_posicao(obj_tiro.x, obj_tiro.y);

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
            obj_tiro.sprite.desenhar();
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
        this.x = (20 * escala_jogo);
        this.y = canvas_altura - (50 * escala_jogo);

        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;
    },

    update : function(){
        

        
    },

    desenhar : function(){

        ctx.fillStyle = this.cor;
        let tamanho = Math.floor(30 * escala_jogo);
        let texto = tamanho.toString().concat("px 'Press Start 2P'");
        ctx.font = texto;
        ctx.fillText(this.valorScore, this.x, this.y);

    },

    adicionar_pontuacao : function(valor){

        this.valorScore += valor;
    },

    restart : function(){
        
        this.x = 0;
        this.y = 0;
        this.altura = 50;
        this.largura = 50;
        this.cor = "#ff4e4e";
        this.valorScore = 0;

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
 
        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;

        for(let i = 0; i < 3; i++){
            this.x = (50 * escala_jogo) + ((50 * escala_jogo) * i);
            this.y = 50 * escala_jogo;
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

    adicionar_vida : function(){

        for(let i = 0; i < 3; i++){

            if(this.list_status_sprite[i] != 1){

                if(this.list_status_sprite[i] == 2){
                    
                    this.list_status_sprite[i] = 1;
                    let img = new Image();
                    img.src = url_coracao1;
                    let sprite = new Sprite(img, this.list_sprite[i].x, this.list_sprite[i].y, this.list_sprite[i].largura, this.list_sprite[i].altura);
                    this.list_sprite[i] = sprite;

                    if(i + 1 < 3){
                        this.list_status_sprite[i+1] = 2;
                        let img = new Image();
                        img.src = url_coracao2;
                        let sprite = new Sprite(img, this.list_sprite[i+1].x, this.list_sprite[i+1].y, this.list_sprite[i+1].largura, this.list_sprite[i+1].altura);
                        this.list_sprite[i+1] = sprite;
                    }
                }
                else{
                    this.list_status_sprite[i] = 1;
                    let img = new Image();
                    img.src = url_coracao1;
                    let sprite = new Sprite(img, this.list_sprite[i].x, this.list_sprite[i].y, this.list_sprite[i].largura, this.list_sprite[i].altura);
                    this.list_sprite[i] = sprite;
                }

                break;
            }
        }

    },
    
    restart : function(){
        
        this.x = 0;
        this.y = 0;
        this.altura = 30;
        this.largura = 30;
        this.list_sprite = [];
        this.list_status_sprite = [];

    },

};


C_Itens = {

    x: 0,
    y: 0,
    altura: 50,
    largura: 50,
    sprite: null,
    config_tempo_inserir: 1000,
    tempo_inserir: 1000,
    tipo_bonus: 0,
    velocidade: 15,

    insere : function(){

        this.x = canvas_largura;
        this.y = Math.floor(canvas_altura * Math.random());
        this.largura = this.largura * escala_jogo;
        this.altura = this.altura * escala_jogo;
        this.velocidade = this.velocidade * escala_jogo;

        let img = new Image();
        this.tipo_bonus = Math.floor(3 * Math.random());
        this.tipo_bonus = 1;

        if(this.tipo_bonus == 1){ // vida
            img.src = url_coracao_power;
        }
        else{ //  tiro X
            img.src = url_tiro_power;
        }        
        this.sprite = new Sprite(img, this.x, this.y, this.largura, this.altura);

        this.tempo_inserir = this.config_tempo_inserir;
    },

    update : function(){
        
        if(this.tempo_inserir <= 0){
            this.insere();
        }
        else{
            this.tempo_inserir--;
        }

        if(this.sprite != null){
            this.x -= this.velocidade;
            this.sprite.atualizar_posicao(this.x, this.y);
        }

                    
        if(detectar_colisao(this, player)){ // detecta colisão com o player

            this.sprite = null;
            this.x = -10;
            player.bonus(this.tipo_bonus);

        }
    },

    desenhar : function(){

        if(this.sprite != null)
            this.sprite.desenhar();

    },

    restart : function(){
        
        this.x = 0;
        this.y = 0;
        this.altura = 50;
        this.largura = 50;
        this.sprite = null;
        this.config_tempo_inserir = 1000;
        this.tempo_inserir = 1000;
        this.tipo_bonus = 0;
        this.velocidade = 15;

    },

};


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


function main(){ //Inicializa o jogo    

    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.border = "1px solid #000";
    ctx = canvas.getContext("2d");

    document.addEventListener("mousedown", click);
    document.addEventListener("mouseup", clickEnd);
    document.addEventListener("touchstart", click);
    document.addEventListener("touchend", clickEnd);
    window.addEventListener("mousemove", getMousePos);
    window.addEventListener("resize", redimencionarJanela);
    
    game.start();

    update();
}

function restart(){

    game.restartGame();
    //game.start();

}


function update(){ //Função chamada a cada frame do jogo
    if(end_game != true){
        atualizar_acoes();
        desenhar();
    }
    else{
        restart();
    }

    window.requestAnimationFrame(update);
}

function atualizar_acoes(){ //Atualizar as mudanças de informações de cada objeto

    fundo.update();
    player.update();
    C_Tiros.update();
    C_Asteroides.update();
    C_Inimigos.update();
    C_Itens.update();

}

function desenhar(){ //Responsavel por chamar as funções que redesenham as informações atualizadas na tela
    ctx.clearRect(0, 0, canvas_largura, canvas_altura);    
    ctx.fillRect(0, 0, canvas_largura, canvas_altura);

    fundo.desenhar();
    C_Tiros.desenhar();
    C_Asteroides.desenhar();
    C_Inimigos.desenhar();
    player.desenhar();
    score.desenhar();
    vida.desenhar();
    C_Itens.desenhar();

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

function redimencionarJanela(){

    canvas_altura = window.innerHeight;
    canvas_largura = window.innerWidth;

    canvas.width = canvas_largura;
    canvas.height = canvas_altura;

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

$('#highScore').on('submit', (e) => {
    e.preventDefault();
    let name = $('#name').val();
  
    $.ajax({
      url: '',
      data: JSON.stringify({
        "date": new Date,
        "name": name,
        "score": player.score,
      }),
      type: "POST",
      contentType: "application/json",
      success: (data) => {
        $('#highScore').html( '<h4>Obrigado por jogar!</h4>' );
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  });    
  
  update();
  
main();
