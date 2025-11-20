describe('DELETE /api/users/:id', () => {
  context('Remoção de usuário', () => {
    let userId

    const user = {
      name: 'Bruce Banner',
      email: 'hulk@marvel.com',
      password: 'pwd1234'
    }

    before(() => {
      cy.task('deleteUser', user.email)

      cy.postUser(user).then((response) => {
        cy.log(response.body.user.id)
        userId = response.body.user.id
      })
    })

    it('Deve remover um usuário existente', () => {
      cy.deleteUser(userId).then((res) => {
        expect(res.status).to.eq(204)
      })
    })

    after(() => {
      cy.getUsers().then((res) => {
        const hulk = res.body.find((user) => user.id === userId)
        expect(hulk).to.undefined
      })
    })
  })

  context('Quando o id não existe', () => {
    let userId

    const user = {
      name: 'Tony Stark',
      email: 'ironman@marvel.com',
      password: 'pwd1234'
    }

    before(() => {
      cy.task('deleteUser', user.email)

      cy.postUser(user).then((response) => {
        cy.log(response.body.user.id)
        userId = response.body.user.id
      })

      cy.task('deleteUser', user.email)
    })

    it('Deve retornar 404 e user not found', () => {
      cy.deleteUser(userId).then((res) => {
        expect(res.status).to.eq(404)
        expect(res.body.error).to.eq('User not found.')
      })
    })
  })
})
