/* ============================================
   CONFIGURAÇÃO PRINCIPAL
============================================ */


/*
ALTERE SOMENTE ESTE NÚMERO

Coloque o WhatsApp da floricultura:
Exemplo:
5511999999999

Formato:
55 + DDD + número

*/

const whatsapp = "5511999999999";






/* ============================================
   BOTÃO PRINCIPAL DO HEADER
============================================ */


function abrirWhatsApp(){


    const mensagem = 
    "Olá, gostaria de conhecer o catálogo de flores.";


    const url = 
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;


    window.open(url, "_blank");


}






/* ============================================
   COMPRA DE PRODUTO
============================================ */


function comprarProduto(nomeProduto){


    const mensagem = 
    `Olá, gostaria de comprar o produto: ${nomeProduto}`;


    const url =
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;


    window.open(url, "_blank");


}








/* ============================================
   FILTRO DE PRODUTOS
============================================ */


function filtrarProdutos(categoria){


    const produtos = document.querySelectorAll(".produto");



    produtos.forEach(produto => {



        const categoriaProduto = 
        produto.getAttribute("data-categoria");



        if(
            categoria === "todos" ||
            categoriaProduto === categoria
        ){


            produto.style.display = "block";


        } else {


            produto.style.display = "none";


        }


    });


}






/* ============================================
   ANIMAÇÃO SIMPLES AO CARREGAR
============================================ */


window.addEventListener("load",()=>{


    const produtos =
    document.querySelectorAll(".produto");



    produtos.forEach((produto,index)=>{


        produto.style.opacity="0";


        setTimeout(()=>{


            produto.style.transition=".5s";

            produto.style.opacity="1";


        }, index * 150);



    });


});
