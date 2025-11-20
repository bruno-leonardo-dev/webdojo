describe("GET / api/users", () => {
  const heroes = [
    { name: "Superman", email: "superman@example.com", password: "pwd1234" },
    { name: "Batman", email: "batman@example.com", password: "pwd1234" },
    { name: "Wonder Woman", email: "wonder.woman@example.com", password: "pwd1234" },
    { name: "Flash", email: "flash@example.com", password: "pwd1234" },
    { name: "Aquaman", email: "aquaman@example.com", password: "pwd1234" },
  ]

  beforeEach(() => {
    heroes.forEach(hero => {
      cy.postUser(hero)
    })
  })

  it("Deve retornar uma lista de usuários", () => {
    cy.getUsers().then((res) => {
      expect(res.status).to.eq(200)

      heroes.forEach(hero => {
        const found = res.body.find(user => user.email === hero.email)
        expect(found.name).to.eq(hero.name)
        expect(found.email).to.eq(hero.email)
        expect(found).to.have.property('id')
      })
    })
  })
})
