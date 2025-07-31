///<reference types="cypress" />

import ProdutosPage from "../support/page_objects/produtos.page";
import CheckoutPage from "../support/page_objects/checkout.page";

let dadosLogin

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC - ok
        Para fazer um pedido de 4 produtos  - ok
        Fazendo a escolha dos produtos - ok
        Adicionando ao carrinho - ok
        Preenchendo todas opções no checkout
        E validando minha compra ao final


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
    */

    //Efetuando o Login
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.session('Login', () => {
            cy.visit('minha-conta')
            cy.login(dadosLogin.usuario, dadosLogin.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
        })

        cy.visit('produtos');


    });
    // Validando o login 
    it('Confirma login com sucesso', () => {
        cy.visit('/minha-conta');
        cy.get('.page-title').should('contain', 'Minha conta');
    });
    /*
            afterEach(() => {
            cy.screenshot()
            });
     */

    // Iniciando o fluxo de busca do produto, seleção, adição ao carrinho, checkout e validação do pedido
    describe('Adicionando produtos ao carrinho e efetuando checkout', () => {

        it('Buscar produto', () => {
            ProdutosPage.buscarProduto('Typhon Performance Fleece-lined Jacket');
            cy.get('.product_title').should('contain', 'Typhon Performance Fleece-lined Jacket');
        });

        it('Adicionar produto ao carrinho', () => {
            ProdutosPage.buscarProduto('Typhon Performance Fleece-lined Jacket');
            ProdutosPage.addProdutoCarrinho();
            cy.get('.woocommerce-message').should('contain', ' foram adicionados no seu carrinho.');
        });

        it('Acessando checkout', () => {
            CheckoutPage.acessarCheckout()
            cy.get('.breadcrumb > .active').should('contain', 'Checkout')
        });

        it('Preenchendo detalhes do faturamento', () => {
            CheckoutPage.acessarCheckout()
            CheckoutPage.detalhesFaturamento()
            cy.get('.product-name').eq(3).should('contain', 'Typhon Performance Fleece-lined Jacket')
        });

        it('Selecionando método de pagamento', () => {
            CheckoutPage.acessarCheckout()
            CheckoutPage.selecionarMetodoPagamento()
        });

        it('Validando a compra', () => {
            CheckoutPage.validandoCompra();
        });

    });

});

