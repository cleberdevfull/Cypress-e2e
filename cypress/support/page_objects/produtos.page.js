class ProdutosPage{

    visitarUrl(){
        cy.visit('produtos') 
    }

    buscarProduto(nomeProduto){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('[type="submit"]').eq(1).click()
       
    }

    visitarProduto(){
        cy.visit('product/balboa-persistence-tee/')
    }

    addProdutoCarrinho(){
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(4)
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new ProdutosPage()