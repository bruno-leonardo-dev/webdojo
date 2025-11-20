describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: 'pwd1234'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully registered.')
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
      expect(response.body.user.password).to.eq('pwd1234')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
    })
  })

  it('Deve verificar cadastro com email duplicado', () => {
    const user = {
      name: 'Cyclope',
      email: 'scott@xmen.com',
      password: 'pwd1234'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Email already registered!')
    })
  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'storm@xmen.com',
      password: 'pwd1234'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('name is required!')
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Gray',
      password: 'pwd1234'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('email is required!')
    })
  })

  it('O campo senha deve ser obrigatório', () => {
    const user = {
      name: 'Charles Xavier',
      email: 'xavier@xmen.com'
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  })
})
