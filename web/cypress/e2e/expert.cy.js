describe('Expert', () => {
  beforeEach(() => {
    cy.start()
  })

  it('Deve manipular os atributos de elementos do HTML', () => {
    cy.log('todo')

    cy.get('#email').invoke('val', 'papito@teste.com.br')

    cy.get('#password').invoke('attr', 'name', 'senha')

    cy.contains('button', 'Entrar').invoke('hide').should('not.be.visible')

    cy.contains('button', 'Entrar').invoke('show').should('be.visible')
  })

  it('Não deve logar com senha inválida', () => {
    cy.submitLogin('papito@webdojo.com', 'katana321')

    cy.get('[data-sonner-toaster=true] .title')
      .should('be.visible')
      .should('have.text', 'Acesso negado! Tente novamente.')
      .as('toast')

    cy.wait(5000)

    cy.get('@toast')
      .should('not.exist')
  })
})