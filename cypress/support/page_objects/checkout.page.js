
class Checkout{
        

        acessarCheckout(checkout) {
        cy.get('.dropdown-toggle > .text-skin').click()
        cy.get('.button.checkout.wc-forward').eq(1).click()

        }

        detalhesFaturamento(detalhes) {
        cy.get('#billing_company').clear().type('Escola Britanica de Artes e Comércio')
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-results__option').contains('Brasil').click()
        cy.get('#billing_address_1').clear().type('Rua Mourato Coelho, 1404')
        cy.get('#billing_address_2').clear().type('Avenida Paulista, 1000')
        cy.get('#billing_city').clear().type('São Paulo')
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-results__option').contains('São Paulo').click()
        cy.get('#billing_postcode').clear().type('05417-000')
        cy.get('#billing_phone').clear().type('11999999999')
        cy.get('#order_comments').clear().type('Gostaria de receber o pedido no período da manhã')
        } 

        selecionarMetodoPagamento(metodoPagamento) {
        cy.get('.input-radio').eq(2).click()
        cy.get('.woocommerce-form__input.woocommerce-form__input-checkbox.input-checkbox').click()
        cy.get('#place_order').click()       
        }

        
        acessarPedido(pedido) {
        cy.visit('minha-conta/pedidos/')
        cy.get('.woocommerce-order > .woocommerce-order-details > .woocommerce-order-overview').should('contain', 'Número do pedido:')
        }

        validarPedido(valPedido) {
            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
            cy.get('.woocommerce-order-overview__order').should('contain', 'Número do pedido:')
            cy.get('.woocommerce-order-overview__payment-method').should('contain', 'Método de pagamento:')     
            cy.get('.woocommerce-order-overview__total').should('contain', 'Total')
            cy.get('.woocommerce-column__title').should('contain', 'Endereço de faturamento')
        } 


}
export default new Checkout()