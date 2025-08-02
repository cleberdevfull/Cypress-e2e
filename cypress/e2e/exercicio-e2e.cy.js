///<reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";
import CheckoutPage from "../support/page_objects/checkout.page";

let dadosLogin;

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC - ok
        Para fazer um pedido de 4 produtos  - ok
        Fazendo a escolha dos produtos - ok
        Adicionando ao carrinho - ok
        Preenchendo todas opções no checkout - ok
        E validando minha compra ao final - ok
    */

    //carregando os dados de perfil do Fixture
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil;
        });
    });

    //Iniciando o fluxo de teste
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //Login usando fixture perfil
        cy.visit('minha-conta');
        cy.login(dadosLogin.usuario, dadosLogin.senha);
        cy.get('.page-title').should('contain', 'Minha conta');

        //Carregando os dados de produtosLista do Fixture
        cy.fixture('produtosLista').then(produtos => {
            produtos.forEach(produto => {
                produtosPage.visitarProduto(produto.nomeProduto);
                produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
                cy.get('.woocommerce-message').should('exist', produto.nomeProduto + ' foram adicionados no seu carrinho.');
            });
        });

        //Acessando o carrinho e Iniciando o Checkout
        CheckoutPage.acessarCheckout();
        cy.get('.breadcrumb > .active').should('contain', 'Checkout');

        //Preenchendo os dados para o Faturamento
        CheckoutPage.detalhesFaturamento();

        //Pagamento e finalização
        CheckoutPage.selecionarMetodoPagamento();

        //Validação da compra
        CheckoutPage.validandoCompra();

      
    });
});