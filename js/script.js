

const menu = document.getElementById("nav");
const top_menu = menu.offsetTop; //PEGAR O AFASTAMENTO DO TOPO DO MENU

var slide = document.getElementsByClassName('slideContainer'); //DIV QUE CONTEM O SLIDE

let itens = document.getElementsByClassName('item'); // DIVS DE CADA PAGINA DO SLIDE
let qtd_img = itens.length // QUANTIDADE DE PAGINAS DO SLIDE
let itens_2 = document.querySelectorAll('div.item'); // TESTANDO FORMA PARA UTILIZAR NO FOR EACH
let anterior = document.getElementsByClassName('anterior');//BOTAO ANTERIOR
let proximo = document.getElementsByClassName('proximo');//BOTAO PROXIMO

slide_conf();//CHAMA A FUNCAO QUE CONFIGURA O SLIDE

function slide_conf(){
    itens_2.forEach( (item) => {
        item.style.width = 100/qtd_img + '%'; //CALCULA O TAMANHO DE CADA PAGINA PARA SER MOSTRADO NO SLIDE
    });
    document.getElementById('slide').style.width = qtd_img*100 + '%';//MONTA A LARGURA TOTAL DA DIV QUE CONTEM O SLIDE
}


var x = 0;

function proximo_slide(){//FUNCAO PARA PASSAO PARA A PROXIMA PAGINA
    x++;
    if (x > (qtd_img - 1)) {
        x = 0;
    }
    var mover = -(100/qtd_img) * x;
    //console.log(mover);
    itens[0].style.marginLeft = mover + '%';
    
}
function anterior_slide(){//FUNCAO PARA VOLTAR  A PAGINA ANTERIOR
    x--;
    if (x < 0) {
        x = qtd_img - 1;
    }
    var mover = -(100/qtd_img) * x;
    itens[0].style.marginLeft = mover + '%';
    
}
setInterval(()=>{//DEFINE O TEMPO PARA PASSAR A PROXIMA PAGINA
    proximo_slide();
}, 3000) 

//ADICIONA AS FUNÇÕES AOS BOTOES ANTERIOR E PROXIMO
anterior[0].addEventListener("click", () => {
    anterior_slide();
 })
proximo[0].addEventListener("click", () => {
   proximo_slide();
})

//posição da seta
var pos_slide = document.getElementById('slideContainer');
var seta = document.getElementsByClassName("seta");


function calculoTop(){
    //FIXAR MENU NO TOPO
    if(window.scrollY >= top_menu){
        menu.classList.add('class', 'fixar');
    } else {
        menu.classList.remove('fixar');
    }
    //AJUSTANDO A POSICAO DA SETA DO SLIDE AUTOMATICAMENTE
    if (window.scrollY > 0) {
        var top_slide = pos_slide.offsetTop - window.scrollY;
    } else {
        var top_slide = pos_slide.offsetTop;
    }
    for (let u = 0; u < seta.length; u++){

        //seta[u].style.top = ((top_slide + pos_slide.offsetHeight/2)-seta[u].offsetHeight/2  + 'px');
    }
    //DEFININDO POSICONAMENTO EM Y DO MENU HAMBURGUER
    menu_toggle.style.top = window.scrollY + 'px';
}

//ADICIONAR OU REMOVER PAGINA DO SLIDE
var b_remover = document.getElementById('botao_remover');
b_remover.addEventListener("click", ()=>{remover_pagina()});
var b_adicionar = document.getElementById('botao_adicionar');
b_adicionar.addEventListener("click", ()=>{criar_pagina()});

var message = document.getElementById('fim_slide');

function criar_pagina(){
    if (qtd_img + 1 < 16){//LIMITACAO DE PAGINAS DO SLIDE
        const novo_slide = document.createElement("div");//CRIA UMA DIV
        novo_slide.innerText = qtd_img + 1;
        novo_slide.classList.add('item');//ADICIONA UMA CLASSE A DIV CRIADA
        var div_slide = document.getElementById('slide');
        div_slide.appendChild(novo_slide);//ADICIONA NOVA PAGINA
        itens = document.getElementsByClassName('item');//RECALCULA OS ITENS
        qtd_img = itens.length//RECALCULA QUANTIDADE DE PAGINA
        itens_2 = document.querySelectorAll('div.item');
        slide_conf(); // ATUALIZA AS INFORMACOES DO SLIDE
        message.innerHTML = "Página " + (qtd_img) + " adicionada com sucesso!";
        
    } 
    else {
        message.innerText = "Numero máximo de páginas alcançado!";
    }
    var resposta = setTimeout(()=>{message.innerHTML = '';}, 5000);
    //clearInterval(resposta);
}

function remover_pagina(){
    if(qtd_img > 3){
    itens = document.getElementsByClassName('item');
    qtd_img = itens.length
    document.getElementById('slide').removeChild(itens[qtd_img-1]);
    itens = document.getElementsByClassName('item');
    qtd_img = itens.length
    itens_2 = document.querySelectorAll('div.item');
    slide_conf();
    message.innerHTML = "Página " + (qtd_img + 1) + " removida com sucesso!";
    } 
    else {
        message.innerText = "Numero mínimo de páginas alcançado!";
    }
    var resposta = setTimeout(()=>{message.innerHTML = '';}, 5000);
}

//ABRIR MENU HAMBURGUER
var btnabre = document.getElementById('botao-abre-menu');
btnabre.addEventListener("click", ()=>{
    abre_menu();
})
//FECHAR MENU CLICANDO NO X
var btnfecha = document.getElementById('x-fecha-menu');
btnfecha.addEventListener("click", ()=>{
    fecha_menu();
})
//FECHAR MENU CLICANDO FORA
var backmenu = document.getElementById('fora_menu');
backmenu.addEventListener("click", ()=>{
    fecha_menu();
})
//CONFIGURACOES DAS FUNCOES DO MENU HAMBURGUER
var menu_toggle = document.getElementById('background-menu-responsivo');

function abre_menu(){
    menu_toggle.classList.remove('desativa-menu');
    menu_toggle.classList.add('ativa-menu');
    menu_toggle.style.display = 'block';
}
function fecha_menu(){
    menu_toggle.classList.remove('ativa-menu');
    menu_toggle.classList.add('desativa-menu');
    menu_toggle.style.display = 'none';
}
//CONFIGURACOES DOS TOOLTIPS PARA AS REDES SOCIAIS
const tooltip_item_li  = document.querySelectorAll("li.itemSocial");//SELECIONA LI
const tooltip_item  = document.querySelectorAll("li.itemSocial a");//SELECIONA OS LINKS DA LI
const tooltip_span = document.querySelectorAll("span.tooltip");//SELECIONA O TOOLTIP
tooltip_item_li.forEach((item, index)=>{//CRIAR SETA DO TOOLTIP PARA CADA LI
    var adicionarSeta = document.createElement("span");//CRIA UM SPAN
    adicionarSeta.classList.add('setinha');//ADICIONA UMA CLASSE AO SPAN
    item.appendChild(adicionarSeta);//ADICIONA O SPAM COM CLASSE A LI
    //console.log(item)
})
const tooltip_setinha = document.querySelectorAll("span.setinha");
//console.log(tooltip_item); 


tooltip_item.forEach((j, index) => {//CONFIGURAR POSICIONAMENTO E VISIBILIDADE DO TOOLTIP 
    tooltip_span[index].style.top = (j.offsetTop-35) + "px";
    j.addEventListener("mouseover", ()=>{
        tooltip_span[index].style.top = (j.offsetTop-35) + "px";
        tooltip_span[index].style.opacity = "1.0";
        tooltip_span[index].style.display = "block";
        tooltip_setinha[index].style.top = (j.offsetTop-5) + "px";
        tooltip_setinha[index].style.opacity = "1.0";
        tooltip_setinha[index].style.display = "block";
        
    })
    j.addEventListener("mouseout", ()=>{
        tooltip_span[index].style.opacity = "0";
        tooltip_span[index].style.display = "none";
        tooltip_setinha[index].style.opacity = "0";
    })

});


window.scrollTo(0,1);