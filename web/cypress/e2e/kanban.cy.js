describe('Kanban Board', () => {
  it('Deve arrastar um objeto de todo para done e atualizar o board', () => {
    cy.login()
    cy.goTo('Kanban', 'Kanban Board')

    const dataTransfer = new DataTransfer()

    cy.contains('div[draggable="true"]', 'Documentar API')
      .trigger('dragstart', { dataTransfer })

    cy.get('.column-done').trigger('drop')
      .find('h3').should('have.text', 'Done (4)')

    cy.get('.column-done')
      .should('include.text', 'Documentar API')
      .and('include.text', 'Criar documentação da API com Swagger')
  })
})