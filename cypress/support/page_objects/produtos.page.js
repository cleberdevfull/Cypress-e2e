class produtosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('[type="submit"]').eq(1).click()

    }

    visitarProduto(nomeProduto) {
        const urlFormatada = nomeProduto.replace(/ /g, '-');
        cy.visit(`product/${urlFormatada}/`);
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new produtosPage()