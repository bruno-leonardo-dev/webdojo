describe('PUT /api/users/:id', () => {
  context('Atualização', () => {
    let userId

    const originalUser = {
      name: 'Peter Parker',
      email: 'parker@stark.com',
      password: '123456'
    }

    const updatedUser = {
      name: 'Spiderman',
      email: 'spider@marvel.com',
      password: 'pwd123'
    }

    before(() => {
      cy.task('deleteUser', originalUser.email)
      cy.task('deleteUser', updatedUser.email)

      cy.postUser(originalUser).then((response) => {
        cy.log(response.body.user.id)
        userId = response.body.user.id
      })
    })

    it('Deve atualizar um usuário existente', () => {
      cy.putUser(userId, updatedUser).then((res) => {
        expect(res.status).to.eq(204)
      })
    })

    after(() => {
      cy.getUsers().then((res) => {
        const spider = res.body.find((user) => user.id === userId)
        expect(spider).to.exist
        expect(spider.name).to.eq(updatedUser.name)
        expect(spider.email).to.eq(updatedUser.email)
      })
    })
  })

  context('Campos Obrigatórios', () => {
    it('O campo name deve ser obrigatório', () => {
      const user = {
        email: 'storm@xmen.com',
        password: 'pwd1234'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('name is required!')
      })
    })

    it('O campo email deve ser obrigatório', () => {
      const user = {
        name: 'Jean Gray',
        password: 'pwd1234'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('email is required!')
      })
    })

    it('O campo senha deve ser obrigatório', () => {
      const user = {
        name: 'Charles Xavier',
        email: 'xavier@xmen.com'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('password is required!')
      })
    })

    it('Não deve passar quando o JSON está mal formatado', () => {
      const user = `{
      name: 'Magneto',
      email: 'erik@xmen.com'
      password: 'pwd1234'
    }`

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid JSON format.')
      })
    })
  })

  context('Quando o id não existe', () => {
    let userId

    const originalUser = {
      name: 'Tony Stark',
      email: 'tony@stark.com',
      password: '123456'
    }

    const updatedUser = {
      name: 'Iron Man',
      email: 'ironman@marvel.com',
      password: 'pwd1234'
    }

    before(() => {
      cy.task('deleteUser', originalUser.email)
      cy.task('deleteUser', updatedUser.email)

      cy.postUser(originalUser).then((response) => {
        cy.log(response.body.user.id)
        userId = response.body.user.id
      })

      cy.task('deleteUser', originalUser.email)
      cy.task('deleteUser', updatedUser.email)
    })

    it('Deve retornar 404 e user not found', () => {
      cy.putUser(userId, updatedUser).then((res) => {
        expect(res.status).to.eq(404)
        expect(res.body.error).to.eq('User not found.')
      })
    })
  })
})
